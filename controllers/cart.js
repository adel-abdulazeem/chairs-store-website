const { name } = require('ejs');
const CartItems = require('../models/CartItem')
const MenuItems = require('../models/MenuItem')

module.exports = {
    getOrder: async (req, res) => {
        try {
          const selectedItems = await CartItems.aggregate([
              {
                  $match: { userId: req.user.id }
                  },
                {
                  $group: {
                    _id: "$name", // Group by the 'name' field
                    doc: { $first: "$$ROOT" }, // Get the first document in each group
                    count: { $sum: 1 } // Count the number of documents in each group
                  }
                },
                {
                  $addFields: {
                    name: "$_id",
                    _id: "$doc._id", // Retain the original _id
                    name: "$doc.name", // Include other fields from doc
                    price: "$doc.price",
                    image: "$doc.image", // Include image field
                    count: "$count" // Include the count field
                  }
                },
                {
                  $project: {
                    _id: 1, // Retain the original _id
                    name: 1, // Include the name field
                    price: 1, // Include the name field
                    image: 1, // Include the image field
                    count: 1 // Include the count field
                  }
                }
            ]);
          //   console.log('Count of documents by age:', selectedItems);
          res.render('submitOrder', {selectedItems})
        } catch (err) {
          console.log(err);
        }
      },
    getCartItems: async (req, res) => {
        try{
            const selectedItems = await CartItems.aggregate([
                {
                    $match: { userId: req.user.id }
                  },
                {

                    $group: {
                      _id: "$name", // Group by the 'name' field
                      doc: { $first: "$$ROOT" }, // Get the first document in each group
                      total: { $sum: 1 } // Count the number of documents in each group
                    }
                  },
                  {
                    $addFields: {
                      name: "$_id",
                      _id: "$doc._id", // Retain the original _id
                      name: "$doc.name", // Include other fields from doc
                      price: "$doc.price",
                      image: "$doc.image", // Include image field
                      count: "$doc.count" // Include the count field
                    }
                  },
                  
                    { $sort : { count : -1} }
                  ,
                  {
                    $project: {
                      _id: 1, // Retain the original _id
                      name: 1, // Include the name field
                      price: 1, // Include the name field
                      image: 1, // Include the image field
                      count: 1 // Include the count field
                    }
                  }
              ]);
            //   console.log('Count of documents by age:', selectedItems);
            res.render('cart', {selectedItems})
        } catch(err){
            console.log(err)
        }
    },
    addToCart: async (req,res) => {
      try{

        const item = await MenuItems.findOne({name: req.params.name});
        const newItem =  new CartItems({
          name: item.name,
          price: item.price,
          image: item.image,
          count: 1,
          userId: req.user.id
            })
          await newItem.save()
          res.redirect('/menu')
      } catch(err) {
          res.redirect('/cart?error=true')
      }
  },
    incrementItem: async (req,res) => {
          try {
            await CartItems.findOneAndUpdate(
              { _id: req.params.id },
              {
                $inc: { count: 1 },
              }
            );
            console.log("item +1");
            res.redirect('/cart')
        } catch(err) {
            res.redirect('/cart?error=true')
        }
    },
    deleteCartItem: async (req, res) => {
        try {
          await CartItems.findOneAndUpdate(
            { _id: req.params.id },
            { $inc: { count: -1 } }
          );
          console.log("item +1");
          res.redirect('/cart')
        } catch(err) {
            res.redirect('/item?error=true')
        }
     },
    deleteItem: async (req, res) => {
      const {name} = req.params 
      try {
            await CartItems.deleteMany({name: name})
            console.log("Deleted Post");
            res.redirect("/cart");
          } catch (err) {
        res.redirect("/cart");
      }
    }
}