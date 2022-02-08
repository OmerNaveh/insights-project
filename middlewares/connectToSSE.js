const { clients } = require("./clients");
exports.connectToSSE = (req, res, next) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });
  clients.push(res);
  next();
};
