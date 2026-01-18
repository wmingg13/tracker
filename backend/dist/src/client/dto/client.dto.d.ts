export declare class RecordDto {
    date: string;
    photo?: string;
    notes?: string;
}
export declare class CreateClientDto {
    name: string;
    email: string;
    phone?: string;
    age?: number;
    gender?: string;
    joinDate: string;
    goals?: string;
    records?: RecordDto[];
}
export declare class UpdateClientDto {
    id: number;
    name: string;
    email: string;
    phone?: string;
    age?: number;
    gender?: string;
    joinDate: string;
    goals?: string;
    records?: RecordDto[];
}
