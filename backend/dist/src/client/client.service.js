"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ClientService = class ClientService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getClientList() {
        return this.prisma.client.findMany({
            include: {
                records: {
                    orderBy: {
                        date: 'asc',
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    async getClient(id) {
        const client = await this.prisma.client.findUnique({
            where: { id },
            include: {
                records: {
                    orderBy: {
                        date: 'asc',
                    },
                },
            },
        });
        if (!client) {
            throw new common_1.NotFoundException(`Client with ID ${id} not found`);
        }
        return client;
    }
    async searchClient(name) {
        return this.prisma.client.findMany({
            where: {
                name: {
                    contains: name,
                    mode: 'insensitive',
                },
            },
            include: {
                records: {
                    orderBy: {
                        date: 'asc',
                    },
                },
            },
        });
    }
    async addClient(createClientDto) {
        const existingClient = await this.prisma.client.findUnique({
            where: { email: createClientDto.email },
        });
        if (existingClient) {
            throw new common_1.ConflictException('Email already exists');
        }
        const { records, ...clientData } = createClientDto;
        return this.prisma.client.create({
            data: {
                ...clientData,
                joinDate: new Date(clientData.joinDate),
                records: records
                    ? {
                        create: records.map((record) => ({
                            date: new Date(record.date),
                            photo: record.photo,
                            notes: record.notes,
                        })),
                    }
                    : undefined,
            },
            include: {
                records: {
                    orderBy: {
                        date: 'asc',
                    },
                },
            },
        });
    }
    async editClient(updateClientDto) {
        const { id, records, ...clientData } = updateClientDto;
        const existingClient = await this.prisma.client.findUnique({
            where: { id },
        });
        if (!existingClient) {
            throw new common_1.NotFoundException(`Client with ID ${id} not found`);
        }
        if (clientData.email !== existingClient.email) {
            const emailTaken = await this.prisma.client.findUnique({
                where: { email: clientData.email },
            });
            if (emailTaken) {
                throw new common_1.ConflictException('Email already exists');
            }
        }
        if (records) {
            await this.prisma.record.deleteMany({
                where: { clientId: id },
            });
        }
        return this.prisma.client.update({
            where: { id },
            data: {
                ...clientData,
                joinDate: new Date(clientData.joinDate),
                records: records
                    ? {
                        create: records.map((record) => ({
                            date: new Date(record.date),
                            photo: record.photo,
                            notes: record.notes,
                        })),
                    }
                    : undefined,
            },
            include: {
                records: {
                    orderBy: {
                        date: 'asc',
                    },
                },
            },
        });
    }
    async deleteClient(id) {
        const client = await this.prisma.client.findUnique({
            where: { id },
        });
        if (!client) {
            throw new common_1.NotFoundException(`Client with ID ${id} not found`);
        }
        await this.prisma.client.delete({
            where: { id },
        });
        return { message: 'Client deleted successfully' };
    }
};
exports.ClientService = ClientService;
exports.ClientService = ClientService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ClientService);
//# sourceMappingURL=client.service.js.map