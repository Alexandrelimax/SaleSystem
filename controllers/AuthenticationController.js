const Client = require("../models/ClienteModel");
const Login = require("../models/LoginModel");
const { isEmpty, validName , validCPF} = require("../utils/validation");
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');

module.exports = {


    async register(req, res) {
        const errorsCollection = [];
        const { first_name, last_name, cpf, email, user_name, password, confirm_password } = req.body;

        isEmpty(req.body, errorsCollection);
        validName(req.body, errorsCollection);
        validCPF(cpf, errorsCollection);        


        try {
            const clientExist = await Client.findAll({
                where: {
                    [Op.or]: [{ cpf }, { email }]
                }
            });
            if (clientExist.length > 0) {
                errorsCollection.push('Este usuário já existe');
            };

            const loginExist = await Login.findAll({ where: { user_name } });

            if (loginExist.length > 0) {
                errorsCollection.push('Este login já existe');
            };

            if (password !== confirm_password) {
                errorsCollection.push('A senha e a confirmação de senha são diferentes');
            }
            if (errorsCollection.length > 0) {
                return res.status(400).json({ errors: errorsCollection });

            }
            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(password, salt);


            const client = await Client.create({ first_name, last_name, cpf, email });

            await Login.create({ user_name, password: hashPassword, client_id: client.id });

            return res.status(201).json({ message: 'Usuário registrado!' });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Erro ao salvar o usuário, tente mais tarde!' });
        }
    },


    async enterSystem(req, res) {
        const errorsCollection = [];

        const { user_name, password } = req.body;

        try {
            const client = await Login.findOne({ where: { user_name } });

            if (!client) {
                errorsCollection.push('Este usuario não existe!');
            }

            const passwordCheck = bcrypt.compareSync(password, client.password)
            if (!passwordCheck) {
                errorsCollection.push('Senha incorreta!');
            }

            if (errorsCollection > 0) {
                return res.status(401).json({ message: errorsCollection });
            }

            res.status(200).json({ message: 'Autenticação feita com sucesso' });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Erro ao entrar no sistema, tente mais tarde!' });
        }
    },
}