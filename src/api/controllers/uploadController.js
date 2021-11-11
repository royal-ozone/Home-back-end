


const uploadHandler = async (req, res) =>{
    try {
        let result = req.files
        res.status(200).send(result)
    } catch (error) {
        res.send(error.message)
    }
}

module.exports = {uploadHandler}