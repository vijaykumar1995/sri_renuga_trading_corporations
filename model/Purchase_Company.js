import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const purchaseCompany = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    gst_number: {
      type: String,
      required: true,
      unique: true
    }
  },
  { timestamps: true }
)

purchaseCompany.plugin(uniqueValidator, {
  message: 'Company name and GSTN number must be unique.'
});

export default mongoose.model('PurchaseCompany' , purchaseCompany);