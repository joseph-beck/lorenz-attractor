import * as THREE from 'three';

export default class Dot {
    constructor(x, y, z, colour, scale=0.15) {
        this.x = x;
        this.y = y;
        this.z = z;

        this.colour = colour
        this.scale = scale

        this.geometry = undefined;
        this.material = undefined;
        this.point = undefined;
    }

    initialize() {
        this.geometry = new THREE.BufferGeometry();
        this.geometry.setAttribute(
            'position', 
            new THREE.BufferAttribute(new Float32Array([this.x, this.y, this.z]), 3)
        );

        this.material = new THREE.PointsMaterial({
            size: this.scale,
            color: this.colour,
        });

        this.point = new THREE.Points(
            this.geometry, 
            this.material
        );
    }

    getPoint() {
        //console.log('returned dot' + this);
        return this.point;
    }
}