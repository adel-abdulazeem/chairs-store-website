const MenuItems = require('../models/MenuItem')

module.exports = {
    getMenu: async (req, res) => {
        const chairs = await MenuItems.find({})
        res.render('menu.ejs', {chairs: chairs, user: req.user})
    },
    showDetails: async (req, res) => {
       try { const item = await MenuItems.findOne({_id: req.params.id})
        res.json(item)
    } catch(err) {
        res.redirect('/details?error=true')
    }
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
                            "image": "1.png",
                            "detail": 'typically designed for one person and consisting of one or more legs, a flat or slightly angled seat and a back-rest'
                        },
                        {
                            "id": 2,
                            "name":" LD02 LOUNGE CHAIR",
                            "price": 250,
                            "image": "2.png",
                            "detail": 'typically designed for one person and consisting of one or more legs, a flat or slightly angled seat and a back-rest'
                            
                        },
                        {
                            "id": 3,
                            "name":" LD03 LOUNGE CHAIR",
                            "price": 290,
                            "image": "3.png",
                            "detail": 'typically designed for one person and consisting of one or more legs, a flat or slightly angled seat and a back-rest'
                        },
                        {
                            "id": 4,
                            "name":" LD04 LOUNGE CHAIR",
                            "price": 200,
                            "image": "4.png",
                            "detail": 'typically designed for one person and consisting of one or more legs, a flat or slightly angled seat and a back-rest'
                            },
                        {
                            "id": 5,
                            "name":" LD05 LOUNGE CHAIR",
                            "price": 300,
                            "image": "5.png",
                            "detail": 'typically designed for one person and consisting of one or more legs, a flat or slightly angled seat and a back-rest'
                             },
                        {
                             "id": 6,
                             "name":" LD06 LOUNGE CHAIR",
                             "price": 200,
                             "image": "6.png",
                             "detail": 'typically designed for one person and consisting of one or more legs, a flat or slightly angled seat and a back-rest'
                            },
                        {
                            "id": 7,
                            "name":" LD07 LOUNGE CHAIR",
                            "price": 200,
                            "image": "7.png",
                            "detail": 'typically designed for one person and consisting of one or more legs, a flat or slightly angled seat and a back-rest'
                            },
                        {
                            "id": 8,
                            "name":" LD08 LOUNGE CHAIR",
                            "price": 200,
                            "image": "8.png",
                            "detail": 'typically designed for one person and consisting of one or more legs, a flat or slightly angled seat and a back-rest'
                            }
                        ])
            console.log('data has been added')
            res.redirect('/menu')
        } catch(err) {
            res.redirect('/item?error=true')
        }
     }
}