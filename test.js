const products = require('./src/data/productsDataBase.json')

function test(req, res) {
    // let userSearch = req.params.id;
    let userSearch = 2;
    for (let product of products) {
        if (product.id == userSearch) {
            res.send(product)
        }
    }
}

console.log(test())