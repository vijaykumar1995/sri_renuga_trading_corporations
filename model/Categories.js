import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const categoriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    gst_percentage: {
      type: Number,
      required: true
    },
    hsn_code: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
)

categoriesSchema.plugin(uniqueValidator, {
  message: 'Category name must be unique.'
});

export default mongoose.model('Categories' , categoriesSchema);