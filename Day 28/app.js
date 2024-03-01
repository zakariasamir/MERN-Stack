const express = require("express");
const mongoose = require("mongoose");
const app = express();
async function main() {
  await mongoose
    .connect("mongodb://localhost:27017/ProductDatabase")
    .then(() => console.log("Connected to database"))
    .catch((error) => console.log("Error: ", error));
  const productSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
        min: [1, "price "],
      },
      description: {
        type: String,
      },
      inStock: {
        type: Boolean,
        default: true,
      },
    },
    { timestamps: true }
  );
  const Products = mongoose.model("Products", productSchema);
  // await Products.insertMany(products)
  //   .then(() => {
  //     console.log("Data Inserted");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  async function sortProductsByPrice() {
    await Products.find()
      .sort({ price: 1 })
      .then((products) => {
        console.log(products);
      });
  }
  async function limitProducts() {
    await Products.find()
      .limit(5)
      .then((products) => {
        console.log(products);
      });
  }
  async function productPages() {
    const pageSize = 2;
    const pageNumber = 3;
    await Products.find()
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .then((products) => {
        console.log(products);
      });
  }
  async function calculateAveragePrice() {
    Products.aggregate([
      {
        $group: {
          _id: "",
          averagePrice: { $avg: "$price" },
        },
      },
    ]).then((products) => {
      console.log(products);
    });
  }
  async function ascendingOrder() {
    await Products.find({})
      .sort({ name: "asc" })
      .then((products) => console.log(products))
      .catch((err) => console.log(err));
  }
  async function dynamicProductsPageSize() {
    const dynamicPageSize = 4;
    await Products.find({})
      .sort({ name: "asc" })
      .limit(dynamicPageSize)
      .then((products) => console.log(products))
      .catch((err) => console.log(err));
  }
  async function groupProductsCategories() {
    const dynamicPageSize = 4;
    await Products.aggregate([
      { $sort: { name: 1 } },
      { $group: { _id: null, products: { $push: "$$ROOT" } } },
      { $project: { products: { $slice: ["$products", 0, dynamicPageSize] } } },
    ])
      .then((result) => console.log(result[0].products))
      .catch((err) => console.error(err));
  }
  // sortProductsByPrice();
  // limitProducts();
  // productPages();
  // calculateAveragePrice();
  // ascendingOrder();
  // dynamicProductsPageSize()
  // groupProductsCategories();
  app.listen(3000, () => {
    console.log("server is listening on port 3000");
  });
}

main();
