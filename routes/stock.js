import express from 'express';
import _ from 'lodash';
import authenticate from '../middleware/authenticate';
import Product from '../model/Product';
// import Stock from '../model/Stock';
import moment from 'moment';
import momentTimezone from 'moment-timezone';
import Invoice_Number from '../model/Invoice_Number';
import Stock from '../model/Stock';
import Purchase_Company from '../model/Purchase_Company';

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
  Invoice_Number.create({
    invoice_number: req.body.data.invoice_number,
    purchase_date: momentTimezone(req.body.data.purchase_date).utc().utcOffset('+05:30'),
    company_name: req.body.data.company_name.actual_value,
    gst_Number: req.body.data.gst_Number,
    type: 'Purchase'
  }).then(response  => {
    var stockList = [];
    
    for(let i of req.body.data.stockList) {
      let expiryDate = momentTimezone(i.expiry_date).utc().utcOffset('+05:30')
      let currentDate = momentTimezone(new Date()).utc().utcOffset('+05:30').format('YYYY-MM-DD');
      currentDate = currentDate+ 'T00:00:00+05:30';
      currentDate = momentTimezone(currentDate).utc().utcOffset('+05:30')
      if(currentDate > expiryDate) {
        i.active = false
      }
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
      let productsMap = new Map();
      for(let i of req.body.data.stockList) {
        
        if(i.active === true) { 
          if(productsMap[i.product.actual_value] === undefined) {
            productsMap[i.product.actual_value] =  parseInt(i.quantity)
          } else {
            var quantity;
            quantity = productsMap[i.product.actual_value];
            quantity += parseInt(i.quantity);
            productsMap[i.product.actual_value] = quantity
          }
        }
      }
      
      for(let i in productsMap) {
        Product.findOne({_id: i}).then(product => {
          var availability = product.availability;
          availability = availability + productsMap[i];
          Product.findOneAndUpdate({_id: i}, {availability: availability}).then(prodUpdate => {
          }).catch(err => {
            res.status(400).json('Error occured while updating the product')
          })
        })
      }
      res.status(200).json(response);
    }).catch(err => {
      console.log('inside err ', err)
      res.status(400).json('Error occured while creating the stock')
    })
  }).catch(err => {
    console.log(err)
    res.status(400).json('Error occured while creating the Invoice Number')
  })
})

router.get('/fetch_single', (req, res) => {
  let invoiceDetail = {
    _id: '',
    invoice_number: '',
    purchase_date: '',
    company_name: '',
    gst_Number: '',
    type: '',
    stockList: []
  }
  Stock.find({invoice_number: req.query._id}).then(stocks => {
  Invoice_Number.findOne({_id: req.query._id}).then(invoiceNumber => {
    Purchase_Company.findOne({_id: invoiceNumber.company_name}).then(purchaseCompany => {
      invoiceDetail._id = invoiceNumber._id;
      invoiceDetail.invoice_number = invoiceNumber.invoice_number;
      invoiceDetail.purchase_date = invoiceNumber.purchase_date;
      invoiceDetail.company_name = purchaseCompany.name;
      invoiceDetail.gst_Number = invoiceNumber.gst_Number,
      invoiceDetail.type = invoiceNumber.type
      let productsList = [];
        for(let i of stocks) {
          productsList.push(i.product);
        }
        Product.find({ _id:  { $in: productsList} }).then(products => {
          for(let i of stocks) {
            for(let prod of products) {
              if(i.product.toString() == prod._id.toString()) {
                let stock = {
                  type: i.type,
                  reason_for_return: i.reason_for_return,
                  purchase_date: i.purchase_date,
                  quantity: i.quantity,
                  product: prod.name,
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
                invoiceDetail.stockList.push(stock);
              }
            }
          }
          res.status(200).json(invoiceDetail)
        }).catch(err => {res.status(400).json('Error occured while fetching the Products')})
      }).catch(err => { res.status(400).json('Error Occured while fetching the Invoice Number') })
    }).catch(err => { res.status(400).json('Error Occured while fetching the Stock') })
  })
})
export default router;