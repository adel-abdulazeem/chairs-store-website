const CartItems = require('../models/cartItems')
const Order = require('../models/Order')

module.exports = {
  getOrder: async (req, res) => {
    try{

        const orderedItem = await CartItems.aggregate([
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
        res.render('order', {orderedItem})
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
            res.redirect('/order')
          } catch(err) {
              res.redirect('/cart?error=true')
          }
      },
}

