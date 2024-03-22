import { ICliente } from 'src/clientes/cliente.interface';
import { IProductos } from 'src/productos/productos.interface';

export interface IVentas extends Document {
  cliente: ICliente[];
  productos: IProductos[];
  fecha: Date;
}
