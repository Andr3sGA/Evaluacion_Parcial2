import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteDTO } from './dto/cliente.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('cliente')
@Controller('api/v1/cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  insertar(@Body() clienteDTO: ClienteDTO) {
    return this.clienteService.insertar(clienteDTO);
  }
  @Get()
  todos() {
    return this.clienteService.todos();
  }
  @Get(':id')
  uno(@Param('id') id: string) {
    return this.clienteService.uno(id);
  }
  @Put(':id')
  actualizar(@Param('id') id: string, @Body() clienteDTO: ClienteDTO) {
    return this.clienteService.actualizar(id, clienteDTO);
  }
  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.clienteService.eliminar(id);
  }
}
