import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VENTAS } from 'src/models/models';
import { IVentas } from './ventas.interface';
import { VentasDTO } from './dto/ventas.dto';
import { ClienteService } from 'src/clientes/cliente.service';


@Injectable()
export class VentasService {
  constructor(
    @InjectModel(VENTAS.name) private readonly model: Model<IVentas>,
  ) {}
  insertar(ventasDTO: VentasDTO): Promise<IVentas> {
    const nuevoVenta = new this.model(ventasDTO);
    return nuevoVenta.save();
  }
  todos(): Promise<IVentas[]> {
    return this.model.find().populate('cliente', 'productos');
  }
  uno(id: string): Promise<IVentas> {
    return this.model.findById(id).populate('cliente', 'productos');
  }
  actualizar(id: string, ventasDTO: VentasDTO): Promise<IVentas> {
    return this.model.findByIdAndUpdate(id, ventasDTO, { new: true });
  }
  async eliminar(id: string) {
    await this.model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, msg: 'Venta eliminada' };
  }
  async insertarCliente(
    ventaId: string,
    clienteId: string,
  ): Promise<IVentas> {
    return await this.model
      .findByIdAndUpdate(
        ventaId,
        { $addToSet: { cliente: clienteId } },
        { new: true },
      )
      .populate('cliente');
  }
  
  async insertarProductos(
    ventaId: string,
    productosId: string,
  ): Promise<IVentas> {
    return await this.model
      .findByIdAndUpdate(
        ventaId,
        { $addToSet: { productos: productosId } },
        { new: true },
      )
      .populate('productos');
  }
}
