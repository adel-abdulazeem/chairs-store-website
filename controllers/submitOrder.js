const CartItems = require('../models/CartItem')

module.exports = {
    getOrder: async (req, res) => {
        try {
          const selectedItems = await CartItems.find({userId: req.user.id});
          res.render('submitOrder', {selectedItems})
        } catch (err) {
          console.log(err);
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
            res.redirect('/submitOrder')
        } catch(err) {
            res.redirect('/submitOrder?error=true')
        }
    },
    decreaseItem: async (req, res) => {
        try {
          await CartItems.findOneAndUpdate(
            { _id: req.params.id },
            { $inc: { count: -1 } }
          );
          console.log("item -1");
          res.redirect('/submitOrder')
        } catch(err) {
            res.redirect('/submitOrder?error=true')
        }
     },
    deleteItem: async (req, res) => {
      const {id} = req.params 
      try {
            await CartItems.deleteOne({_id: id})
            console.log("Deleted item");
            res.redirect("/submitOrder");
          } catch (err) {
        res.redirect("/submitOrder");
      }
    }
}