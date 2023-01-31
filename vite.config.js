import { defineConfig } from 'vite';
import * as THREE from 'three';
import gsap from 'gsap'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/lorenz/',
    plugins: [THREE, gsap]
});