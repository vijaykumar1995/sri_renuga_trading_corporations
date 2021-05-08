import jwt from 'jsonwebtoken';
import Employee from '../model/Employees';

export default (req, res, next) => {
  const header = req.headers.authorization;
  let token;

  if (header) token = header.split(' ')[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ errors: { global: 'Not Authorized' } });
      } else {
        Employee.findOne({
          ph_number: decoded.ph_number
        }).then((user) => {
          req.currentUser = user;
          next();
        });
      }
    });
  } else {
    res.status(401).json({ errors: { global: 'Not Authorized' } });
  }
};
