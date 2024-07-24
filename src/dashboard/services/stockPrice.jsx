import { io } from "socket.io-client";

const CHAT_APP_SOCKET_URL = process.env.REACT_APP_LOCAL_API_URL || "http://localhost:4000";

let socket = null;

export const connectSocket = () => {
  if (!socket) {
    console.log(`Connecting to ${CHAT_APP_SOCKET_URL}/price`);
    socket = io(CHAT_APP_SOCKET_URL, {
      path: "/price",
    });
  } else {
    console.log("Socket already connected");
  }
  return socket;
};

export const joinRoom = (roomCode, handlePrice, handleCompare) => {
  return new Promise((resolve, reject) => {
    console.log(`Joining price room with roomCode: ${roomCode}`);
    socket.emit("join price room", { roomCode });

    socket.on("load price", (price) => {
      if (!price) {
        handlePrice(0);
        handleCompare(0);
      } else {
        handlePrice(price.price);
        handleCompare(price.compare);
        console.log("load price", price.price);
      }
      resolve(price);
    });

    socket.on("error", (error) => {
      console.error("Error joining price room:", error);
      reject(error);
    });
  });
};

export const requestCurrentPrice = (stockCode, handlePrice, handleCompare) => {
  return new Promise((resolve, reject) => {
    console.log(`Requesting current price for stockCode: ${stockCode}`);
    socket.emit("request current price", { stockCode });

    socket.on("current price", (response) => {
      if (response.status === "success") {
        handlePrice(response.price);
        handleCompare(response.compare);
        resolve(response.price);
      } else {
        console.log("Price not sent");
        reject(new Error("price not sent"));
      }
    });

    socket.on("error", (error) => {
      console.error("Error requesting current price:", error);
      handlePrice(0);
      handleCompare(0);
    });
  });
};

export const disconnectSocket = () => {
  if (socket) {
    console.log("Price Disconnecting socket");
    socket.disconnect();
    socket = null;
  }
};
