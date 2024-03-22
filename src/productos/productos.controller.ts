import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductosService } from './productos.service';
import { MarcaService } from 'src/marcas/marcas.service';
import { ProductosDTO } from './dto/productos.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('productos')
@Controller('api/v1/productos')
export class ProductosController {
  constructor(
    private readonly productosService: ProductosService,
    private readonly marcaService: MarcaService,
  ) {}
  @Post()
  @ApiOperation({ summary: 'Crear Producto' })
  insertar(@Body() productosDTO: ProductosDTO) {
    return this.productosService.insertar(productosDTO);
  }
  @Get()
  @ApiOperation({ summary: 'Selecciona todos los productos' })
  todos() {
    return this.productosService.todos();
  }
  @Get(':id')
  uno(@Param('id') id: string) {
    return this.productosService.uno(id);
  }
  @Put(':id')
  actualizar(@Param('id') id: string, @Body() productosDTO: ProductosDTO) {
    return this.productosService.actualizar(id, productosDTO);
  }
  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.productosService.eliminar(id);
  }
  @Post(':productoId/marca/:marcaId')
  async agregarMarca(
    @Param('productoId') productoId: string,
    @Param('marcaId') marcaId: string,
  ) {
    const marca = await this.marcaService.uno(marcaId);
    if (!marca)
      throw new HttpException('Profesor not found', HttpStatus.NOT_FOUND);
    return this.productosService.insertarMarca(productoId, marcaId);
  }
}
