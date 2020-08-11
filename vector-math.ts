
/**
 * Extension for manipulating vectors.
 */
//% weight=0 color=#b8860b icon="\uf124" block="Vectors"
//% groups=["create", "properties", "Math"]
namespace vectorMath {
     /**
     * Add 2 vectors
     */
    //% group=Create
    //% blockId=addVectors
    //% blockSetVariable=myVector
    //% block="%sV1=variables_get(vectorAsString_A) + %sV2=variables_get(vectorAsString_B)"
    export function addVectors(sV1:string, sV2: string): Vector {
        let v1: Vector  = createVectorFromText(sV1)
        let v2: Vector = createVectorFromText(sV2)
        return createVectorXY(v1.x + v2.x, v1.y + v2.y)
    }
    /**
     * Create  sprite with line from sprite along vector 
     */
    //% group=Create
    //% blockId=createVectorLine
    //% blockSetVariable=arrow_sprite
    //% block="create arrow %from_sprite=variables_get(from_sprite) for $vector_as_text=variables_get(vector_as_text) %color and %tip_color"
    //% sVector.defl="0|0"
    //% color.min=0 color.max-15 color.defl=2
    export function draw_line_from_sprite_along_vector (from_sprite: Sprite, vector_as_text: string, color:number, tip_color: number): Sprite{
        let V_tmp = createVectorFromText(vector_as_text)  
        // console.log("-----------------draw_line_from_sprite_along_vector")
        // console.log("Vmag = " + V_tmp.mag + " Vdir_degrees = " + V_tmp.dir_degrees + " Vdir_radians = " + V_tmp.dir_radians)
        // console.log("Vx = " + V_tmp.x + " Vy = " + V_tmp.y)
        let wh = Math.max(Math.abs(V_tmp.x), Math.abs(V_tmp.y)) + 1
        // console.log("wh = " + wh )
        let line_image = image.create(wh, wh)
        let line_sprite = sprites.create(line_image, SpriteKind.Player)
        let x_from: number = 0
        let x_to: number = 0
        let y_from: number = 0
        let y_to: number = 0
        if (V_tmp.x >= 0) {
            x_to = V_tmp.x
            line_sprite.left = from_sprite.x // center of from_sprite
        } else {
            x_from = Math.abs(V_tmp.x)
            line_sprite.left = V_tmp.x + from_sprite.x
        }
        if (V_tmp.y >= 0) {
            y_to = V_tmp.y
            line_sprite.top = from_sprite.y  // center of from_sprite
        } else {
            y_from = Math.abs(V_tmp.y)
            line_sprite.top = V_tmp.y + from_sprite.y
        }
        // console.log("x_from = " + x_from + "    x_to = " + x_to) 
        // console.log("y_from = " + y_from + "    y_to = " + y_to)
        line_image.drawLine(x_from, y_from, x_to, y_to, color)
        line_image.setPixel(x_to, y_to, tip_color)
        return line_sprite
    }
    //% group="Create"
    //% block="destroy %v=variables_get(myVector)"
    export function destroy(v:Vector) {
        v=null
    }
    /**
     * Create a vector fom text of mag | dir
     */
    //% group=Create
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

     /**
     * Create a vector from sprites.
     */
    //% group=Create
    //% blockId=vectormath_create_vector_from_sprites
    //% blockSetVariable=myVector
    //% block="create vector from sprite %spriteFrom=variables_get(fromSprite) to sprite %spriteTo=variables_get(toSprite)"
    export function createVectorFromSprites(spriteFrom: Sprite, spriteTo: Sprite): Vector {
        let mag = Math.sqrt((spriteFrom.x - spriteTo.x) ** 2 + (spriteFrom.y - spriteTo.y) ** 2)
        let dir = Vector.rad2deg(Math.atan2(spriteTo.y - spriteFrom.y, spriteTo.x - spriteFrom.x))
        return new Vector(mag, dir)
    }   // createVectorFromSprites()
    /**
     * Create a vector.
     */
    //% group=Create
    //% blockId=vectormath_create_vectorXY
    //% blockSetVariable=myVector
    //% block="create vector with x %x and y %y"
    //% x.min=0 x.max=159 x.defl=0
    //% y.min=0 y.max=119 y.defl=0
    export function createVectorXY(x: number, y: number): Vector {
        let mag = Math.round(Math.sqrt(x * x + y * y))
        let dir = Vector.rad2deg( Math.atan(y / x))
        return new Vector(mag, dir)
    }   // createVector()
    /**
     * Create a vector.
     */
    //% group=Create
    //% blockId=vectormath_create_vector
    //% blockSetVariable=myVector
    //% block="create vector with magnitude %mag and direction %dir"
    //% mag.min=0 mag.max=199 mag.defl=0
    //% dir.min=0 dir.max=360 dir.defl=0
    export function createVector(mag: number, dir: number): Vector {
        return new Vector(mag, dir)
    }   // createVector()
    /**
     * get mag and dir as text string
     */
    //% group=Properties
    //% blockSetVariable=myText
    //% block="vetcor %v=variables_get(myVector) as text"
    export function text(v:Vector): string {
        return v.mag.toString() + "|" +  v.dir_degrees.toString()
    }
}   // namespace vectorMath
/**
 * Vector representation
 */
//% blockNamespace="vectorMath"
class Vector {
    private _r: number    // mag
    private _dir_radians: number // angle in radians
    private _dir_degrees: number // angle in degrees
    private _x: number
    private _y: number

    /**
     * Initialize object.
     * @param {number} mag - Magnitude of vector.
     * @param {number} dir - Direction of vector in degrees.
     */
    constructor(mag: number, dir_degrees: number) {
        this._r = mag
        this.dir_degrees = dir_degrees // call to property dir_degrees
    }   // constructor(number, number)

    /**
     * Get the direction of the vector in degrees.
     */
    //% group=Properties
    //% blockSetVariable="myVector"
    //% blockCombine block="direction (degrees)"
    get dir_degrees() {
        return this._dir_degrees
    }   // get dir()
    /**
     * Set the direction of the vector in degrees.
     */
    //% group=Properties
    //% blockSetVariable="myVector"
    //% blockCombine block="direction (degrees)"
    set dir_degrees(value: number) {
        this._dir_degrees = value
        this._dir_radians = Vector.deg2rad(this._dir_degrees)
        this.calcCartesian()
    }   // set dir()
    //% group=Properties
    //% blockSetVariable="myVector"
    //% blockCombine block="direction (radians)"
    get dir_radians() {
        return this._dir_radians
    }   // get dir()
    /**
     * Set the direction of the vector in degrees.
     */
    //% group=Properties
    //% blockSetVariable="myVector"
    //% blockCombine block="direction (radians)"
    set dir_radians(value: number) {
        this._dir_radians = value
        this._dir_degrees = Vector.deg2rad(this._dir_radians)
        this.calcCartesian()
    }   // set dir()
    /**
     * Get the magnitude of the vector.
     */
    //% group=Properties
    //% blockSetVariable="myVector"
    //% blockCombine block="magnitude (size)"
    get mag(): number {
        return this._r
    }   // get mag()

    /**
     * Set the magnitude of the vector.
     */
    //% group=Properties
    //% blockSetVariable="myVector"
    //% blockCombine block="magnitude (length)"s
    set mag(value: number) {
        this._r = value
        this.calcCartesian()
    }   // set mag()

    /**
     * Get the horizontal component of the vector in the Cartesian plane.
     */
    //% group=Properties
    //% blockSetVariable="myVector"
    //% blockCombine block="x"
    get x(): number {
        return this._x
    }   // get x()

    /**
     * Get the vertical component of the vector in the Cartesian plane.
     */
    //% group=Properties
    //% blockSetVariable="myVector"
    //% blockCombine block="y"
    get y(): number {
        return this._y
    }   // get y()
    /**
     * Update the Cartesian representation of the vector.
     */
    calcCartesian(): void {
        this._x = Math.round(this._r * Math.cos(this._dir_radians))
        this._y = Math.round(this._r * Math.sin(this._dir_radians))
    }   // calcCartesian()
    /**
     * Convert degrees to radians
     * @param {number} angle - The angle to convert in degrees.
     * @return {number} The angle in radians.
     */
    static deg2rad(angle: number): number {
        return angle * Math.PI / 180   // do not round
    }   // deg2rad()

    /**
     * Convert radians to degrees.
     * @param {number} angle - The angle to convert in radians.
     * @return {number} The angle in degrees.
     */
    static rad2deg(theta: number): number {
        return theta * 180 / Math.PI  // do not round
    }   // rad2deg
}   // class Vector


