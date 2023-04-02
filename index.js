const Express = require("express");
const BodyParser = require("body-parser");
const Cors = require('cors')
require('dotenv').config()

const App = Express();
const Port =  process.env.PORT || 3001;

App.use(Cors({ origin: '*', exposedHeaders: ['auth-token', 'refresh-token']}))
App.use(BodyParser.json({ limit: "1gb", extended: true }));
App.use(BodyParser.urlencoded({ limit: "1gb", extended: false }));
App.use("/api", require("./routes/index"));

App.listen(Port, () => console.log(`Example App listening on port ${Port}!`));
