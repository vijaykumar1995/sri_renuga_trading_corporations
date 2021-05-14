import express from 'express';
import authenticate from '../middleware/authenticate';
import Purchase_Company from '../model/Purchase_Company';
import _ from 'lodash';

const router = express.Router();
router.use(authenticate);

router.post('/', (req, res) => {
  if(_.isEmpty(req.body) || _.isEmpty(req.body.data)) {
    res.status(400).json({ errors: 'All the fields are required' })
  } else {
    Purchase_Company.create(req.body.data).then((response) => {
      res.status(200).json('Purchase company successfully created');
    }).catch((err) => {
      res.status(400).json('Error in creating the Purchase Company Details');
    })
  }
});

router.get('/', (req, res) => {
  Purchase_Company.find().then((response) => {
    res.status(200).json(response);
  }).catch((err) => {
    res.status(400).json('Error in fetching the data');
  })
})

router.put('/', (req, res) => {
  Purchase_Company.findByIdAndUpdate({_id: req.body.data._id}, {
    name: req.body.data.name,
    gst_number: req.body.data.gst_number
  }).then((response) => {
    res.status(200).json('Purchase Company Details updated successfully');
  }).catch((err) => {
    res.status(400).json('Error in updating the purchase company details');
  })
})

router.delete('/', (req, res) => {
  console.log(req.body)
  Purchase_Company.findOneAndDelete({_id: req.body._id}).then((response) => {
    res.status(200).json('Purchase Company deleted successfully');
  }).catch((err) => {
    res.status(400).json('Unable to Delete the record');
  })
})

router.post('/csv_upload', async(req, res) => {
  try {
    for(let i of req.body.data) {
      let purchaseCompany = await Purchase_Company.findOne({name: i.company_name});
      let gstNumber = await Purchase_Company.findOne({gst_number: i.gst_number});
      if(purchaseCompany == null && gstNumber == null) {
        Purchase_Company.create({
          name: i.company_name,
          gst_number: i.gst_number
        })
      }
    }

    res.status(200).json('Uploaded the CSV fail successfully');
  } catch(err) {
    res.status(400).json('Error in uploading the CSV file');
  }
  
})

export default router;