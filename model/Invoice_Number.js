import mongoose from 'mongoose';

const InvoiceNumberSchema = mongoose.Schema(
  {
    invoice_number: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
     
    purchase_date: {
      type: Date,
    },
    
    company_name: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },

    gst_Number: {
      type: String
    },

  },
  { timestamps: true }
);


export default mongoose.model('InvoiceNumber', InvoiceNumberSchema);