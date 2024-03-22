import { Module } from '@nestjs/common';
import { VentasController } from './ventas.controller';
import { VentasService } from './ventas.service';
import { MongooseModule } from '@nestjs/mongoose';
import { VENTAS } from 'src/models/models';
import { VentasSchema } from './schema/ventas.schema';
import { ClienteModule } from 'src/clientes/cliente.module';
import { ProductosModule } from 'src/productos/productos.module';


@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: VENTAS.name,
        useFactory: () => VentasSchema.plugin(require('mongoose-autopopulate')),
      },
    ]),
    ClienteModule,
    ProductosModule,
  ],
  controllers: [VentasController],
  providers: [VentasService],
})
export class VentasModule {}
