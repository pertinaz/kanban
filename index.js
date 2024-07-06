import app from "./app.js";

const PORT = process.env.PORT || 3000; // default port

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`); // conection with the server suceessfully made.
});
