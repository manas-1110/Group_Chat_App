import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            "/api": {
                target: "https://group-chat-app-vnh5-fhx1apdnl-manas-thakurs-projects-690151d7.vercel.app/",
                changeOrigin: true,
            },
        },
    },
});
