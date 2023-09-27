const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");

const io = require("socket.io")(server, {
  cors: {
    origin: "https://web-rtc-video-chat-client.vercel.app",
    methods: ["GET", "POST"],
  },
  credentials: true,
});

app.use(cors());

// Magic Lines
server.prependListener("request", (_req, res) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://web-rtc-video-chat-client.vercel.app"
  );
});

app.get("/", (req, res) => {
  return res.send("Server is running");
});

io.on("connection", (socket) => {
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });

  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit("callUser", { signal: signalData, from, name });
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  if (process.env.NODE_ENV === "development") {
    console.log(`http://localhost:${port}`);
  }
});
