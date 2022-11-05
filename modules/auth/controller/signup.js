const { userModel } = require("../../../BD/model/User");
const sendEmail = require("../../../services/sendEmail");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {

    try {
        const { firstName, lastName, email, password } = req.body;

        // (1)- check email -> NO Need because I have unique email
        // (2)- check password & cPassword -> NO Need because I have joi validator
        // (3)- save to DB
        // (4)- we have to hash (using bcrypt) the password before saving (using hooks)

        const newUser = new userModel({ firstName, lastName, email, password });
        const savedUser = await newUser.save()

        //sending a confirmation & refresh link
        const token = jwt.sign({ id: savedUser._id }, process.env.emailToken, { expiresIn: 5 * 60 })
        const link = `${req.protocol}://${req.headers.host}/api/v1/auth/confirmEmail/${token}`
        const link2 = `${req.protocol}://${req.headers.host}/api/v1/auth/reSendEmail/${savedUser._id}`
        const message = `<a href='${link}'> Please press this link to confirm your account</a> 
        <br> <br>
        <a href='${link2}'>re-send confirmation email</a>
        `

        //confirmation email
        sendEmail(res, savedUser.email, message);

        res.json({ message: 'Welcome New User', savedUser })
        console.log("Signup >>> Done");

    }
    catch (error) {

        if (error.keyValue?.email) { 
            res.json({ message: 'Email is already exist ... Please sign in' })
            console.log("Signup >>> Done");
        } else {
            res.json({ message: 'Error', error })
        }
    }


}



module.exports = signup