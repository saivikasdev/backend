const mongoose = require("mongoose");

const product = mongoose.model(
"products",
mongoose.Schema(
    {
       productid: String,
       productname: String,
       productprice: Number,
       productimage: String,
    },
    {
        timestamps:true,
    }
)
);

module.exports = {product}