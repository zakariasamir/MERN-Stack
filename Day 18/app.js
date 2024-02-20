const express = require("express");
const app = express();
app.use(express.json());
const PORT = 3000;
let products = [
  { id: 1, name: "iPhone 12 Pro", price: 1099.99 },
  { id: 2, name: "Samsung Galaxy S21", price: 999.99 },
  { id: 3, name: "Sony PlayStation 5", price: 499.99 },
  { id: 4, name: "MacBook Pro 16", price: 2399.99 },
  { id: 5, name: "DJI Mavic Air 2", price: 799.99 },
];

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Get all products
app.get("/products", (req, res) => {
  try {
    res.send(products);
  } catch (error) {
    next(error);
  }
});

// Search products
app.get("/products/search", (req, res) => {
  try {
    const { q, minPrice, maxPrice } = req.query;
    let prod = products;

    if (q) {
      prod = prod.filter((product) => product.name.includes(q));
    }
    if (minPrice) {
      prod = prod.filter((product) => product.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
      prod = prod.filter((product) => product.price <= parseFloat(maxPrice));
    }
    res.send(prod);
  } catch (error) {
    next(error);
  }
});

// Get product by ID
app.get("/products/:id", (req, res) => {
  try {
    const product = products.find(
      (product) => product.id === parseInt(req.params.id)
    );
    if (!product) {
      res.status(404).send("Product not found");
      return;
    }
    res.send(product);
  } catch (error) {
    next(error);
  }
});

// Add a new product
app.post("/products", (req, res) => {
  try {
    const id = products.length + 1;
    const { name, price } = req.body;
    products.push({ id, name, price });
    res.send("Product added successfully");
  } catch (error) {
    next(error);
  }
});

// Update an existing product
app.put("/products/:id", (req, res) => {
  try {
    const { name, price } = req.body;
    const product = products.find(
      (product) => product.id === parseInt(req.params.id)
    );
    if (!product) {
      res.status(404).send("Product not found");
      return;
    }
    if (name) {
      product.name = name;
    }
    if (price) {
      product.price = price;
    }
    res.send("Product updated successfully");
  } catch (error) {
    next(error);
  }
});

// Delete a product
app.delete("/products/:id", (req, res) => {
  try {
    const index = products.findIndex(
      (product) => product.id === parseInt(req.params.id)
    );
    if (index === -1) {
      res.status(404).send("Product not found");
      return;
    }
    products.splice(index, 1);
    res.send("Product deleted successfully");
  } catch (error) {
    next(error);
  }
});

// Error route for testing error handling middleware
app.get("/error", (req, res, next) => {
  next(new Error("Intentional error for testing"));
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
