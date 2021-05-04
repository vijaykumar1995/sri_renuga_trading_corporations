/* eslint-disable comma-dangle */
import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import passwordHash from 'password-hash';

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email_id: {
      type: String,
      unique: true
    },
    role: {
      type: String,
      required: true
    },
    password: {
      type: String
    },
    ph_number: {
      type: String,
      required: true,
      unique: true
    }
  },
  { timestamps: true }
);

employeeSchema.plugin(uniqueValidator, {
  message: 'Email ID and employee ID must be unique.'
});

export default mongoose.model('Employees', employeeSchema);
