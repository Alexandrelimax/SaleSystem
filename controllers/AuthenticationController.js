const Client = require("../models/ClienteModel");
const Login = require("../models/LoginModel");
const { isEmpty, validName } = require("../utils/validation");
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');

module.exports = {
    showRegister(req, res) {
        res.render('register');
    },

    async register(req, res) {
        const errorsCollection = [];
        const { first_name, last_name, cpf, email, user_name, password, confirme_password } = req.body;

        isEmpty(req.body, errorsCollection);
        validName(req.body, errorsCollection);
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

        if (password !== confirme_password) {
            errorsCollection.push('A senha e a confirmação de senha são diferentes');
        }
        if (errorsCollection.length > 0) {
            return res.status(400).json({ errors: errorsCollection });

        }
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);


        const client = { first_name, last_name, cpf, email }


        const clientCreated = await Client.create(client);
        const client_id = clientCreated.id;

        const login = { user_name, password: hashPassword, client_id };

        await Login.create(login);

        return res.status(201).json({ message: 'Usuário registrado!' });

    },
    showLogin(req, res) {
        res.render('login');
    },
    async enterSystem(req, res) {
        const errorsCollection = [];

        const { user_name, password } = req.body;

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


    },

}