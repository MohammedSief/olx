const dataMethod = ['body', 'params', 'query', 'file', 'headers'];

const validation = (schema) => {

    return (req, res, next) => {

        try {
            const validationArray = []
            dataMethod.forEach(key => {
                if (schema[key]) {
                    const validationResult = schema[key].validate(req[key],
                        { abortEarly: false })
                    if (validationResult.error) {
                        validationArray.push(validationResult.error.details)
                    }
                }
            })

            if (validationArray.length) {
                res.status(400).json({ message: "validation error", validationArray })
            } else {
                console.log("Validation >>> Done");
                next()
            }
        } catch (error) {
            res.status(500).json({ message: "catch error", error })
        }

    }
}


module.exports = validation