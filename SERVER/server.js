//Load env variables
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

//imoprt dependencies
const cors = require("cors");
const express = require("express");
const connectToDb = require("./config/connectToDb");
const usersController = require("./controllers/usersController");
const itemsController = require("./controllers/itemsController");

//create express app
const app = express();

//configure express app
app.use(express.json());
app.use(cors());

//connect to database
connectToDb();

//routing
//...

//users routing
app.get("/users", usersController.fetchUsers);

app.get("/users/:id", usersController.fetchUser);

app.post("/users", usersController.createUser);

app.put("/users/:id", usersController.updateUser);

app.delete("/users/:id", usersController.deleteUser);

//items routing

app.get("/items", itemsController.fetchItems);

app.get("/items/:id", itemsController.fetchItem);

app.post("/items", itemsController.createItem);

app.put("/items/:id", itemsController.updateItem);

app.delete("/items/:id", itemsController.deleteItem);

//
//
//
//...

//start server
app.listen(process.env.PORT);
