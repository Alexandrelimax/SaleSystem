const { where } = require('sequelize');
const Product = require('../models/ProductsModel');

module.exports = {
    async showProducts(req, res) {

        const products = await Product.findAll();

        res.json(products);
    },
    async showThatProduct(req, res) {
        const { id } = req.params;

        const product = await Product.findByPk(id);

        res.json(product);
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
            res.status(400).json('Erro:' + error)
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
            res.status(400).json('Erro:' + error)
        }

    },
    async saveProduct(req, res) {
        const { nome, preco, quantidade } = req.body;

        const product = { nome, preco, quantidade };

        try {
            await Product.create(product);
            res.status(201).json('Produto salvo!');

        } catch (error) {
            res.status(400).json('Erro:' + error);
        }
    },
    async removeAllProduct(req,res){
        const {id} = req.params;
        try {
            await Product.destroy({where:{id}});
            res.status(200).json('Produto removido!');
            
        } catch (error) {
            res.status(400).json('Erro:' + error);
        }

    }
}





