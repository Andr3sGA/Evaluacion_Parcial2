import mongoose from 'mongoose';

export const MarcaSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

