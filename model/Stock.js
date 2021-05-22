import mongoose from 'mongoose';

const stockSchema = mongoose.Schema(
  {
    invoice_number: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    reason_for_return: {
      type: String
    }, 
    purchase_date: {
      type: Date,
      required: true
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    }, 
    gst_percentage: {
      type: Number
    },
    hsn_code: {
      type: Number
    },
    unit_price: {
      type: Number,
      required: true
    }, 
    cgst_cost: {
      type: Number
    },
    sgst_cost: {
      type: Number
    },
    batch_number: {
      type: String
    },
    expiry_date: {
      type: Date
    },
    available_quantity: {
      type: Number,
      required: true
    },
    active: {
      type: Boolean,
      required: true
    },
    weight: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    }

  },
  { timestamps: true }
);


export default mongoose.model('Stock', stockSchema);
