const { userModel } = require("../../../BD/model/User");
const jwt = require("jsonwebtoken");

const reSendEmail = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await userModel.findById(id).select("confirmEmail email")

        if (!user) {
            res.status(404).json({ message: "In-valid Account" })
        } else {
            if (user.confirmEmail) {
                res.status(400).json({ message: "Already confirmed" })
            } else {
                const token = jwt.sign({ id: user._id }, process.env.emailToken, { expiresIn: 5 * 60 })
                const link = `${req.protocol}://${req.headers.host}/api/v1/auth/confirmEmail/${token}`
                const link2 = `${req.protocol}://${req.headers.host}/api/v1/auth/reSendEmail/${user._id}`
                const message = `<a href='${link}'> plz follow me to confirm u account</a> 
                <br> <br>
                <a href='${link2}'>re-send confirmation Email</a>`
                
                sendEmail(user.email, message)
                res.status(200).json({ message: "New link has been sent. Please check your email" });
                console.log("confirmation Email >>> Re-sent");

            }
        }
    } catch (error) {
        res.status(500).json({ message: "catch error in reSendEmail" })

    }
}
module.exports = reSendEmail