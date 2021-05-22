import express from 'express';
import _ from 'lodash';
import authenticate from '../middleware/authenticate';
import Product from '../model/Product';
// import Stock from '../model/Stock';
import moment from 'moment';
import momentTimezone from 'moment-timezone';
import Invoice_Number from '../model/Invoice_Number';
import Stock from '../model/Stock';

const router = express.Router();
router.use(authenticate);

router.get('/', async(req, res) => {
  try {
    let stockList = [];
    let response = await Stock.find()
    for(let i of response) {
      let product = await Product.findOne({ _id: i.product })
      var data = {
        invoice_number: i.invoice_number,
        type: i.type,
        reason_for_return: i.reason_for_return,
        purchase_date: i.purchase_date,
        product: product.name,
        quantity: i.quantity,
        company_name: i.company_name,
        gst_Number: i.gst_Number,
        gst_percentage: i.gst_percentage,
        hsn_code: i.hsn_code,
        unit_price: i.unit_price,
        cgst_cost: i.cgst_cost,
        sgst_cost: i.sgst_cost,
        batch_number: i.batch_number,
        expiry_date: i.expiry_date,
        available_quantity: i.available_quantity,
        active: i.active,
        weight: i.weight,
        category: i.category,
      }
      stockList.push(data);
    }
    res.status(200).json(stockList);
  } catch (e) {
    res.status(400).json('Error occured while fetching the stock')
  }
  
})

router.post('/', (req, res) => {
  console.log(req.body.data)
  Invoice_Number.create({
    invoice_number: req.body.data.invoice_number,
    purchase_date: momentTimezone(req.body.data.purchase_date).utc().utcOffset('+05:30'),
    company_name: req.body.data.company_name.actual_value,
    gst_Number: req.body.data.gst_Number,
    type: 'Purchase'
  }).then(response  => {
    var stockList = [];
    for(let i of req.body.data.stockList) {
      let stock = {
        invoice_number: response._id,
        type: i.type,
        reason_for_return: i.reason_for_return,
        purchase_date: momentTimezone(req.body.data.purchase_date).utc().utcOffset('+05:30'),
        product: i.product.actual_value,
        quantity: i.quantity,
        gst_percentage: i.gst_percentage,
        hsn_code: i.hsn_code,
        unit_price: i.unit_price,
        cgst_cost: i.cgst_cost,
        sgst_cost: i.sgst_cost,
        batch_number: i.batch_number,
        expiry_date: momentTimezone(i.expiry_date).utc().utcOffset('+05:30'),
        available_quantity: i.available_quantity,
        active: i.active,
        weight: i.weight,
        category: i.category
      }
      stockList.push(stock);
    }
    Stock.create(stockList).then(stockResponse => {
      console.log(stockResponse);
    }).catch(err => {
      res.status(400).json('Error occured while creating the stock')
    })
  }).catch(err => {
    res.status(400).json('Error occured while creating the Invoice Number')
  })
})
export default router;