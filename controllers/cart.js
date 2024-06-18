const { name } = require('ejs');
const CartItems = require('../models/cartItems')
const MenuItems = require('../models/MenuItems')


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
            res.render('cart', {selectedItems})
        } catch(err){
            console.log(err)
        }
    },
    addToCart: async (req,res) => {
      const item = await MenuItems.findOne({name: req.params.name});
      const newItem =  new CartItems({name: item.name, price: item.price, image: item.image, userId: req.user.id})
      try{
          await newItem.save()
          res.redirect('/menu')
      } catch(err) {
          res.redirect('/cart?error=true')
      }
  },
    incrementItem: async (req,res) => {
      const item = await MenuItems.findOne({name: req.params.name});
      const newItem =  new CartItems({name: item.name, price: item.price, image: item.image, userId: req.user.id})
        try{
            await newItem.save()
            res.redirect('/cart')
        } catch(err) {
            res.redirect('/cart?error=true')
        }
    },
    deleteCartItem: async (req, res) => {
        const {id} = req.params 
        try {
            await CartItems.findByIdAndDelete(id)
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