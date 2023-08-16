const Address = require("../models/AddressModel");
const Product = require("../models/ProductsModel");
const Supplier = require("../models/SupplierModel");
const Telephone = require("../models/TelephoneModel");
const validation = require('../utils/validation');

module.exports = {
    async showSuppliers(req, res) {

        try {
            const suppliers = await Supplier.findAll();
            res.status(200).json(suppliers)
        } catch (error) {
            console.log(error);
            res.status(500).json({ erro: error })
        }
    },


    async saveSupplier(req, res) {
        const collectionErrors = [];
        const { company, cnpj, business_name } = req.body;


        if (cnpj.length > 14) {
            collectionErrors.push('CNPJ inválido');
        }

        if (collectionErrors > 0) {
            return res.status(400).json({ message: collectionErrors });
        }

        try {
            const supplier = { company, cnpj, business_name };

            await Supplier.create(supplier);
            res.status(201).json({ message: 'O fornecedor foi salvo com sucesso!' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Não foi possivel salvar, tente mais tarde!' });
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
            res.status(500).json({ message: 'Não foi possivel efetuar a busca, tente mais tarde' });
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
            return res.status(500).json({ message: 'Não foi possivel efetuar a busca, tente mais tarde' })
        }
    },


    async getAllSupplierPhones(req, res) {
        const { id } = req.params;

        try {
            const supPhone = await Supplier.findByPk(id, {
                include: { model: Telephone }
            });

            res.status(200).json(supPhone);
        } catch (error) {
            console.log(error);
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
            console.log(error);
            res.status(500).json({ message: error });
        }
    },


    async getOnlyOneSupplierPhone(req, res) { //MÉTODO COM PROBLEMA PARA FILTRAR
        const { id, telphone_id } = req.params;

        const index = Number(telphone_id) - 1;
        try {
            const findPhone = await Supplier.findByPk(id, {
                include: [{ model: Telephone, as: 'telephones' }]
            });

            if (!findPhone) {
                return res.status(404).json('O usuário deste telefone não existe');
            }
            if (findPhone.telphone.length === 0) {
                return res.status(404).json('Este cliente não possui telefone cadastrado!');
            }

            const choosePhone = findPhone.telphone[index];

            res.json(choosePhone);

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Não foi possivel efetuar a busca, tente mais tarde' });
        }

    },


    async setOnlyOneSupplierPhone(req, res) {
        const { id, telphone_id } = req.params;

        const { number } = req.body
        try {

            let phone = await Telephone.findByPk(telphone_id);

            phone.number = number;
            await phone.save();

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Não foi possivel efetuar a busca, tente mais tarde' });

        }
    },


    async deleteOnlyOneSupplierPhone(req, res) {
        const { telphone_id } = req.params;

        try {
            await Telephone.destroy({ where: { telphone_id } });

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Não foi possivel efetuar a busca, tente mais tarde' });

        }
    },


    async getAllSupplierAddress(req, res) {
        const { id } = req.params;


        try {
            const address = await Supplier.findByPk(id, {
                include: {
                    model: Address
                }
            })

            res.status(200).json(address);
        } catch (error) {
            res.status(500).json({ message: 'Não foi possivel efetuar a busca, tente mais tarde' });
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
            res.status(500).json({ message: 'Não foi possivel efetuar a busca, tente mais tarde' });
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
            res.status(500).json({ message: 'Não foi possivel efetuar a busca, tente mais tarde' });
        }
    },


    async deleteSupplierAddress(req, res) {
        const { id } = req.params;

        try {

            await Address.destroy({ where: { client_id: id } });
            res.status(201).json({ message: 'Endereço removido' });

        } catch (error) {
            res.status(500).json({ message: 'Não foi possivel efetuar a busca, tente mais tarde' });
        }
    },
}