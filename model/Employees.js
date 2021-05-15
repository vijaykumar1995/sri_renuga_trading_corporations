/* eslint-disable comma-dangle */
import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import passwordHash from 'password-hash';
import jwt from "jsonwebtoken"

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email_id: {
      type: String
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

employeeSchema.methods.toAuthJSON = function toAuthJSON() {
  return{
    ph_number: this.ph_number,
    role: this.role,
    token: this.generateJWt()
  }
};

employeeSchema.methods.generateJWt = function generateJWt(){
  return jwt.sign({
    ph_number: this.ph_number,
    role: this.role
  }, 
  process.env.JWT_SECRET
  )
}

export default mongoose.model('Employees', employeeSchema);
