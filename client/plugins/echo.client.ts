import Echo from "laravel-echo";
import Pusher from "pusher-js";

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig();

  window.Pusher = Pusher;
  window.Echo = new Echo({
    broadcaster: "reverb",
    key: runtimeConfig.public.REVERB_KEY,
    wsHost: runtimeConfig.public.REVERB_HOST,
    wsPort: 8080,
    wssPort: 443,
    forceTLS: false,
    enabledTransports: ["ws", "wss"],
  });
});
