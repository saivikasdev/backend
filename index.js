const express = require("express");
const app = express();
const mongoose = require("mongoose");
const {MONGO_DB_CONFIG} = require("./config/app.config");
const errors = require("./middleware/errors");
const cors = require("cors");
mongoose.Promise = global.Promise;
mongoose.connect(
    MONGO_DB_CONFIG.DB,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
).then(
    ()=>
    {
        console.log("Database connected");
    },
    (error) =>
    {
        console.log("Database cant connected   " + error);
    }
);

app.use(express.json());
app.use('/uploads',express.static('uploads'));
app.use("/api",require("./routes/app.routes"));
app.use(errors.errorHandler);
app.use(cors());


app.listen(process.env.port || 9000,
    function(){
        console.log("ready");
    }
    )
