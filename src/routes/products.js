// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/products')
    },
    filename: (req, file, cb) => {
        cb(null, 'img' + Date.now() + path.extname(file.originalname))
    } 
})

const upload = multer({ storage: storage })

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id/', productsController.detail); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create);
router.post('/', upload.single('image') ,productsController.store); 




/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit);
router.put('/:id', productsController.update);

/*** DELETE ONE PRODUCT***/ 
router.delete('/:id', productsController.destroy);


module.exports = router;
