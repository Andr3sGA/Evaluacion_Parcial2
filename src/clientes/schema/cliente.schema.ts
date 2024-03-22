import mongoose from 'mongoose';

export const ClienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
});

