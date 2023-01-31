import * as THREE from 'three';

export default class Node {
    constructor(x=2, y=2, z=2, scale=0.15) {
        this.x = x;
        this.y = y;
        this.z = z;

        this.scale = scale;

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
            color: '#FFFFFF',
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        
        this.mesh.scale.set(
            this.scale,
            this.scale,
            this.scale
        );
    }

    setPosition(x, y, z) {
        this.mesh.position.x = x;
        this.mesh.position.y = y;
        this.mesh.position.z = z;
    }

    getMesh() {
        return this.mesh;
    }
}