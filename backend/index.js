const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");
const Jwt = require("jsonwebtoken");
const app = express();
const jwtkey = "e-comm";

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    res.send(result);
})

app.post("/login", async (req, res) => {

    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            Jwt.sign({ user }, jwtkey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    res.send("Something Went Wrong");
                }
                res.send({ user, auth: token });
            })

        }
        else {
            res.send("No user found");
        }
    }
    else {
        res.send("No user found");
    }

})

app.post("/add-product",verifyToken, async (req, res) => {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
})

app.get("/products",verifyToken, async (req, res) => {
    let products = await Product.find();
    if (products.length > 0) {
        res.send(products);
    }
    else {
        res.send("No Products Found");
    }
});

app.delete("/product/:id",verifyToken, async (req, res) => {

    let result = await Product.deleteOne({ _id: req.params.id });
    res.send(result);
});

app.get("/product/:id", verifyToken,async (req, res) => {

    try {
        let result = await Product.findOne({ _id: req.params.id });
        if (result) {
            res.send(result);
        }
        else {
            res.send("No Product Found");
        }
    } catch (err) {
        res.send(err.message);
    }
});

app.put("/product/:id",verifyToken, async (req, res) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    )
    res.send(result);
});

app.get("/search/:key", verifyToken, async (req, res) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { category: { $regex: req.params.key } },
            { company: { $regex: req.params.key } }
        ]
    });
    res.send(result);
})


function verifyToken(req, res, next) 
{
    let token = req.headers["authorization"];
    if (token) {
        token = token.split(" ")[1];
        console.warn("Middleware Called if", token);
        Jwt.verify(token, jwtkey, (err, valid) => {
            if (err) {
                res.status(401).send("Invalid Token");
            }
            else {
                next();
            }
        });

    }
    else {
        res.status(403).send("Please Add Token With Header");
    }
    
}
app.listen(5000);
