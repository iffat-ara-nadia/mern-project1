const Item = require("../models/itemModel");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const items = await Item.find().sort({ name: 1 });
  res.send(items);
});

router.get("/:id", async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item)
    return res.status(404).send("The item with given ID was not found....");
  res.send(item);
});

router.post("/", async (req, res) => {
  // const {error} =  validate(req.body);
  // if(error) return res.status(400).send("error.details[0].message");

  let item = new Item({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: req.body.image
  });

  await item.save();
  res.send(item);
});

router.put("/:id", async (req, res) => {
  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  const item = await Item.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: req.body.image
    },
    { new: true }
  );

  if (!item)
    return res.status(404).send("The item with the GIVEN ID was not found... ");

  res.send(item);
});

router.delete("/:id", async (req, res) => {
  const item = await Item.findByIdAndRemove(req.params.id);
  if (!item)
    return res.status(404).send("The item with the GIVEN ID was not found...");

  res.send(item);
});

module.exports = router;
