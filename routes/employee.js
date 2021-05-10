import express from 'express';
import passwordHash from 'password-hash';
import _ from 'lodash';
import Users from '../model/Employees';
import { signupResetPasswordLink } from '../mailer';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    console.log(req.body);
    if (_.isEmpty(req.body)) {
      res
        .status(400)
        .json({ errors: 'All the fields are needed to be filled out' });
    }
    if (_.isEmpty(req.body.data.ph_number)) {
      res.status(400).json({ errors: 'Phone number must be filled out' });
    } else {
      const hashedPassword = passwordHash.generate(req.body.data.password);
      Users.create({
        role: req.body.data.role,
        name: req.body.data.name,
        ph_number: req.body.data.ph_number,
        email_id: req.body.data.email_id,
        password: hashedPassword
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

router.post('/login', (req, res) => {
  Users.findOne({ph_number:req.body.data.ph_number}).then(response =>{
    if(response!=null){
      if(passwordHash.verify(req.body.data.password, response.password)){
        res.json({user: response.toAuthJSON()})
      }
      else{
        res.status(400).json("Password incorrect")
      }
    }
    else{
      res.status(400).json("Phone Number does not exist")
    }
  })
})

router.get('/profile_details', (req, res) => {
  console.log('inside the profile')
  Users.findOne({ ph_number: req.query.ph_number }).then((response) => {
    res.status(200).json({details: response});
  }).catch(err => {
    res.status(400).json(err.errors.name.properties.message);
  })
})

export default router;
