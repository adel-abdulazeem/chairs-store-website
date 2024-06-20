const Order = require('../models/Order')

const CartItems = require('../models/CartItem')

module.exports = {
  getOrder: async (req, res) => {
    try{

      const orderedItem = await Order.find({userId: req.user.id})
      const items = orderedItem.map(el => el.items)
           console.log( items);
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
                    image: 1, // Include the image field
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