import express from 'express';
import passwordHash from 'password-hash';
import _ from 'lodash';
import Users from '../model/Employees';
import { signupResetPasswordLink } from '../mailer';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    // console.log(req.body);
    if (_.isEmpty(req.body)) {
      res
        .status(400)
        .json({ errors: 'All the fields are needed to be filled out' });
    }
    if (_.isEmpty(req.body.data.ph_number)) {
      res.status(400).json({ errors: 'Phone number must be filled out' });
    } else {
      Users.create({
        role: req.body.data.employee_role,
        name: req.body.data.employee_name,
        ph_number: req.body.data.ph_number,
        email_id: req.body.data.email_id
      })
        .then((response) => {
          console.log(response);
          // signupResetPasswordLink(response);
          res.json(response);
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err.message);
          res.status(400).json('Phone Number must be unique');
        });
    }
  } catch (e) {
    console.log(e);
  }
});

export default router;
