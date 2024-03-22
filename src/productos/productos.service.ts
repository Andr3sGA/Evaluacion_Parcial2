import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PRODUCTO } from 'src/models/models';
import { IProductos } from './productos.interface';
import { ProductosDTO } from './dto/productos.dto';

@Injectable()
export class ProductosService {
  constructor(
    @InjectModel(PRODUCTO.name) private readonly model: Model<IProductos>,
  ) {}
  insertar(productosDTO: ProductosDTO): Promise<IProductos> {
    const nuevoProducto = new this.model(productosDTO);
    return nuevoProducto.save();
  }
  todos(): Promise<IProductos[]> {
    return this.model.find().populate('productos');
  }
  uno(id: string): Promise<IProductos> {
    return this.model.findById(id).populate('productos');
  }
  actualizar(id: string, productosDTO: ProductosDTO): Promise<IProductos> {
    return this.model.findByIdAndUpdate(id, productosDTO, { new: true });
  }
  async eliminar(id: string) {
    await this.model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, msg: 'Producto eliminado' };
  }
  async insertarMarca(
    productoId: string,
    marcaId: string,
  ): Promise<IProductos> {
    return await this.model
      .findByIdAndUpdate(
        productoId,
        { $addToSet: { marca: marcaId } },
        { new: true },
      )
      .populate('marca');
  }
}
