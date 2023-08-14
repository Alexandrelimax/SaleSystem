const Address = require("../models/AddressModel");
const SaleProduct = require("../models/SaleProduct");

module.exports = {
    salesArea(req, res) {
        res.render('home')
    },
    showRegisterAddress(req, res) {
        res.render('home')

    },
    async deliveryAdress(req, res) {
        const { client_id } = req.session;
        const { street, number, complement, neighborhood, zip_code, city, state } = req.body;

        const address = { street, number, complement, neighborhood, zip_code, client_id, city, state }


        try {
            const addressDelivery = await Address.create(address)
            const address_id = addressDelivery.id;

            res.json(address_id);
        } catch (error) {
            res.json('erro:' + error)
        }


    },
    async makePayment(req, res) {
        const { client_id } = req.session;
        const { payment_id, newDeliveryAddress } = req.body;
        const orderDate = new Date();

        let addressDelivery;
        if (newDeliveryAddress) {
            const newAddress = { street, number, complement, zip_code, city, state } = req.body;

            addressDelivery = await Address.create(newAddress);

        } else {
            addressDelivery = await Address.findOne({ where: { client_id } });
        }

        const address_id = addressDelivery.id;

        const sale = { orderDate, client_id, address_id, payment_id };

        const saleCreated = await SaleProduct.create(sale);

        res.status(200).json(saleCreated);

    },

}
