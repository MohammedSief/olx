const jwt = require("jsonwebtoken");
const { userModel } = require("../BD/model/User");

const roles = {
    Admin: "Admin",
    User: 'User'
}

const auth = (accessRole) => {

    return async (req, res, next) => {
        try {

            const headerToken = req.headers['authorization'];

            /* we could use this way */

            /* if (!headerToken || headerToken == null || headerToken == undefined ||
                  !headerToken.startsWith(`Bearer `)) {
                  res.status(400).json({ message: "In-valid header token (auth)" })
            */

            /* or we use this way & make a validation in the user module*/

            if (!headerToken.startsWith(`Bearer `)) {
                res.status(400).json({ message: "In-valid header token (auth)" })

            } else {
                console.log({ headerToken });
                const token = headerToken.split(" ")[1];
                console.log({ token });

                const decoded = jwt.verify(token, process.env.loginToken);
                console.log(decoded);


                if (!decoded || !decoded.isLoggedIn) {
                    res.status(400).json({ message: "In-valid token (auth)" })
                } else {

                    const findUser = await userModel.findOne({ _id: decoded.id }).select('firstName lastName email role')
                    console.log(findUser);

                    if (!findUser) {
                        res.status(404).json({ message: "In-valid account ID" })

                    } else {

                        if (!accessRole.includes(findUser.role)) {
                            res.status(401).json({ message: "Sorry, It is not an authentic account" })

                        } else {
                            req.user = findUser
                            next()
                        }

                    }
                }
            }
        } catch (error) {
            res.status(500).json({ message: "catch error in (auth)", error })

        }

    }
}


module.exports = {
    auth,
    roles
}