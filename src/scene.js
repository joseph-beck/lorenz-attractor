import * as THREE from 'three';
import gsap from 'gsap'

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

import '../style.css';

import Lorenz from './lorenz';
import Dot from './dot';

export default class Scene {    
    constructor() {
        this.scene = undefined;
        this.camera = undefined;
        this.renderer = undefined;

        this.fov = 45;
        this.nearPlane = 0.1;
        this.farPlane = 1000000000;

        this.light = [];
        this.timeline = undefined;

        this.lorenz = undefined;

        this.frameCounter = 0;
    }

    initialize() {
        this.lorenz = new Lorenz();
        // init scene and camera
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            this.fov,
            window.innerWidth / window.innerHeight,
            this.nearPlane,
            this.farPlane
        );
        this.camera.position.z = 275;
        this.scene.add(this.camera);

        // init renderer
        const canvas = document.querySelector('.webgl')
        this.renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: false,
        });

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(2);
        document.body.appendChild(this.renderer.domElement);

        // set up orbit controls
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.enablePan = true;
        this.controls.enableZoom = true;
        this.controls.autoRotate = true;
        this.controls.autoRotateSpeed = 0;

        // init light
        this.light[0] = new THREE.PointLight(0xffffff, 1, 100);
        this.light[0].position.set(0, 10, 10);
        this.scene.add(this.light[0]);
        
        this.light[1] = new THREE.AmbientLight(0x404040, 1);
        this.scene.add(this.light[1]);

        // init timeline
        this.timeline = gsap.timeline({
            defaults: { duration: 1 }
        });
        
        // add resize listener
        window.addEventListener('resize', () => this.onWindowResize(), false);
    }

    load() {
        this.timeline.fromTo(
            "nav",
            { y: "-100%"},
            { y: "0%" }
        );
    }

    animate() {
        window.requestAnimationFrame(this.animate.bind(this));
        this.render();
        this.controls.update();

        this.update();        
        
        this.frameCounter++;
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

    update() {
        let coords = this.lorenz.generate();

        let point = new Dot(
            coords[0],
            coords[1],
            coords[2],
            0xff0000
        );

        point.initialize();
        this.scene.add(point.getPoint());
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}