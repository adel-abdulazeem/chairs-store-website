const MenuItems = require('../models/MenuItem')

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
                        },
                        {
                             "id": 3,
                            "name":" LD03 LOUNGE CHAIR",
                            "price": 290,
                            "image": "3.png"
                             },
                        {
                            "id": 4,
                            "name":" LD04 LOUNGE CHAIR",
                            "price": 200,
                            "image": "4.png"
                            },
                        {
                            "id": 5,
                            "name":" LD05 LOUNGE CHAIR",
                            "price": 300,
                            "image": "5.png"
                             },
                        {
                             "id": 6,
                             "name":" LD06 LOUNGE CHAIR",
                             "price": 200,
                             "image": "6.png"
                            },
                        {
                            "id": 7,
                            "name":" LD07 LOUNGE CHAIR",
                            "price": 200,
                            "image": "7.png"
                            },
                        {
                            "id": 8,
                            "name":" LD08 LOUNGE CHAIR",
                            "price": 200,
                            "image": "8.png"
                            }
                        ])
            console.log('data has been added')
            res.redirect('/menu')
        } catch(err) {
            res.redirect('/item?error=true')
        }
     }
}