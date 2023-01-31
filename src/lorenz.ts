export default class Lorenz {
    a: number;
    b: number;
    c: number;

    x: number;
    y: number;
    z: number;

    dt: number;

    constructor(x: number = 0.01, y: number = 0, z: number = 0,
                a: number = 28, b: number = 10, c: number = 8.0/3.0,
                dt: number = 0.01) {
        this.a = a
        this.b = b
        this.c = c

        this.x = x;
        this.y = y;
        this.z = z;

        this.dt = dt;
    }

    generate(): number[] {
        // (dx/dt) = (a(y - x)) * dt
        // (dy/dt) = (x(b - z) - y) * dt
        // (dz/dt) = (xy - cz) * dt

        let dx: number = (this.b * (this.y - this.x)) * this.dt;
        let dy: number = (this.x * (this.a - this.z) - this.y) * this.dt;
        let dz: number = ((this.x * this.y) - (this.c * this.z)) * this.dt;

        this.x += dx;
        this.y += dy;
        this.z += dz;

        return [ this.x, this.y, this.z ];
    }

    getVariables(): number[] {
        return [ this.a, this.b, this.c ];
    }
}