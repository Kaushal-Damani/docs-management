const app = require('./app')

const dotenv = require('dotenv')

dotenv.config()
const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`server is running....`)
})