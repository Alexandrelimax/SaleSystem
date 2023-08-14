const Address = require("../models/AddressModel");
const Product = require("../models/ProductsModel");
const Supplier = require("../models/SupplierModel");
const Telephone = require("../models/TelephoneModel");
const validation = require('../utils/validation');

module.exports = {
    async showSuppliers(req, res) {

        try {
            const suppliers = await Supplier.findAll();
            res.status(200).json({ message: suppliers })
        } catch (error) {
            res.status(500).json({ erro: error })
        }
    },
    async saveSupplier(req, res) {
        const collectionErrors = [];
        // validation.isEmpty(req.body, collectionErrors);
        const { company, cnpj, business_name } = req.body;


        if (cnpj.length > 14) {
            collectionErrors.push('CNPJ inválido');
        }

        if (collectionErrors > 0) {
            return res.status(400).json({ message: collectionErrors });
        }

        const supplier = { company, cnpj, business_name };

        try {
            await Supplier.create(supplier);
            res.status(201).json({ message: 'O fornecedor foi salvo com sucesso!' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Não foi possivel salva, tente mais tarde!' });
        }

    },
    async getSupplier(req, res) {

        const { id } = req.params;

        if (id <= 0) {
            return res.status(400).json('Usuário inválido')
        }
        try {
            const supplier = await Supplier.findByPk(id);
            res.status(200).json(supplier);

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Não foi possivel encontrar o usuário' });
        }
    },
    async setSupplier(req, res) {
        const { id } = req.params;

        const collectionErrors = [];
        validation.isEmpty(req.body, collectionErrors);
        const { company, cnpj, business_name } = req.body;


        if (cnpj.length > 14) {
            collectionErrors.push('CNPJ inválido');
        }

        if (collectionErrors > 0) {
            return res.status(400).json({ message: collectionErrors });
        }

        const supplier = { company, cnpj, business_name };

        try {
            await Supplier.update(supplier, { where: { id } });
            res.status(201).json({ message: 'O fornecedor foi atualizado com sucesso!' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Erro ao atualizar' });
        }

    },
    async deleteSupplier(req, res) {
        const { id } = req.params;
        if (id <= 0) {
            return res.status(400).json('Usuário inválido')
        }
        try {
            await Supplier.destroy({ where: { id } });
            res.status(200).json('Fornecedor removido com sucesso!')
        } catch (error) {
            return res.status(500).json('Não foi possivel remover')
        }
    },
    async getSupplierPhones(req, res) {
        const { id } = req.params;

        try {
            const supPhone = await Supplier.findByPk(id, {
                include: {
                    model: Telephone,
                    attributes: ['number'],
                }
            });
            res.status(200).json(supPhone);
        } catch (error) {
            return res.status(500).json('Não foi possivel encontrar')
        }
    },
    async saveSupplierPhone(req, res) {
        const { id } = req.params;

        const numberPhone = {
            number: req.body.number,
            supplier_id: id
        }

        try {
            await Telephone.create(numberPhone);
            res.status(201).json({ message: 'telefone salvo' });
        } catch (error) {
            res.status(500).json({ message: error });
        }



    },
    async getOnlyOneSupplierPhone(req, res) { //MÉTODO COM PROBLEMA PARA FILTRAR
        const { id, telphone_id } = req.params;

        const index = Number(telphone_id)
        try {
            const phone = await Telephone.find({ where: { supplier_id: id }, attributes: ['number'] });

            const format = phone.map(data => data.dataValues);

            console.log(format);
            res.json(phone);
        } catch (error) {
            res.status(500).json({ message: error });
        }

    },
    async setOnlyOneSupplierPhone(req, res) {
        const { id, telphone_id } = req.params;

        const { number } = req.body

        const phone = await Telephone.findAll({ where: { supplier_id: id }, attributes: ['number'] });


    },
    async deleteOnlyOneSupplierPhone(req, res) {

    },
    async getSupplierAddress(req, res) {
        const { id } = req.params;


        try {
            const address = await Supplier.findByPk(id, {
                include: {
                    model: Address
                }
            })

            res.status(200).json(address);
        } catch (error) {
            res.status(500).json({ message: error });
        }


    },
    async saveSupplierAddress(req, res) {

        const { id } = req.params;

        const { street, number, complement, neighborhood, zip_code, city, state } = req.body;

        const address = { street, number, complement, neighborhood, zip_code, city, state, supplier_id: id };

        try {
            await Address.create(address);
            res.status(201).json({ message: 'Endereço Salvo' });
        } catch (error) {
            res.status(500).json({ message: error });
        }

    },
    async setSupplierAddress(req, res) {
        const { id } = req.params;

        const { street, number, complement, neighborhood, zip_code, city, state } = req.body;

        const address = { street, number, complement, neighborhood, zip_code, city, state, supplier_id: id };

        try {
            await Address.update(address, { where: { client_id: id } });
            res.status(201).json({ message: 'Endereço Salvo' });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    },
    async deleteSupplierAddress(req, res) {
        const { id } = req.params;

        try {

            await Address.destroy({ where: { client_id: id } });
            res.status(201).json({ message: 'Endereço removido' });

        } catch (error) {
            res.status(500).json({ message: error });
        }


    },


    async saveNewProduct(req, res) {
        const { name, price, quantity, company, cnpj, business_name } = req.body;
        try {

            const findProduct = await Product.findAll({ where: { name } })

            if (findProduct) {
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
        const { quantity } = req.body;

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

}