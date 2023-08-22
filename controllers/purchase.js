const Razorpay = require("razorpay");
const Order = require("../models/order")
exports.purchasepremium = async (req, res, next) => {
    try {
        var rzp = new Razorpay({
            key_id: 'rzp_test_qzEZmlvTk3Qwpc',
            key_secret: 'SCgdTb1LgTy6UwFc1fZV1OuK'
        })
        const amount = 2500;
        rzp.orders.create({ amount, currency: "INR" }, (err, order) => {
            if (err) {
                console.log(err);
            }

            Order.create({
                orderid: order.id,
                status: 'pending',
                userId: req.userid
            }).then(() => {
                return res.status(201).json({ order, key_id: rzp.key_id })
            }).catch((err) => console.log(err))
        })
    }

    catch (err) {
        console.log(err)
    }
}
exports.updateTransactionStatus = async (req, res) => {
    try {

        const { payment_id, order_id } = req.body;
        Order.findOne({ where: { orderid: order_id } }).then(order => {

            order.update({ paymentid: payment_id, status: 'successful' })
                .then(() => {
                    req.user.update({ premiumUser: true })
                        .then(() => {
                            return res.status(202).json({ success: 'true', message: 'succeccful' })
                        }).catch(err => console.log(err))
                }).catch(err => console.log(err))
        }).catch(err => console.log(err))
    }
    catch (err) {
        console.log(err)
    }
}