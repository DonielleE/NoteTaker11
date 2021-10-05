const express = require('express');
const apiRoutes = require('./routes/apiRoutes')
const htmlRoutes = require('./routes/htmlRoutes')

const app = express();
const PORT = process.env.port || 3001;



// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))
app.use('/api', apiRoutes)

app.use('/', htmlRoutes)

app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});