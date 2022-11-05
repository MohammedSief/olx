const router = require('express').Router();
const showProduct = require('./controller/showProduct');


router.get("/products/all" , showProduct);




module.exports= router