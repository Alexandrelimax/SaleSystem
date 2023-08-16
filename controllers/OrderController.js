const Address = require("../models/AddressModel");
const Payment = require("../models/Payment");
const Order = require("../models/OrderModel");
const Product = require("../models/ProductsModel");


module.exports = {

    async getPedido(req, res) {
        const { id } = req.params;

        try {

            const order = await Order.findByPk(id, {
                include: [Address, Product, Payment]
            });

            res.status(200).json(order);

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Não foi possivel salvar' });

        }
    },


    async createPedido(req, res) {

        const { product_id, client_id } = req.params;

        const { payment_type, newDeliveryAddress, quantity } = req.body;

        try {
            const payment = await Payment.create({
                payment_type,
                payment_state: 'PENDENTE',
            })


            let deliveryAddress;
            if (newDeliveryAddress) {

                deliveryAddress = await Address.create({
                    street: req.body.street,
                    number: req.body.number,
                    complement: req.body.complement,
                    neighborhood: req.body.neighborhood,
                    zip_code: req.body.zip_code,
                    city: req.body.city,
                    state: req.body.state,
                    client_id: client_id
                });

            } else {
                deliveryAddress = await Address.findOne({ where: { client_id } });
            }

            const order = await Order.create({
                client_id,
                address_id: deliveryAddress.id,
                payment_id: payment.id
            })

            const product = await Product.findByPk(product_id);

            await order.addProduct(product, { through: { quantity } })

            res.status(200).json({ message: 'Pedido salvo com sucesso' })

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Não foi possivel salvar' });

        }
    }
}