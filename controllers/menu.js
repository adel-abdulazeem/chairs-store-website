const MenuItems = require('../models/MenuItems')

module.exports = {
    getMenu: async (req, res) => {
        const chairs = await MenuItems.find({})
        
        res.render('menu.ejs', {chairs: chairs, user: req.user})
    },
    createItem:  async (req, res) => {
        //Insert Menu Items into db
        try {
            await MenuItems.insertMany(
                [
                        {
                            "id": 1,
                            "name":" LD01 LOUNGE CHAIR",
                            "price": 200,
                            "image": "1.png"
                        },
                        {
                            "id": 2,
                            "name":" LD02 LOUNGE CHAIR",
                            "price": 250,
                            "image": "2.png"
                        },
                        {
                            "id": 3,
                            "name":" LD03 LOUNGE CHAIR",
                            "price": 290,
                            "image": "3.png"
                        }
                    
                    ]
            )
            console.log('data has been added')
            res.redirect('/menu')
        } catch(err) {
            res.redirect('/item?error=true')
        }
     }
}