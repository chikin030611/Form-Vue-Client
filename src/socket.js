import { reactive } from "vue";
import { io } from "socket.io-client";

export const state = reactive({
  connected: false,
  numOfUsers: 0,
});

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000";

export const socket = io("http://localhost:3000", {
  withCredentials: true,
  extraHeaders: {
    "Access-Header": "abcd"
  }
});

socket.on('user connection', (numOfUsers) => {
  console.log(state.numOfUsers);
  state.numOfUsers = numOfUsers;
});

socket.on("connect", () => {
  state.connected = true;
});

socket.on("disconnect", () => {
  state.connected = false;
});
