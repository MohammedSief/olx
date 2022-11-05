const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const { userModel } = require("../../../BD/model/User");

const signin = async (req, res) => {

    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
        res.status(404).json({ message: "in-valid account email" })
    } else {
        if (!user.confirmEmail) {
            res.json({ message: "Please, confirm your email firstly" })
        } else {
            const match = await bcrypt.compare(password, user.password)
            if (!match) {
                res.status(400).json({ message: "Password mismatch" })
            } else {
                const token = jwt.sign({ id: user._id, isLoggedIn: true },
                    process.env.loginToken, { expiresIn: '24h' })
                res.status(200).json({ message: `logged-in successfully ... Welcome ${user.firstName +" "+ user.lastName}`, token })
                console.log("Sign-in >> Done");
            }
        }
    }
}

module.exports = signin