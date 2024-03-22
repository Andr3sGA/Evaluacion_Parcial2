import { Module } from '@nestjs/common';
import { MarcaController } from './marcas.controller';
import { MarcaService } from './marcas.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MARCA } from 'src/models/models';
import { MarcaSchema } from './schema/marcas.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: MARCA.name,
        useFactory: () => MarcaSchema,
      },
    ]),
  ],
  controllers: [MarcaController],
  providers: [MarcaService],
  exports: [MarcaService],
})
export class MarcaModule {}
