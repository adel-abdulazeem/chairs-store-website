const Order = require('../models/Order')
const CartItems = require('../models/CartItem')

module.exports = {
  getOrder: async (req, res) => {
    try{
      const orderedItem = await Order.find({userId: req.user.id})
      const items = orderedItem.map(el => el.items)
        res.render('order', {items})
    } catch(err){
        console.log(err)
    }
},

  submitOrder: async (req,res) => {
          try{
            const selectedItems = await CartItems.aggregate([
              {
                  $match: { userId: req.user.id }
               },
                {
                  $group: {
                    _id: "$name", 
                    doc: { $first: "$$ROOT" }, 
                    count: { $sum: 1 } 
                  }
                },
                {
                  $addFields: {
                    name: "$_id",
                    _id: "$doc._id", 
                    name: "$doc.name", 
                    price: "$doc.price",
                    image: "$doc.image", 
                    count: "$count" 
                  }
                },
                {
                  $project: {
                    _id: 1, 
                    name: 1, 
                    price: 1, 
                    image: 1, 
                    count: 1 
                  }
                }
            ])
            console.log(selectedItems);
            await Order.create({
              fullName: [req.body.firstName, req.body.secondName].join(' '),
              items: selectedItems,
              itemsCount: selectedItems.map(el => el.count).reduce((acc,c) => acc + c),
              phoneNo: req.body.phoneNo,
              total: selectedItems.map(el => el.price * el.count).reduce((acc,c) => acc +c),
              location: req.body.location,
              userId: req.user.id,
            });
            await CartItems.deleteMany({userId: req.user.id})
            res.redirect('/order')
          } catch(err) {
              res.redirect('/cart?error=true')
          }
      },
}