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
import { VentasService } from './ventas.service';


import { VentasDTO } from './dto/ventas.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ClienteService } from 'src/clientes/cliente.service';
import { ProductosService } from 'src/productos/productos.service';
@ApiTags('ventas')
@Controller('api/v1/ventas')
export class VentasController {
  constructor(
    private readonly ventasService: VentasService,
    private readonly clienteService: ClienteService,
    private readonly productosService: ProductosService,
  ) {}
  @Post()
  @ApiOperation({ summary: 'Crear Venta' })
  insertar(@Body() ventasDTO: VentasDTO) {
    return this.ventasService.insertar(ventasDTO);
  }
  @Get()
  @ApiOperation({ summary: 'Selecciona todas las ventas' })
  todos() {
    return this.ventasService.todos();
  }
  @Get(':id')
  uno(@Param('id') id: string) {
    return this.ventasService.uno(id);
  }
  @Put(':id')
  actualizar(@Param('id') id: string, @Body() ventasDTO: VentasDTO) {
    return this.ventasService.actualizar(id, ventasDTO);
  }
  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.ventasService.eliminar(id);
  }
  @Post(':ventasId/cliente/:clienteId')
  async agregarCliente(
    @Param('ventasId') ventasId: string,
    @Param('clienteId') clienteId: string,
  ) {
    const cliente = await this.clienteService.uno(clienteId);
    if (!cliente)
      throw new HttpException('Cliente no encontrado', HttpStatus.NOT_FOUND);
    return this.ventasService.insertarCliente(ventasId, clienteId);
        
  }

  @Post(':ventasId/productos/:productosId')
  async agregarProductos(
    @Param('ventasId') ventasId: string,
    @Param('productosId') productosId: string,
  ) {
    const productos = await this.productosService.uno(productosId);
    if (!productos)
      throw new HttpException('Productos no encontrados', HttpStatus.NOT_FOUND);
    return this.ventasService.insertarProductos(ventasId, productosId);
      
  }
     
      
  }
