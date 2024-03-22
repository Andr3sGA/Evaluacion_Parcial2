import { Module } from '@nestjs/common';
import { ProductosController } from './productos.controller';
import { ProductosService } from './productos.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PRODUCTO } from 'src/models/models';
import { ProductosSchema } from './schema/productos.schema';
import { MarcaModule } from 'src/marcas/marcas.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: PRODUCTO.name,
        useFactory: () => ProductosSchema.plugin(require('mongoose-autopopulate')),
      },
    ]),
    MarcaModule,
  ],
  controllers: [ProductosController],
  providers: [ProductosService],
})
export class ProductosModule {}
