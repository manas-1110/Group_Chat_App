import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            "/api": {
                target: "https://group-chat-app-vnh5-q6xw9ptr0-manas-thakurs-projects-690151d7.vercel.app/",
                changeOrigin: true,
            },
        },
    },
});
