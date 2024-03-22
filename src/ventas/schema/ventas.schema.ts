import mongoose from 'mongoose';
export const VentasSchema  = new mongoose.Schema(
  {
    cliente: [{ type: mongoose.Schema.Types.ObjectId, ref: 'cliente' }],
    productos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'productos' }],
    fecha: { type: Date, required: true },
  },
  {
    timestamps: true,
  },
);
