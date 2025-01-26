const CartItems = require('../models/CartItem')
const MenuItems = require('../models/MenuItem')

module.exports = {
    getOrder: async (req, res) => {
        try {
          const selectedItems = await CartItems.find({userId: req.user.id});
          res.render('submitOrder', {selectedItems})
        } catch (err) {
          console.log(err);
        }
      },
    getCartItems: async (req, res) => {
        try{
            const selectedItems = await CartItems.find({userId: req.user.id})
            res.render('cart', {selectedItems})
        } catch(err){
            console.log(err)
        }
    },
    addToCart: async (req,res) => {
      try{
// console.log(req)
        const item = await MenuItems.findOne({name: req.params.name}).lean();
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
    decreaseItem: async (req, res) => {
        try {
          await CartItems.findOneAndUpdate(
            { _id: req.params.id },
            { $inc: { count: -1 } }
          );
          console.log("item -1");
          res.redirect('/cart')
        } catch(err) {
            res.redirect('/cart?error=true')
        }
     },
    deleteItem: async (req, res) => {
      const {id} = req.params 
      try {
            await CartItems.deleteOne({_id: id})
            console.log("Deleted Item");
            res.redirect("/cart");
          } catch (err) {
        res.redirect("/cart");
      }
    }
}