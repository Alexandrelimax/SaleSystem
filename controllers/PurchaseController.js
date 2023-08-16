const sequelize = require("../database/connection")
const Product = require("../models/ProductsModel");
const PurchaseProduct = require("../models/PurchaseProductModel");
const Supplier = require("../models/SupplierModel");
const Telephone = require("../models/TelephoneModel");
const validation = require("../utils/validation");
module.exports =  {

     async warningStock(req, res) {

        const lowStock = await Product.findAll({
            attributes: {
                include: [
                    sequelize.literal(`(SELECT * FROM products WHERE quantidade < 20)`)]
            }
        })
        if (!lowStock) {
            return res.status(200).json({ message: `Não há necessidade de reposição!` });
        } else {
            return res.status(200).json({ message: lowStock });
        }
    },

     async resetProducts(req, res) {
        const { id } = req.params

        const productBySuplier = await Product.findByPk(id, {
            include: [{
                model: PurchaseProduct,
                include: [{
                    model: Supplier,
                    attributes: ['empresa'],
                    include: [{
                        model: Telephone,
                        attributes: ['number'],
                    }]
                }]
            }]
        });

        res.status(200).json({message:productBySuplier});
    },

    async saveNewProduct(req, res) {
        const { name, price, quantity, company, cnpj, business_name} = req.body;
        try {

            const findProduct = await Product.findAll({ where: { name } })

            if(findProduct){
                return res.status(400).json({ message: 'Este produto já existe em estoque, para repor acesse a rota de fornecedores' })
            }

            const product = { nome, price, quantity };
            const newProduct = await Product.create(product);

            if (cnpj.length > 14) {
                return res.status(400).json({ message: 'CNPJ inválido' })
            }
            let supplier = await Supplier.findOne({ where: { cnpj } })


            if (!supplier) {
                const newSupplier = { company, cnpj, business_name };
                supplier = await Supplier.create(newSupplier);
            }

            const date_purchase = new Date();

            const purchase_product = {
                product_id: newProduct.id,
                supplier_id: supplier.id,
                date_purchase,
                quantity,
            }


            await PurchaseProduct.create(purchase_product)
            res.status(201).json({ message: 'Produto Salvo' })


        } catch (error) {
            res.status(400).json('Erro:' + error);
        }
    },

    async repurchaseProduct(req, res) {
        const collectionErrors = [];
        const { product_id, supplier_id } = req.params;
        const { quantity} = req.body;

        isEmpty(req.body, collectionErrors);

        const date = new Date();

        if (collectionErrors > 0) {
            return res.status(400).json({ message: collectionErrors });
        }

        try {
            await PurchaseProduct.create({ product_id, supplier_id, date: date, quantity });

            const product = await Product.findByPk({ id: product_id });
            product.quantity += quantity;

            await product.save();

            res.status(201).json(`O produto ${product.name} foi comprado e agora contem ${product.quantity} em estoque`);

        } catch (error) {
            res.status(500).json('Erro:' + error);

        }

    },
    // async buyProducts(req,res){

    //     const {product_id} = req.params;

    //     const 
    // },




}







