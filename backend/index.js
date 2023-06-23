const connectToDatabase = require('./db')
const express = require('express')
var cors = require('cors')

connectToDatabase();

const app = express()
const port = 5000

app.use(express.json());
app.use(cors())

app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/notes', require('./routes/notes.js'));
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
