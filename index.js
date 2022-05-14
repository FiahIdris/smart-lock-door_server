const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8080;
const router = require("./routers");

app.use("/uploads", express.static("uploads"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}`);
});
