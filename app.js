const express = require("express");
const webpush = require("web-push");
const path = require("path");
const app = express();

const publicVapidKey =
  "BE3T0NwEJRHmfbj3oUkG3H-LMr5lfgXREvV-yaZEjMjGnWJ9a04XDRwjpIg_QcLx3WVZkltXOxnSpiypHhXm17I";
const privateVapidKey = "a55HqEsfRQvfgRqq-Y2YCYSf1vo7KQF5JMWcff9hZvE";

webpush.setVapidDetails(
  "mailto:multi.hridoy@gmail.com",
  publicVapidKey,
  privateVapidKey
);

app.use(express.static(path.resolve(__dirname, "client")));
app.use(express.json());

app.post("/subscribe", (req, res) => {
  const subscription = req.body;
  fs.writeFileSync("./file.txt", JSON.stringify(subscription));

  const payload = JSON.stringify({
    title: "This is title",
    body: "This is body",
    link: "http://adda-golpo.herokuapp.com/"
  });
  res.status(201).json({});

  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.log(err));
});

app.listen(5000, () => {
  console.log("App is running...");
});
