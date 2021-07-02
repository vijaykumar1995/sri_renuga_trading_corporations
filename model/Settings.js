import mongoose from 'mongoose';

const settingsSchema = mongoose.Schema(
  {
    currentDate: {
      type: Date,
      required: true
    },
    AdministrationMailing: {
      type: Array,
      required: true
    },
    fiscalYearStartMonth: {
      type: String,
      required: true
    },
    fiscalYearEndMonth: {
      type: String,
      required: true
    },
    fiscalYear: {
      type: Array,
      required: true
    }
  },
  { timestamps: true }
  
)

export default mongoose.model('Settings', settingsSchema);