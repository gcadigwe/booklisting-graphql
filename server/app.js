const express = require("express");
const graghqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

mongoose
  .connect(
    process.env.MONGODB_URI || "mongodb+srv://gqlproject:salzkid24@gql.gw6qr.mongodb.net/gqlproject?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("DB Connected");
  });

mongoose.connection.on("error", (err) => {
  console.log("DB connection error:", err.message);
});
const app = express();

//allow corss origin request
app.use(cors());

//set up a middlerware that handles qraphql request
app.use(
  "/graphql",
  graghqlHTTP.graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const PORT = 8000 || process.env.PORT;

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('../client/build'));
}

app.listen(PORT, () => {
  console.log(`Now listening for requests on port ${PORT}`);
});
