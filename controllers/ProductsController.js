const { where } = require('sequelize');
const Product = require('../models/ProductsModel');
const Category = require('../models/CategoryModel');
const Supplier = require('../models/SupplierModel');

module.exports = {

    async getProducts(req, res) {

        try {
            const products = await Product.findAll();
            res.json(products);

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Não foi possivel salvar' });
        }
    },


    async getThisProduct(req, res) {

        const { id } = req.params;

        try {
            const product = await Product.findByPk(id);
            res.json(product);

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Não foi possivel salvar' });
        }
    },


    async editThatProduct(req, res) {
        const { id } = req.params;

        const updatedProduct = {
            nome: req.body.nome,
            preco: req.body.preco,
            quantidade: req.body.quantidade
        }

        try {
            await Product.update(updatedProduct, { where: { id } });
            res.status(200).json('Produto atualizado')

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Não foi possivel salvar' });
        }
    },


    async editThisAtribute(req, res) {

        const { id } = req.params;
        const atributesUpdated = req.body;

        try {
            const product = await Product.findByPk(id)

            for (let i in atributesUpdated) {
                if (atributesUpdated[i] != product[i]) {
                    product[i] = atributesUpdated[i]
                }
            }
            await product.save();

            res.status(200).json('Atributo atualizado')

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Não foi possivel salvar' });
        }
    },


    async removeThisProduct(req, res) {

        const { id } = req.params;

        try {

            await Product.destroy({ where: { id } });
            res.status(200).json('Produto removido!');

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Não foi possivel salvar' });
        }
    },


    async createProduct(req, res) {

        const { name, price, quantity, category, company, cnpj, business_name } = req.body;
        const date = new Date();
        try {

            const product = await Product.create({
                name, price, quantity,
                categories: {
                    name: category,
                },

            }, {
                include: Category
            });
            const supplier = await Supplier.create({ company, cnpj, business_name });

            await product.addSupplier(supplier, { through: { purchase_date: date, quantity: quantity } })


            res.status(201).json('Produto criado');


        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Nao foi possivel criar o produto' });
        }
    },


    async getProductsByCategories(req, res) {

        try {
            const product = await Product.findAll({ include: { model: Category } });

            res.status(200).json(product);


        } catch (error) {
            res.status(500).json({ message: 'Nao foi possivel buscar o produto' });

        }

    },


    async getProductsAndSuppliers(req, res) {

        try {
            const products = await Product.findAll({ include: [Category, Supplier] })

            const productFormat = products.map((product) => ({
                name: product.name,
                price: product.price,
                quantity: product.quantity,
                category: product.categories.map(category => ({ name: category.name })),
                supplier: product.suppliers.map(supplier => ({ company: supplier.company }))
            }));

            res.status(200).json(productFormat);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Nao foi possivel buscar o produto' });

        }
    }
}





