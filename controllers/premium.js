const User = require('../models/user');

exports.leaderboard = async (req, res) => {
    try {
        const data = await User.findAll({
            attributes: ['username', 'totalexpence'],


        })

        res.status(200).json(data)
    } catch (err) {
        console.log(err)
    }
}
