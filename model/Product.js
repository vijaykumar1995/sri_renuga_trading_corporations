import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    availability: {
      type: Number,
      required: true
    },
    minimum_threshold: {
      type: Number,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    weight: {
      type: String,
      required: true
    },
    hsn_code: {
      type: Number,
      required: true
    },
    gst_percentage: {
      type: Number,
      required: true
    },
    profit_percentage: {
      type: Number,
      required: true
    },
    active: {
      type: Boolean,
      required: true
    }
  },
  { timestamps: true }
)

productSchema.plugin(mongooseUniqueValidator, {
  message: 'Product Name must be unique.'
});

export default mongoose.model('Product', productSchema);