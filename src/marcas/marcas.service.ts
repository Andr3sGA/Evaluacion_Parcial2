import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MARCA } from 'src/models/models';
import { IMarca } from './marcas.interface';
import { Model } from 'mongoose';
import { MarcaDTO } from './dto/marcas.dto';

@Injectable()
export class MarcaService {
  constructor(
    @InjectModel(MARCA.name) private readonly model: Model<IMarca>,
  ) {}

  async insertar(marcaDTO: MarcaDTO): Promise<IMarca> {
    const newMarca = new this.model(marcaDTO);
    return await newMarca.save();
  }
  async todos(): Promise<IMarca[]> {
    return await this.model.find();
  }
  async uno(id: string): Promise<IMarca> {
    return await this.model.findById(id);
  }
  async actualizar(
    id: string,
    marcaDTO: MarcaDTO,
  ): Promise<IMarca> {
    return await this.model.findByIdAndUpdate(id, marcaDTO, { new: true });
  }
  async eliminar(id: string) {
    await this.model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, message: 'Eliminado' };
  }
}
