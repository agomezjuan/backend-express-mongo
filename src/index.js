import http from "http";
import app from "./routes/index.js";

const normalizePort = val => {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  } else if (port >= 0) {
    return port;
  }
  return false;
};

const port = normalizePort(process.env.PORT || 3000);

app.set("port", port);

const errorHandler = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();

  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");

      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");

      process.exit(1);
      break;
    default:
      throw error;
  }
};

server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

const server = http.createServer(app);

server.listen(port);
