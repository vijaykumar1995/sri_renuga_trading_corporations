import express from 'express';
import authenticate from '../middleware/authenticate';
import Product from '../model/Product';
import Category from '../model/Categories';
import Weight from '../model/Weight';
import fs from 'fs';
import shortId from 'short-id';
import { Parser } from 'json2csv'

const router = express.Router();
router.use(authenticate);

router.post('/', (req, res) => {
  if(req.body.data === '') {
    res.status(400).json('All the fields are required');
  } else {
    console.log(req.body.data);
    Product.create(req.body.data).then(response => {
      res.status(200).json('Product is created successfully');
    }).catch(err => {
      res.status(400).json(err.errors.name.properties.message);
    })
  }
})

router.get('/', (req, res) => {
  console.log(req.query);
  if(req.query.data === undefined) {
    Product.find().sort( { active: -1 } ).then(response => {
      res.status(200).json(response);
    }).catch(err => {
      res.status(400).json(err.errors.name.properties.message);
    })
  } else {
    let product = JSON.parse(req.query.data);
    Product.find({ name: product.name }).then(response => {
      console.log(response);
      res.status(200).json(response);
    }).catch(err => {
      res.status(400).json(err.errors.name.properties.message);
    })
  }
  
})

router.delete('/', (req, res) => {
  Product.findByIdAndDelete({_id: req.body._id}).then((response) => {
    res.status(200).json('Product deleted successfully');
  }).catch((err) => {
    res.status(400).json(err.errors.name.properties.message);
  })
})

router.put('/', (req, res) => {
  Product.findByIdAndUpdate({_id: req.body.data._id},{
    name: req.body.data.name,
    gst_percentage: req.body.data.gst_percentage,
    availability: req.body.data.availability,
    minimum_threshold: req.body.data.minimum_threshold,
    category: req.body.data.category,
    weight: req.body.data.weight,
    hsn_code: req.body.data.hsn_code,
    active: req.body.data.active,
    profit_percentage: req.body.data.profit_percentage
  }).then((response) => {
    res.status(200).json('Product has been updated successfully');
  }).catch((err) => {
    res.status(400).json(err.errors.name.properties.message);
  })
})

router.post('/csv_upload', async(req, res) => {
  try {
    console.log(req.body.data);
    for(let i of req.body.data) {
      let category = await Category.findOne({ name: i.category })
      let weight = await Weight.findOne({ name: i.weight })
      if(category !== null && weight !== null) {
        let product = await Product.create({
          name: i.product_name,
          category: i.category,
          weight: i.weight,
          availability: 0,
          minimum_threshold: i.minimum_availability,
          gst_percentage: category.gst_percentage,
          hsn_code: category.hsn_code,
          profit_percentage: i.profit_percentage,
          active: i.active
        })
      }
    }
    res.status(200).json('Successfully updated');
  } catch(e) {
    console.log(e.errors.name.properties.message)
    res.status(400).json(e.errors.name.properties.message);
  }
  
})

router.get('/csv_download', async(req, res) => {
  try {
    const products = await Product.find({}, {_id: 0, createdAt: 0, updatedAt: 0, __v:0})
    const path = "./client/build/reports";
    fs.existsSync(path) || fs.mkdirSync(path); //creating reports folder if it doesnt already exist
    var requestId = 'R' + shortId.generate() + - 'Products'
    var fileName = requestId + '.csv';
    const filePath = path + '/' + fileName;
    const fields = [
      {
        label: 'Product Name',
        value: 'name'
      },
      {
        label: 'GST Percentage',
        value: 'gst_percentage'
      },
      {
        label: 'HSN Code',
        value: 'hsn_code'
      },
      {
        label: 'Products Available',
        value: 'availability'
      },
      {
        label: 'Products Minimum Available',
        value: 'minimum_threshold'
      },
      {
        label: 'Category',
        value: 'category'
      },
      {
        label: 'Weight',
        value: 'weight'
      },
      {
        label: 'Active',
        value: 'active'
      },
      {
        label: 'Profit Percentage',
        value: 'profit_percentage'
      }
    ];
    
    const json2csvParser = new Parser({ fields });
    console.log('at line 140')
    var csv = json2csvParser.parse(products)
    var stream = fs.createWriteStream(filePath, { flags: "a" }); //creating a write stream instance
    stream.write(csv);
    stream.end();
    var fileUrl = "https://" + req.headers.host + "/products/" + fileName;
    if(fileUrl) {
      res.status(200).json({ products_url: fileUrl })
    } else {
      console.log("file url unavailable");
      res.status(400).json({ errors: 'file url unavailable' });
    }
    // res.status(200).json(response)
  } catch(err) {
    console.log(err);
    res.status(400).json({ errors: err });
  }
})

export default router;