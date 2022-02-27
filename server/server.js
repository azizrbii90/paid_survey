const app = require('./app')
let env = JSON.parse(JSON.stringify(require('./.env.json')));

const PORT = process.env.PORT || env.PORT;
const connectDB = require('./config/db')

connectDB();

app.listen(PORT, console.log(`server running on ${PORT}`))