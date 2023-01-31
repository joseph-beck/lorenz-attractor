import * as THREE from 'three';
import gsap from 'gsap';

export default class Sphere {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;

        this.geometry = undefined;
        this.material = undefined;
        this.mesh = undefined;

        this.timeline = undefined;
    }

    initialize() {
        this.geometry = new THREE.SphereGeometry(
            this.x, 
            this.y, 
            this.z
        );

        this.material = new THREE.MeshStandardMaterial({
            color: '#00ff83',
        });

        this.timeline = gsap.timeline({
            defaults: { duration: 5 }
        });
    }

    load() {
        this.timeline.fromTo(
            this.mesh.scale, 
            { z: 0, x: 0, y: 0 }, 
            { z: 1, x: 1, y: 1 }
        );
    }

    getMesh() {
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        return this.mesh;
    }
}