import express from 'express';
import _ from 'lodash';
import authenticate from '../middleware/authenticate';
import Categories from '../model/Categories';

const router = express.Router();
router.use(authenticate)

router.post('/', (req, res) => {
  if(_.isEmpty(req.body) || _.isEmpty(req.body.data)) {
    res.status(400).json({ errors: 'All the fields are required' })
  } else {
    Categories.create(req.body.data).then((response) => {
      res.status(200).json('Categories are successfully created');
    }).catch((err) => {
      console.log('inside the error' , err.errors.name.properties.message);
      res.status(400).json(err.errors.name.properties.message);
    })
  }
})


router.get('/', (req, res) => {
  Categories.find().then((response) => {
    res.status(200).json(response);
  }).catch((err) => {
    res.status(400).json(err.data);
  })
})

router.put('/', (req, res) => {
  Categories.findByIdAndUpdate({_id: req.body.data._id}, {
    name: req.body.data.name,
    hsn_code: req.body.data.hsn_code,
    gst_percentage: req.body.data.gst_percentage
  }).then((response) => {
    res.status(200).json('Category is successfully updated');
  }).catch((err) => {
    res.status(400).json(err.errors.name.properties.message);
  })
})

router.delete('/', (req, res) => {
  console.log(req.body)
  Categories.findOneAndDelete({_id: req.body._id}).then((response) => {
    res.status(200).json('Category deleted successfully');
  }).catch((err) => {
    res.status(400).json(err.errors.name.properties.message);
  })
})

export default router;