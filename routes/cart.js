const Cart = require("../models/Cart");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

// Create
router.post("/", verifyToken, async (req, res) => {
    const newCart = new Product(req.body)

    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (err) {
        res.status(500).json(err)
    }
})

// UpDate
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => { 
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req, params.id, {
            $set: req.body
        },{new:true})
        res.status(200).json(updatedCart)
    } catch(err){res.status(500).json(err)}
});

// Delete
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("La tarjeta a sido eliminado...")
    } catch (err) {
        res.status(500).json(err)
    }
})

// Get User Produt
router.get("/find/:userid", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const cart = await Cart.findOne({userid: req.params.userid})
        res.status(200).json(cart)
    } catch (err) {
        res.status(500).json(err)
    }
})

// // Get all
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const carts = await Cart.find()
        res.status(200).json(carts)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router