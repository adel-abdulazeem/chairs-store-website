const CartItems = require('../models/cartItems')

async function computeCartItemCount(req, res, next) {
    try {
        
        if(req.user){
          const userId = req.user.id
         //there's a bug here especially when loggin out
        const cart = await CartItems.countDocuments({userId: userId})
        const itemCount = cart !== undefined ? cart : 0;
        res.locals.cartItemCount = itemCount;
        next();
        }else{
        userId =req.user 
        //there's a bug here especially when loggin out
        const cart = await CartItems.countDocuments({userId: userId})
        const itemCount = cart !== undefined ? cart : 0;
        res.locals.cartItemCount = itemCount;
        next();
        }

    } catch (err) {
        console.error('Error computing cart item count:', err);
        next(err);
    }
}

module.exports = { computeCartItemCount };