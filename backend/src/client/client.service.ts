// src/client/client.service.ts

import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClientDto, UpdateClientDto } from './dto/client.dto';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}

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

  async getClient(id: number) {
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
      throw new NotFoundException(`Client with ID ${id} not found`);
    }

    return client;
  }

  async searchClient(name: string) {
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

  async addClient(createClientDto: CreateClientDto) {
    // Check if email already exists
    const existingClient = await this.prisma.client.findUnique({
      where: { email: createClientDto.email },
    });

    if (existingClient) {
      throw new ConflictException('Email already exists');
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

  async editClient(updateClientDto: UpdateClientDto) {
    const { id, records, ...clientData } = updateClientDto;

    // Check if client exists
    const existingClient = await this.prisma.client.findUnique({
      where: { id },
    });

    if (!existingClient) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }

    // Check if email is being changed and if it's already taken
    if (clientData.email !== existingClient.email) {
      const emailTaken = await this.prisma.client.findUnique({
        where: { email: clientData.email },
      });

      if (emailTaken) {
        throw new ConflictException('Email already exists');
      }
    }

    // Delete existing records and create new ones
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

  async deleteClient(id: number) {
    const client = await this.prisma.client.findUnique({
      where: { id },
    });

    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }

    await this.prisma.client.delete({
      where: { id },
    });

    return { message: 'Client deleted successfully' };
  }
}