const express = require('express');
const db = require('./utils/database');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.use(require('./routes/api'));

const PORT = process.env.PORT || 5000;
db.then(() => {
    console.log("MongoDB Connected...");
    app.listen(PORT, () => console.log(`server running on: ${PORT}`))
}).catch((err) => {
    console.log(err)
});
