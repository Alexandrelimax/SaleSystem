const Address = require("../models/AddressModel")
const Client = require("../models/ClienteModel");
const Telephone = require("../models/TelephoneModel");


module.exports = {

    async showAllClients(req, res) {

        try {
            const clients = await Client.findAll();
            res.status(200).json(clients);

        } catch (error) {
            console.log(error);
            res.status(500).json('Nao foi possivel encontrar');
        }
    },


    async getClient(req, res) {
        const { id } = req.params

        try {
            const user = await Client.findByPk(id, { include: { model: Address } });
            res.json(user)

        } catch (error) {
            console.log(error);
            res.json({ message: 'Nao foi possivel encontrar' })
        }
    },


    async getClientAddress(req, res) {
        const { id } = req.params;

        try {

            const address = await Address.findAll({ where: { client_id: id } });
            res.status(200).json(address);

        } catch (error) {
            console.log(error);
            res.status(500).json('Nao foi possivel encontrar')
        }
    },


    async saveClientAddress(req, res) {
        const client_id = req.params.id

        const { street, number, complement, neighborhood, zip_code, city, state } = req.body;

        try {
            await Address.create({
                street, number, complement, neighborhood, zip_code, city, state, client_id,
            });

            res.status(201).json({ message: 'Endereco Salvo' });

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Não foi possivel salvar' });
        }
    },


    async getOnlyOneAddress(req, res) {
        const { id, chooseAddress } = req.params;

        try {
            const clientAddress = await Client.findByPk(id, {
                include: [{ model: Address, as: 'addresses' }]
            });

            if (!clientAddress) {
                return res.status(404).json({ message: 'Este usuário não existe' });
            }
            if (clientAddress.addresses.length === 0) {
                return res.status(404).json({ message: 'Este usuário não possui endereços vinculados' });
            }
            const index = Number(chooseAddress) - 1;

            const address = clientAddress.addresses[index];

            res.status(200).json(address)

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Erro ao buscar o endereço, tente mais tarde!' });

        }
    },


    async setOnlyOneAddress(req, res) {
        const { address_id } = req.params;

        const { street, number, complement, neighborhood, zip_code, city, state } = req.body;

        try {
            const address = { street, number, complement, neighborhood, zip_code, city, state };

            await Address.update(address, { where: { id: address_id } });

            res.status(204).json({ message: 'O endereço foi atualizado com sucesso' });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Erro ao buscar o endereço, tente mais tarde!' });

        }
    },


    async getClientTelephone(req, res) {
        const { id } = req.params;

        try {
            const numberPhones = await Telephone.findAll({ where: { client_id: id } });
            res.status(200).json(numberPhones)
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Não foi possivel encontrar' })
        }
    },


    async saveClientTelephone(req, res) {
        const { id } = req.params;

        const numberPhone = {
            number: req.body.number,
            client_id: id
        }
        try {
            await Telephone.create(numberPhone);
            res.status(201).json({ message: 'telefone salvo' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Não foi possivel salvar' });
        }
    },


    async getOnlyOneTelephone(req, res) {
        try {
            const { id, telefone } = req.params;

            const index = Number(telefone) - 1;

            const client = await Client.findByPk(id, {
                include: [{
                    model: Telephone, as: 'telephones',

                }],

            });

            if (!client) {
                return res.status(404).json({ error: 'Cliente não encontrado' });
            }

            if (client.telephones.length === 0) {
                return res.status(404).json({ error: 'Nenhum telefone encontrado para este cliente' });
            }

            const phone = client.telephones[index];
            res.json(phone);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Não foi possivel encontrar' });
        }
    },


    async setOnlyOneTelephone(req, res) {

        const { telefone_id } = req.params;
        const { number } = req.body;

        try {
            let telephone = await Telephone.findByPk(telefone_id);

            if (!telephone) {
                return res.status(404).json({ error: 'Cliente não encontrado' });
            }

            telephone.number = number;
            await telephone.save();

            res.status(204).json({ message: 'O telefone foi atualizado com sucesso' });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Não foi possivel atualizar' });
        }
    },

}