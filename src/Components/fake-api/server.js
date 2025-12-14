import jsonServer from "json-server";
import cors from "cors";

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use(router);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log("Fake API running on port " + PORT);
});
