import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MarcaService } from './marcas.service';
import { MarcaDTO } from './dto/marcas.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('marca')
@Controller('api/v1/marca')
export class MarcaController {
  constructor(private readonly marcaService: MarcaService) {}

  @Post()
  insertar(@Body() marcaDTO: MarcaDTO) {
    return this.marcaService.insertar(marcaDTO);
  }
  @Get()
  todos() {
    return this.marcaService.todos();
  }
  @Get(':id')
  uno(@Param('id') id: string) {
    return this.marcaService.uno(id);
  }
  @Put(':id')
  actualizar(@Param('id') id: string, @Body() marcaDTO: MarcaDTO) {
    return this.marcaService.actualizar(id, marcaDTO);
  }
  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.marcaService.eliminar(id);
  }
}
