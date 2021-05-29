import mongoose from 'mongoose';

const settingsSchema = mongoose.Schema(
  {
    currentDate: {
      type: Date,
      required: true
    }
  }
  
)

export default mongoose.model('Settings', settingsSchema);