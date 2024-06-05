
const pg = require('pg');

const client = new pg.Client('postgres://localhost/acme_store');


//working
//GET /api/users
const getUsers = async()=>{
    const response = await client.query('SELECT * FROM users');
    return response.rows;
}

//working
//GET /api/products
const getProducts = async()=>{
    const response = await client.query('SELECT * FROM products');
    return response.rows;
}
//working
//GET /api/users/:id/favorites
const getUserFavorites = async(id)=>{
    const response = await client.query('SELECT p.name FROM favorite AS f JOIN products AS p ON f.product_id = p.id WHERE f.user_id = $1', [id]);
    return response.rows;
    }


//POST /api/users/:id/favorites
const addFavorite = async(product_id, user_id)=>{
    try{
    await client.query('INSERT INTO favorite (product_id, user_id) VALUES ($1, $2)', [product_id, user_id]);
    return 'Favorite added successfully';
    }catch(err){
        return 'Error adding favorite';
        }
        }

 //DELETE /api/users/:id/favorites/:productId
        const deleteFavorite = async(product_id, user_id)=>{
                try {
                    await client.query('DELETE FROM favorite WHERE product_id = $1 AND user_id = $2', [product_id, user_id]);
                    return 'Favorite deleted successfully';
                } catch (err) {
                    console.error(err);
                    throw err;
                }
            }    

module.exports={
    getUsers,
    getProducts,
    getUserFavorites,
    addFavorite,
    deleteFavorite,
    client
}

