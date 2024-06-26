const errorHandler = (err, req, res, next) => {
    console.log(err)
    if (err.name === "MissingFile") {
        res.status(400).json({ message: "Missing File/Data" })
    } else if (err.name === "ErrorNotFound") {
        res.status(404).json({ message: "Error Not Found", message: err.message })
    } else {
        res.status(500).json({ message: "Internal Server Error" })
    }
}

module.exports = errorHandler