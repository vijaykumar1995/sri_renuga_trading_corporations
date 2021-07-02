import express from 'express';
import authenticate from '../middleware/authenticate';
import Settings from '../model/Settings';

const router = express.Router();
router.use(authenticate);

router.post('/', async(req, res) => {
  let settings = await Settings.findOne();
  let data = req.body.data;
  if(settings != null) {
    await Settings.findByIdAndUpdate({ _id: settings._id }, data);
  } 
  
})

router.get('/', async(req, res) => {
  let settings = await Settings.findOne();
  res.status(200).json(settings);
})

export default router;