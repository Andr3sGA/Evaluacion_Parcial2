import { IMarca } from "src/marcas/marcas.interface";

export interface IProductos extends Document {
  nombre: string;
  marca: IMarca[];
}
