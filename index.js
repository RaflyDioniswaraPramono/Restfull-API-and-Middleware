import express from "express";
import "dotenv/config.js";
import router from "./routes/Router.js";
import bodyParser from "body-parser";
import db from "./config/Database.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// import Movies from "./models/Movies.js";
// import Users from "./models/Users.js";

const app = express();
const port = process.env.PORT_DEV || 3001;

app.use(express.json());
app.use(bodyParser.json());
app.use(router);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Simple Movies API with basic auth",
      version: "0.0.1",
      description:
        "Simple Movies API includes basic authentication and authorization. It easy to consume with your other apps, just make sure you have a device.",
    },
    servers: [
      {
        url: "http://localhost:3001",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api/v1/docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, {
    explorer: true,
    customCssUrl:
      "https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.1/themes/3.x/theme-flattop.min.css"
  })
);

try {
  await db.authenticate();

  // await Movies.sync();
  // await Users.sync();

  console.log("Database connected!");
} catch (error) {
  console.log(error);
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});
