const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products', { products: products });
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let userSearch = req.params.id;
		for (let product of products) {
			if (product.id == userSearch) {
				res.render('detail',
					{
						products: products,
						userSearch: userSearch
					})
			}
		}
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		let newProduct = {
			id: products[products.length - 1].id + 1,
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
			category: req.body.category,
			description: req.body.description,
			image: req.file.filename
		}
		products.push(newProduct)
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '))
		res.redirect('/products')
	},

	// Update - Form to edit
	edit: (req, res) => {
		let id = req.params.id;
		let product = products.find(oneProduct => oneProduct.id == id);
		res.render('product-edit-form', {
			product, toThousand
		})
	},
	// Update - Method to update
	update: (req, res) => {
		let id = req.params.id;
		let productToEdit = products.find(product => product.id == id);

		productToEdit = {
			id: productToEdit.id,
			...req.body,
			image: productToEdit.image
		}
		let newProducts = products.map(product => {
			if (product.id == productToEdit.id) {
				return product = { ...productToEdit }
			}
			return product;
		})
		fs.writeFileSync(productsFilePath, JSON.stringify(newProducts, null, ' '))
		res.redirect('/products')
	},

	// Delete - Delete one product from DB
	destroy: (req, res) => {
		id = req.params.id;
		let finalProducts = products.filter(product => product.id != id)
		fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts, null, ' '))
		res.redirect('/products')
	}
}

module.exports = controller;