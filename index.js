const express = require('express');
const{
    getUsers,
    getProducts,
    getUserFavorites,
    addFavorite,
    client,
    deleteFavorite
} = require("./db");

const app = express();
const router = express.Router();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

router.get('/users', async(req,res, next)=> {
    try {  
        const users = await getUsers();
        res.json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching users' });
            }
})

router.get('/products', async(req,res, next)=> {
    try {  
        const users = await getProducts();
        res.json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching users' });
            }
})
router.get('/users/:id/favorites', async(req,res, next)=> {
    try {
        const id = req.params.id;
        const favorites = await getUserFavorites(id);
        res.json(favorites);
        } catch (error) {
            console.error(error);
            res.status(404).json({ message: 'User not found' });
            }
            })

router.post('/users/:id/favorites', async (req, res, next) => {
        try {
            const userId = req.params.id; 
            const { product_id, user_id } = req.body; 
            res.send(await addFavorite(product_id, userId)); 
            } catch (error) {
                    console.error(error);
                    res.status(404).json({ message: 'User not found' });
                }
            })

router.delete('/users/:id/favorites/:productId', async (req, res, next) => {
        try {
            const userId = req.params.id; 
            const productId = req.params.productId; 
            res.send(await deleteFavorite(productId, userId));
            } catch (err) {
                    next(err);
                }
            });
            

app.use('/api', router);
app.use(express.json());

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: "server" });
});

client.connect()
    .then(() => {
        app.listen(3000, () => {
            console.log("App 3000");
        });
    })
    .catch(err => {
        console.error(err);
    });