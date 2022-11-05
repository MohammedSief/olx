


const showProduct = (req,res)=>{

    const {productTitle, productDesc, productPrice} = req.body;
    
    res.json({message: `${productTitle} , ${productDesc} , ${productPrice}`})

}


module.exports= showProduct