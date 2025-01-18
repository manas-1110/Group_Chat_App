import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    define: {
        "process.env": {
            VITE_BACKEND_URL: JSON.stringify(
                "https://group-chat-app-vnh5.vercel.app"
            ),
        },
    },
});
