import express from 'express';
import _ from 'lodash';
import authenticate from '../middleware/authenticate';
import Weight from '../model/Weight';

const router = express.Router();
router.use(authenticate)

router.post('/', (req, res) => {
  if(_.isEmpty(req.body) || _.isEmpty(req.body.data)) {
    res.status(400).json({ errors: 'All the fields are required' })
  } else {
    Weight.create(req.body.data).then((response) => {
      res.status(200).json('Weight are successfully created');
    }).catch((err) => {
      console.log('inside the error' , err.errors.name.properties.message);
      res.status(400).json(err.errors.name.properties.message);
    })
  }
})


router.get('/', (req, res) => {
  Weight.find().then((response) => {
    console.log('inside the success');
    res.status(200).json(response);
  }).catch((err) => {
    res.status(400).json(err.data);
  })
})

router.put('/', (req, res) => {
  Weight.findByIdAndUpdate({_id: req.body.data._id}, {
    name: req.body.data.name
  }).then((response) => {
    res.status(200).json('Weight is successfully updated');
  }).catch((err) => {
    res.status(400).json(err.errors.name.properties.message);
  })
})

router.delete('/', (req, res) => {
  console.log(req.body)
  Weight.findOneAndDelete({_id: req.body._id}).then((response) => {
    res.status(200).json('Weight deleted successfully');
  }).catch((err) => {
    res.status(400).json(err.errors.name.properties.message);
  })
})

export default router;