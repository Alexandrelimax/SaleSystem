const Address = require("../models/AddressModel")
const Client = require("../models/ClienteModel");
const Telephone = require("../models/TelephoneModel");


module.exports = {

    async showAllClients(req, res) {

        try {
            const clients = await Client.findAll();
            res.status(200).json(clients);
        } catch (error) {
            res.status(500).json('Nao foi possivel encontrar');
        }
    },


    async getClient(req, res) {
        const { id } = req.params

        try {
            const user = await Client.findByPk(id, { include: { model: Address } });

            res.json(user)
        } catch (error) {
            res.json({ message: error })
        }
    },
    async getClientAddress(req, res) {
        const { id } = req.params;

        try {

            const address = await Address.findAll({ where: { client_id: id } });

            res.status(200).json(address);
        } catch (error) {
            res.status(500).json('Nao foi possivel encontrar')
        }
    },


    async saveClientAddress(req, res) {
        const client_id = req.params.id

        const { street, number, complement, neighborhood, zip_code, city, state } = req.body;


        try {
            await Address.create({
                street, number, complement, neighborhood, zip_code, city, state, client_id,
            })

            return res.status(201).json({ message: 'Endereco Salvo' })


        } catch (error) {
            res.status(500).json({ message: 'Não foi possivel salvar' })
        }

    },
    async getClientTelephone(req, res) {
        const { id } = req.params;

        try {
            const numberPhones = await Telephone.findAll({ where: { client_id: id } });
            res.status(200).json(numberPhones)
        } catch (error) {
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
                return res.status(404).json({ error: 'Nenhum telefone encontrado para este client' });
            }

            const phone = client.telephones[index];
            res.json(phone);


        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro no servidor' });
        }


    },
    async setOnlyOneTelephone(req, res) {
        try {
            const { id, telefone } = req.params;

            const {number} = req.body;

            const index = Number(telefone) - 1;

            const client = await Client.findByPk(id, {
                include: [{
                    model: Telephone, as: 'telephones',
                    attributes: ['number']
                }],

            });

            if (!client) {
                return res.status(404).json({ error: 'Cliente não encontrado' });
            }

            if (client.telephones.length === 0) {
                return res.status(404).json({ error: 'Nenhum telefone encontrado para este client' });
            }

            let phone = client.telephones[index];

            phone = number;



            res.json(phone);


        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro no servidor' });
        }


    },

}
// async saveSupplierPhone(req, res) {
//     const { id } = req.params;

//     const numberPhone = {
//         number: req.body.number,
//         supplier_id: id
//     }

//     try {
//         await Telephone.create(numberPhone);
//         res.status(201).json({ message: 'telefone salvo' });
//     } catch (error) {
//         res.status(500).json({ message: error });
//     }