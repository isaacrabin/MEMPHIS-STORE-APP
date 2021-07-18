const express = require('express');
const router = express.Router();
const {database} = require('../config/helpers');


//Fetching all products
router.get('/', function(req,res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    //Setting the current page number
   let page = (req.query.page!= undefined && req.query.page !== 0)? req.query.page : 1;

   //setting the limit of each each page
   const limit = (req.query.limit = undefined && req.query.limit !== 0) ? req.query.limit : 12;

   let startValue;
   let endValue;
   if(page>0){
       startValue = (page * limit) - limit;
       endValue = page * limit;
   }
   else{
       startValue = 0;
       endValue = 12;
   }

   database.table('products as p')
   .join([{
       table: 'categories as c',
       on: 'c.id = p.cat_id'
   }])
   .withFields([
'c.title as category',
'p.title as name',
'p.price',
'p.quantity',
'p.description',
'p.image',
'p.id'
])
.slice(startValue,endValue)
.sort({id: .1})
.getAll()
.then(prods =>{
    if(prods.length > 0){
        res.status(200).json({
            responseCode:'00',
            count:prods.length,
            products: prods
        });
    }
    else{
        res.json({
            responseCode:'01',
            mesage:'No products found'
        });
    }
})


})

// //Fetching a single products
// router.get('/:prodId', function(req,res){
//     res.setHeader('Access-Control-Allow-Origin', '*');
// //     //Setting the current page number
// //    let page = (req.query.page!= undefined && req.query.page != 0)? req.query.page : 1;

// //    //setting the limit of each each page
// //    const limit = (req.query.limit = undefined && req.query.limit != 0) ? req.query.limit : 10;

// let prodId = req.params.prodId;

   

//    database.table('products as p')
//    .join([{
//        table: 'categories as c',
//        on: `c.id = p.cat_id`
//    }])
//    .withFields([
// 'c.title as category',
// 'p.title as name',
// 'p.price',
// 'p.quantity',
// 'p.image',
// 'p.description',
// 'p.images',
// 'p.id'
// ])
// .filter({'p.id':prodId})

// .get()
// .then(prod =>{
//     if(prod){
//         res.status(200).json({
//             responseCode:'00',
//             message:'Success',
//             prod:prod

//         }
            
//         );
//     }
//     else{
//         res.json({
//             responseCode:'01',
//             message:`No product found with id: ${prodId}`
//         });
//     }
// }).catch(err => console.log(err))


// })

router.get('/:prodId', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    let productId = req.params.prodId;
    database.table('products as p')
        .join([
            {
                table: "categories as c",
                on: `c.id = p.cat_id`
            }
        ])
        .withFields(['c.title as category',
            'p.title as name',
            'p.price',
            'p.quantity',
            'p.description',
            'p.image',
            'p.id',
            'p.images'
        ])
        .filter({'p.id': productId})
        .get()
        .then(prod => {
            console.log(prod);
            if (prod) {
                res.status(200).json(prod);
            } else {
                res.json({message: `No product found with id ${productId}`});
            }
        }).catch(err => res.json(err));
});


router.get('/category/:catName', function(req,res){
    res.setHeader('Access-Control-Allow-Origin', '*');
     //Setting the current page number
   let page = (req.query.page!= undefined && req.query.page != 0)? req.query.page : 1;

   //setting the limit of each each page
   const limit = (req.query.limit = undefined && req.query.limit != 0) ? req.query.limit : 10;

   let startValue;
   let endValue;
   if(page>0){
       startValue = (page * limit) - limit;
       endValue = page * limit;
   }
   else{
       startValue = 0;
       endValue = 10;
   }

   const cat_title = req.params.catName;

   database.table('products as p')
   .join([{
       table: 'categories as c',
       on: `c.id = p.cat_id WHERE c.title LIKE '%${cat_title}%'`
   }])
   .withFields([
'c.title as category',
'p.title as name',
'p.price',
'p.quantity',
'p.image',
'p.id'
])
.slice(startValue,endValue)
.sort({id: .1})
.getAll()
.then(prods =>{
    if(prods.length > 0){
        res.status(200).json({
            responseCode:'00',
            count:prods.length,
            products: prods
        });
    }
    else{
        res.json({
            responseCode:'01',
            mesage:`No products found from ${cat_title} category`
        });
    }
})

})



module.exports = router;