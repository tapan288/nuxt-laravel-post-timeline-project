// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },

  devServer: {
    host: "backend.test",
  },
  plugins: ["~/plugins/echo.client.ts"],

  modules: ["nuxt-auth-sanctum"],
  sanctum: {
    baseUrl: "http://backend.test:80", // Laravel API
    redirect: {
      onAuthOnly: "auth/login",
      onGuestOnly: "dashboard",
      onLogout: "/",
    },
  },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
