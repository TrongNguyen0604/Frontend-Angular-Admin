const jsonServer = require('json-server');
const auth = require('json-server-auth');
const cors = require('cors');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.db = router.db;

server.use(cors());
server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(auth); // phải đặt trước router
server.use(router);

server.listen(3000, () => {
  console.log('🚀 JSON Server is running at http://localhost:3000');
});
