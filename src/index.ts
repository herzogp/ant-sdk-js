import http from "http";

const PORT = process.env.PORT || 3000;

export const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-type": "application/json" });
  res.write(JSON.stringify({ data: "ant-sdk-js works!" }));
  res.end();
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});
