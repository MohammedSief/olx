const { userModel } = require("../../../BD/model/User");


const profile = async (req, res) => {
    try {
        console.log({ userAuthData: req.user });
        const user = await userModel.findById(req.user._id);
        res.json({ message: "Welcome to your profile", user })

    } catch (error) {
        res.json({ message: "catch error in (profile page)", error })
        console.log("catch error in (profile page)");
    }
}

/*
const profilePic = async (req, res) => {
    try {
        if (req.fileErr) {
            res.status(400).json({ message: "In-valid picture format" })
        } else {
            const imageURL = `${req.finalDestination}/${req.file.filename}`
            const user = await userModel.findByIdAndUpdate(req.user._id,
                { profilePic: imageURL },
                { new: true })
            res.status(200).json({ message: "Image has been uploaded" })
        }
    } catch (error) {
        res.status(500).json({ message: "catch error in (profilePic)", error })
    }
}
*/

module.exports = { profile /*, profilePic*/ }