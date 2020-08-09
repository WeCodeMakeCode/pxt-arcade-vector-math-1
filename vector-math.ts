/**
 * Vector representation
 */
//% blockNamespace="vectorMath"
class Vector {
    private _r: number
    private _theta: number // angle in radians
    private _dir: number // angle in degrees
    private _x: number
    private _y: number

    /**
     * Initialize object.
     * @param {number} mag - Magnitude of vector.
     * @param {number} dir - Direction of vector in degrees.
     */
    constructor(mag: number, dir: number) {
        this._r = mag
        this.dir = dir // call to property dir
    }   // constructor(number, number)

    /**
     * Get the direction of the vector in degrees.
     */
    //% blockSetVariable="myVector"
    //% blockCombine block="direction"
    get dir() {
        return this._dir
    }   // get dir()
    /**
     * Set the direction of the vector in degrees.
     */
    //% blockSetVariable="myVector"
    //% blockCombine block="direction"
    set dir(value: number) {
        this._dir = value
        this._theta = Vector.deg2rad(value)
        this.calcCartesian()
    }   // set dir()

    /**
     * Get the magnitude of the vector.
     */
    //% blockSetVariable="myVector"
    //% blockCombine block="magnitude (size)"
    get mag(): number {
        return this._r
    }   // get mag()

    /**
     * Set the magnitude of the vector.
     */
    //% blockSetVariable="myVector"
    //% blockCombine block="magnitude (size)"s
    set mag(value: number) {
        this._r = value
        this.calcCartesian()
    }   // set mag()

    /**
     * Get the horizontal component of the vector in the Cartesian plane.
     */
    //% blockSetVariable="myVector"
    //% blockCombine block="x"
    get x(): number {
        return this._x
    }   // get x()

    /**
     * Get the vertical component of the vector in the Cartesian plane.
     */
    //% blockSetVariable="myVector"
    //% blockCombine block="y"
    get y(): number {
        return this._y
    }   // get y()
    /**
     * Update the Cartesian representation of the vector.
     */
    calcCartesian(): void {
        this._x = Math.round(this._r * Math.cos(this._theta))
        this._y = Math.round(this._r * Math.sin(this._theta))
    }   // calcCartesian()
    /**
     * Convert degrees to radians
     * @param {number} angle - The angle to convert in degrees.
     * @return {number} The angle in radians.
     */
    static deg2rad(angle: number): number {
        return angle * Math.PI / 180;
    }   // deg2rad()

    /**
     * Convert radians to degrees.
     * @param {number} angle - The angle to convert in radians.
     * @return {number} The angle in degrees.
     */
    static rad2deg(theta: number): number {
        return theta * 180 / Math.PI;
    }   // rad2deg
}   // class Vector

/**
 * Extension for manipulating vectors.
 */
//% weight=0 color=#b8860b icon="\uf124" block="Vectors"
//% advanced=true
namespace vectorMath {
    /**
     * Create a vector.
     */
    //% blockId=vectormath_create_vector
    //% blockSetVariable=myVector
    //% block="create vector with magnitude %mag and direction %dir"
    //% mag.defl=0 dir.defl=0
    export function createVector(mag: number, dir: number): Vector {
        return new Vector(mag, dir)
    }   // createVector()

    /**
     * Create a vector from sprites.
     */
    //% blockId=vectormath_create_vector_from_sprites
    //% blockSetVariable=myVector
    //% block="create vector from sprite %spriteFrom=variables_get(fromSprite) to sprite %spriteTo=variables_get(toSprite)"
    export function createVectorFromSprites(spriteFrom: Sprite, spriteTo: Sprite): Vector {
        let mag = Math.sqrt((spriteFrom.x - spriteTo.x) ** 2 + (spriteFrom.y - spriteTo.y) ** 2)
        let dir = Vector.rad2deg(Math.atan2(spriteTo.y - spriteFrom.y, spriteTo.x - spriteFrom.x))
        return new Vector(mag, dir)
    }   // createVectorFromSprites()

    /**
     * get mag and dir as text string
     */
    //% blockSetVariable=myTextVector
    //% block="get vetcor %v=variables_get(myVector) as text"
    export function text(v:Vector): string {
        return v.mag.toString() + "|" +  v.dir.toString()
    }
    /**
     * Create a vector fom text of mag | dir
     */
    //% blockId=vectormath_create_vector_from_string
    //% blockSetVariable=myVector
    //% block="create vector from text %magDirText"
    //% magDirText.defl="0|0"
    export function createVectorFromText(magDirText:string): Vector {
        let a = magDirText.split("|")
        let mag: number = parseInt(a[0])
        let dir: number = parseInt(a[1])
        return new Vector(mag, dir)
    }   // createVectorFromText()

    //% group="Create"
    //% block="destroy %v=variables_get(myVector)"
    export function destroy(v:Vector) {
        v=null
    }

}   // namespace vectorMath
