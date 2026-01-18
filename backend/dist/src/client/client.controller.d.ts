import { ClientService } from './client.service';
import { CreateClientDto, UpdateClientDto } from './dto/client.dto';
export declare class ClientController {
    private readonly clientService;
    constructor(clientService: ClientService);
    getClientList(): Promise<({
        records: {
            date: Date;
            photo: string | null;
            notes: string | null;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            clientId: number;
        }[];
    } & {
        name: string;
        email: string;
        phone: string | null;
        age: number | null;
        gender: string | null;
        joinDate: Date;
        goals: string | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    getClient(clientId: number): Promise<{
        records: {
            date: Date;
            photo: string | null;
            notes: string | null;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            clientId: number;
        }[];
    } & {
        name: string;
        email: string;
        phone: string | null;
        age: number | null;
        gender: string | null;
        joinDate: Date;
        goals: string | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    searchClient(clientName: string): Promise<({
        records: {
            date: Date;
            photo: string | null;
            notes: string | null;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            clientId: number;
        }[];
    } & {
        name: string;
        email: string;
        phone: string | null;
        age: number | null;
        gender: string | null;
        joinDate: Date;
        goals: string | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    addClient(createClientDto: CreateClientDto): Promise<{
        records: {
            date: Date;
            photo: string | null;
            notes: string | null;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            clientId: number;
        }[];
    } & {
        name: string;
        email: string;
        phone: string | null;
        age: number | null;
        gender: string | null;
        joinDate: Date;
        goals: string | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    editClient(updateClientDto: UpdateClientDto): Promise<{
        records: {
            date: Date;
            photo: string | null;
            notes: string | null;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            clientId: number;
        }[];
    } & {
        name: string;
        email: string;
        phone: string | null;
        age: number | null;
        gender: string | null;
        joinDate: Date;
        goals: string | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteClient(clientId: number): Promise<{
        message: string;
    }>;
}
