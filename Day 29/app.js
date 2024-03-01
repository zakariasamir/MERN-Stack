const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const uri = process.env.DB_URI;
const app = express();
const products = [
  {
    name: "Laptop",
    price: 1200,
    description: "High-performance laptop with powerful specs.",
    inStock: true,
  },
  {
    name: "Smartphone",
    price: 800,
    description: "Latest smartphone with advanced features.",
    inStock: true,
    expirationDate: "2024-02-29",
  },
  {
    name: "Headphones",
    price: 150,
    description: "Over-ear headphones with noise-cancelling technology.",
    inStock: true,
    expirationDate: "2024-02-29",
  },
  {
    name: "Smartwatch",
    price: 250,
    description: "Fitness tracker and smartwatch with health monitoring.",
    inStock: false,
    expirationDate: "2024-02-29",
  },
  {
    name: "Camera",
    price: 600,
    description: "Digital camera with high-resolution imaging.",
    inStock: true,
    expirationDate: "2024-02-29",
  },
  {
    name: "Gaming Console",
    price: 400,
    description: "Next-gen gaming console for immersive gaming experiences.",
    inStock: true,
  },
  {
    name: "Bluetooth Speaker",
    price: 80,
    description: "Portable Bluetooth speaker with crisp sound.",
    inStock: true,
  },
  {
    name: "Tablet",
    price: 300,
    description: "Slim and lightweight tablet for on-the-go productivity.",
    inStock: true,
  },
  {
    name: "Coffee Maker",
    price: 50,
    description: "Automatic coffee maker for brewing your favorite coffee.",
    inStock: true,
  },
  {
    name: "Fitness Tracker",
    price: 100,
    description: "Wearable fitness tracker with heart rate monitoring.",
    inStock: false,
  },
  {
    name: "External Hard Drive",
    price: 120,
    description: "Large-capacity external hard drive for data storage.",
    inStock: true,
  },
  {
    name: "Wireless Mouse",
    price: 30,
    description: "Ergonomic wireless mouse for comfortable computing.",
    inStock: true,
  },
  {
    name: "Portable Charger",
    price: 20,
    description: "Compact portable charger for on-the-go device charging.",
    inStock: true,
  },
  {
    name: "Smart Bulbs",
    price: 15,
    description: "Set of smart bulbs for customizable lighting at home.",
    inStock: true,
  },
  {
    name: "Backpack",
    price: 40,
    description: "Durable backpack with multiple compartments for storage.",
    inStock: true,
  },
  {
    name: "Wireless Earbuds",
    price: 120,
    description: "True wireless earbuds for immersive audio experiences.",
    inStock: false,
  },
  {
    name: "Graphic Tablet",
    price: 200,
    description: "Digital graphic tablet for artists and designers.",
    inStock: true,
  },
  {
    name: "Desk Chair",
    price: 150,
    description: "Comfortable desk chair with adjustable features.",
    inStock: true,
  },
  {
    name: "Air Purifier",
    price: 80,
    description: "HEPA air purifier for cleaner and fresher indoor air.",
    inStock: true,
  },
  {
    name: "Electric Toothbrush",
    price: 40,
    description: "Electric toothbrush for effective dental care.",
    inStock: true,
  },
];
async function main() {
  await mongoose
    .connect(uri)
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
      isDeleted: {
        type: Boolean,
        default: false,
      },
      expirationDate: {
        type: Date,
      },
    },
    { timestamps: true }
  );
  const Products = mongoose.model("Products", productSchema);
  async function addData() {
    await Products.insertMany(products)
      .then(() => {
        console.log("Data Inserted");
      })
      .catch((err) => {
        console.log(err);
      });
  }
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
  async function updatePrice() {
    await Products.findOneAndUpdate(
      { name: "Laptop" },
      { price: 1500 },
      { new: true }
    ).then((product) => {
      product
        ? console.log(product)
        : console.log("product not found").catch((err) => console.log(err));
    });
  }
  async function softDelete() {
    await Products.findOneAndUpdate(
      { name: "hkkjhjljn" },
      { isDeleted: true },
      { new: true }
    )
      .then((product) => {
        product ? console.log(product) : console.log("product not found");
      })
      .catch((err) => console.log(err));
  }
  async function hardDeleteExpiredProducts() {
    const currentDate = new Date();
    await Products.deleteMany({ expirationDate: { $lt: currentDate } })
      .then((deletedProducts) => {
        console.log(
          `${deletedProducts.deletedCount} products have been hard deleted.`
        );
      })
      .catch((err) => {
        console.error("Error deleting expired products:", err);
      });
  }
  async function updateDescription() {
    await Products.updateMany(
      { inStock: true },
      { description: "this item have an updated description" }
    )
      .then((updatedProducts) => {
        console.log(`${updatedProducts.modifiedCount} product updated`);
      })
      .catch((err) => {
        console.error("Error updating products:", err);
      });
  }
  async function deleteOutOfStock() {
    Products.deleteMany({
      inStock: false,
    })
      .then((productsDeleted) => {
        console.log(
          `${productsDeleted.deletedCount} products is out of stock and have been deleted`
        );
      })
      .catch((error) => {
        console.log("Error deleting out of stock products:", error);
      });
  }
  addData();
  // sortProductsByPrice();
  // limitProducts();
  // productPages();
  // calculateAveragePrice();
  // ascendingOrder();
  // dynamicProductsPageSize()
  // groupProductsCategories();
  // updatePrice();
  // softDelete();
  // hardDeleteExpiredProducts();
  // updateDescription();
  // deleteOutOfStock();
  app.listen(3000, () => {
    console.log("server is listening on port 3000");
  });
}

main();
