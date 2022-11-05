const { userModel } = require("../../../BD/model/User");
const jwt = require("jsonwebtoken");

const confirmEmail = async (req, res) => {
    try {
        console.log(req.params);
        const { token } = req.params
        
        const decoded = jwt.verify(token, process.env.emailToken)
        console.log(decoded);

        if (!decoded) {
            res.json({ message: "In-valid Token (confirmEmail)" })
        } else {
            console.log(decoded);
            const user = await userModel.findById(decoded.id).select('confirmEmail')
            if (!user) {
                res.json({ message: "In-valid token ID (confirmEmail)" })
            } else {
                console.log(user);
                if (user.confirmEmail) {
                    res.status(400).json({
                        message:
                            "Your email is already confirmed .. Go to log-in page"
                    })
                } else {
                    await userModel.findOneAndUpdate({ _id: user._id },
                        { confirmEmail: true }, { new: true })
                    res.status(200).json({ message: "Done ... please log-in " })
                    console.log(user);
                }
            }
        }
    } catch (error) {
        res.status(500).json({ message: "catch error in confirmEmail", error })
    }

}

module.exports = confirmEmail