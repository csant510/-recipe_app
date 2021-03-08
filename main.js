const { mongo } = require("mongoose");

const express = require("express"),
  app = express(),
  errorController = require("./controllers/errorController"),
  homeController = require("./controllers/homeController"),
  layouts = require("express-ejs-layouts"),
  mongoose = require("mongoose");
 // Subscriber = require("./models/subscriber");

  mongoose.connect("mongodb://localhost:27017/recipe_db",{ useNewUrlParser: true });
  
  mongoose.set("useCreateIndex", true);
    const db = mongoose.connection;
    db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
    });
   

   
    const subscriberSchema = mongoose.Schema({
      name: String,
      email: String,
      zipCode: Number
    });
    
  const Subscriber = mongoose.model("Subscriber", subscriberSchema);
    
  var subscriber1 = new Subscriber({
    name: "Charles Santana",
    email: "Charles@CharlesSantana.com"
  });
  
  subscriber1.save((error, savedDocument) => {
    if (error) console.log(error);
    console.log(savedDocument);
  });
  
  Subscriber.create(
    {
      name: "Charles Santana",
      email: "Charles@CharlesSantana.com"
    },
    function (error, savedDocument) {
      if (error) console.log(error);
      console.log(savedDocument);
    }
  );
  
  

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(layouts);
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());
app.use(homeController.logRequestPaths);

app.get("/name", homeController.respondWithName);
app.get("/items/:vegetable", homeController.sendReqParam);

app.post("/", (req, res) => {
  console.log(req.body);
  console.log(req.query);
  res.send("POST Successful!");
});

app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});