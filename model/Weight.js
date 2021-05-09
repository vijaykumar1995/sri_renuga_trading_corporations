import mongoose from 'mongoose';

const weightSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    }
  },
  { timestamps: true }
);

export default mongoose.model('Weight', weightSchema);