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
      if(req.body.data.email_id == null|| req.body.data.email_id === '') {
        const hashedPassword = passwordHash.generate(req.body.data.password);
        Users.create({
          role: req.body.data.role,
          name: req.body.data.name,
          ph_number: req.body.data.ph_number,
          password: hashedPassword
        })
        .then((response) => {
          console.log(response);
          // signupResetPasswordLink(response);
          res.status(200).json(response);
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log('in err ',err.message);
          res.status(400).json('Phone Number must be unique');
        });
      } else {
        let user =await  Users.findOne({ email_id: req.body.data.email_id });
        if(user == null) {
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
        } else {
          res.status(400).json('Email Id must be unique');
        }
      }
      
    }
  } catch (e) {
    console.log(e);
    res.status(400).json('Error occured while creating an employee')
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

router.get('/', (req, res) => {
  Users.find().then(response => {
    res.status(200).json(response)
  }).catch(err => {
    res.status(400).json('Error occured while fetching the Employees');
  })
})

router.put('/', (req, res) => {
  try {
    console.log();
    if (_.isEmpty(req.body.data)) {
      res
        .status(400)
        .json('All the fields are needed to be filled out');
    } else {
      if (_.isEmpty(req.body.data.ph_number)) {
        res.status(400).json({ errors: 'Phone number must be filled out' });
      } else {
        if(req.body.data.email_id === '') {
          Users.findByIdAndUpdate({_id: req.body.data._id}, {
            ph_number: req.body.data.ph_number,
            name: req.body.data.name,
            role: req.body.data.role
          }).then(response => {
            res.status(200).json('Updated the Employee successfully')
          }).catch(err => {
            res.status(400).json('Error occured while updating the employee')
          })
        } else {
          Users.findByIdAndUpdate({_id: req.body.data._id}, {
            ph_number: req.body.data.ph_number,
            name: req.body.data.name,
            role: req.body.data.role,
            email_id: req.body.data.email_id
          }).then(response => {
            res.status(200).json('Updated the Employee successfully')
          }).catch(err => {
            res.status(400).json('Error occured while updating the employee')
          })
        }
        
        
      }
    }
    
  } catch (e) {
    console.log(e);
    res.status(400).json('Error occured while creating an employee')
  }
})

router.delete('/', (req, res) => {
  Users.findOneAndDelete({_id: req.body._id}).then((response) => {
    res.status(200).json('Employee deleted successfully');
  }).catch((err) => {
    res.status(400).json('Error occured while deleting the employee');
  })
})

export default router;
