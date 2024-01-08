import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';


const BACKEND_ADDR = process.env.BACKEND_ADDR || "http://127.0.0.1:8000/";

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		proxy: {
			// Backend API Proxy
			"/api": {
                target: BACKEND_ADDR,
                changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
            },
		}
	}
});
