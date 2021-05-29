import express, { response } from 'express';
import authenticate from '../middleware/authenticate';
import Settings from '../model/Settings';
import Stock from '../model/Stock';
import MomentTimeZone from 'moment-timezone';
import Product from '../model/Product';

const router = express.Router();
router.use(authenticate);

router.get('/update_stock', (req, res) => {
  try {
    console.log('inside the stock maintainance')
    Settings.findOne().then(currentDate => {
      var todaysDate = MomentTimeZone(new Date()).utc().utcOffset('+05:30').format('YYYY-MM-DD');
      todaysDate = todaysDate+ 'T00:00:00+05:30';
      todaysDate = MomentTimeZone(todaysDate).utc().utcOffset('+05:30').format('DD-MM-YYYY')
      var settingsDate = MomentTimeZone(currentDate.currentDate).utc().utcOffset('+05:30').format('DD-MM-YYYY');
      console.log(settingsDate);
      console.log(todaysDate)
      console.log(settingsDate == todaysDate)
      if(settingsDate !== todaysDate) {
        Stock.find({active: true, expiry_date: {$ne: null}}).then(stocks => {
          for(let i of stocks) {
            if(MomentTimeZone(i.expiry_date).utc().utcOffset('+05:30').format('DD-MM-YYYY') < MomentTimeZone(new Date()).utc().utcOffset('+05:30').format('DD-MM-YYYY')) {
              Product.findOne({_id: i.product}).then(product => {
                let availability = product.availability;
                availability -= i.available_quantity
                Product.findOneAndUpdate({_id: i.product}, {availability: availability}).then(updateProduct => {
                  Stock.findOneAndUpdate({_id: i._id}, {active: false}).then(updatedStock => {
                  }).catch(err => {
                    console.log(err)
                  })
                }).catch(err => {
                  console.log(err)
                })
              }).catch(err => {
                console.log(err)
              })
            }
          }
        }).catch(err => {
          console.log(err)
        })
      }
      let dateToday = MomentTimeZone(new Date()).utc().utcOffset('+05:30').format('YYYY-MM-DD');
      dateToday = dateToday+ 'T00:00:00+05:30';
      dateToday = MomentTimeZone(dateToday).utc().utcOffset('+05:30')
      Settings.findOneAndUpdate({ _id: currentDate._id}, {currentDate: dateToday}).then(settings => {
        res.status(200).json('Response Generated Successfully');
      }).catch(err => {
        console.log(err)
      });
    }).catch(err => {
      console.log(err)
    })
  } catch (err) {
    console.log(err)
  }
})

router.get('/', (req,res) => {
  Settings.findOne().then(currentDate => {
    var todaysDate = MomentTimeZone(new Date()).utc().utcOffset('+05:30').format('DD-MM-YYYY');
      var settingsDate = MomentTimeZone(currentDate.currentDate).utc().utcOffset('+05:30').format('DD-MM-YYYY');
      console.log(settingsDate !== todaysDate)
      if(settingsDate !== todaysDate) {
        res.status(200).json('Need to Update the Stock');
      } else {
        res.status(200).json('Stock is already updated');
      }
  }).catch(err => {
    console.log(err)
  })
})

export default router