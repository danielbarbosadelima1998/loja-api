const express = require("express");
const route = express.Router();
const auth = require("./middlewares/auth");
const { users, categories, products } = require("./controllers");

// User
route.get("/users", users.index);
route.get("/users/:id", auth, users.show);
route.post("/users", users.store);
route.delete("/users/:id", auth, users.destroy);
route.put("/users/:id", auth, users.update);

route.post("/login", users.login);

route.get("/products", products.index);
route.get("/products/:id", products.show);
route.post("/products", products.store);
route.delete("/products/:id", products.destroy);
route.put("/products/:id", products.update);

route.get("/categories", categories.index);
route.get("/categories/:id", categories.show);
route.post("/categories", categories.store);
route.delete("/categories/:id", categories.destroy);
route.put("/categories/:id", categories.update);

module.exports = route;
