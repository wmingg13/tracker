// src/client/client.controller.ts

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto, UpdateClientDto } from './dto/client.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get('getClientList')
  async getClientList() {
    return this.clientService.getClientList();
  }

  @Get('getClient/:clientId')
  async getClient(@Param('clientId', ParseIntPipe) clientId: number) {
    return this.clientService.getClient(clientId);
  }

  @Get('searchClient/:clientName')
  async searchClient(@Param('clientName') clientName: string) {
    return this.clientService.searchClient(clientName);
  }

  @Post('addClient')
  async addClient(@Body() createClientDto: CreateClientDto) {
    return this.clientService.addClient(createClientDto);
  }

  @Put('editClient')
  async editClient(@Body() updateClientDto: UpdateClientDto) {
    return this.clientService.editClient(updateClientDto);
  }

  @Delete('deleteClient/:clientId')
  async deleteClient(@Param('clientId', ParseIntPipe) clientId: number) {
    return this.clientService.deleteClient(clientId);
  }
}