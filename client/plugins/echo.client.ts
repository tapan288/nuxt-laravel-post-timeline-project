import Echo from "laravel-echo";
import Pusher from "pusher-js";

export default defineNuxtPlugin(() => {
  window.Pusher = Pusher;
  window.Echo = new Echo({
    broadcaster: "reverb",
    key: "c5gpw58mmjbv6yvpmm6e",
    wsHost: "backend.test",
    wsPort: 8080,
    wssPort: 443,
    forceTLS: false,
    enabledTransports: ["ws", "wss"],
  });
});
