import mongoose from 'mongoose';
export const ProductosSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    marca: [{ type: mongoose.Schema.Types.ObjectId, ref: 'marca' }],
  },
  {
    timestamps: true,
  },
);
