let express = require('express');
let bp = require('body-parser');
let port = 8000;

let app = express();
app.use(bp.json());

app.use(express.static(__dirname + "/public/dist"));

require('./server/config/mongoose');
require ('./server/config/routes')(app);

app.listen(port, () => { console.log(`Listening on port: ${port}...`)})