import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CLIENTE } from 'src/models/models';
import { ICliente } from './cliente.interface';
import { Model } from 'mongoose';
import { ClienteDTO } from './dto/cliente.dto';

@Injectable()
export class ClienteService {
  constructor(
    @InjectModel(CLIENTE.name) private readonly model: Model<ICliente>,
  ) {}

  async insertar(clienteDTO: ClienteDTO): Promise<ICliente> {
    const newCliente = new this.model(clienteDTO);
    return await newCliente.save();
  }
  async todos(): Promise<ICliente[]> {
    return await this.model.find();
  }
  async uno(id: string): Promise<ICliente> {
    return await this.model.findById(id);
  }
  async actualizar(
    id: string,
    clienteDTO: ClienteDTO,
  ): Promise<ICliente> {
    return await this.model.findByIdAndUpdate(id, clienteDTO, { new: true });
  }
  async eliminar(id: string) {
    await this.model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, message: 'Eliminado' };
  }
}
