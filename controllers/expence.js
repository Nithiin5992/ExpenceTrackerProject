const Expence = require('../models/expence');
const sequelize = require('../util/database');
const User = require('../models/user');

exports.postdailyexpence = async (req, res, next) => {
    try {
        const t = await sequelize.transaction();
        const expenceamount = req.body.expenceamount;
        const description = req.body.description;
        const category = req.body.category;
        const userid = req.userid;
        const totalexpence = parseInt(req.body.expenceamount) + parseInt(req.user.totalexpence);
        const data = await Expence.create({
            expenceamount: expenceamount,
            description: description,
            category: category,
            userId: userid
        }, { transaction: t })
        await req.user.update({
            totalexpence: totalexpence
        }, { transaction: t })

        await t.commit();
        res.status(200).json({ dailyexpence: data, message: 'added daily expence' })
    }
    catch (err) {
        console.log(err)
    }
}
exports.getdailyexpence = async (req, res, next) => {

    const expences = await Expence.findAll({ where: { userId: req.userid } })
    res.status(201).json({ dailyexpence: expences })

}



exports.deletedailyexpence = async (req, res, next) => {
    const id = req.params.id;
    const data = await Expence.findOne({ where: { id: id } })
    await Expence.destroy({ where: { id: id } })
    const user = await User.findOne({ where: { id: data.userId } })
    const totalexpence = parseInt(user.totalexpence) - parseInt(data.expenceamount);
    await user.update({ totalexpence: totalexpence })
}