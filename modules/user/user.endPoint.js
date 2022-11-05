const { roles } = require("../../middleware/auth")

const endPoint = {
    access :[roles.Admin , roles.User]
}

module.exports  = endPoint