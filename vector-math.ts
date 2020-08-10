
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
        let v1 = createVectorFromText(sV1)
        let v2 = createVectorFromText(sV2)
        return createVectorXY(v1.x + v2.x, v1.y + v2.y)
    }
    /**
     * Create  sprite with line from sprite along vector 
     */
    //% group=Create
    //% blockId=createVectorLine
    //% blockSetVariable=mySprite
    //% block="create sprite with line from sprite %fromSprite=variables_get(fromSprite) along vector text $sVector"
    //% sVector.defl="0|0"
    export function draw_line_from_sprite_along_vector (fromSprite: Sprite, sVector: string) :Sprite{
        let tmp_vector = vectorMath.createVectorFromText(sVector)
        let wh = Math.max(Math.abs(tmp_vector.x), Math.abs(tmp_vector.y))
        let line_image = image.create(wh, wh)
        let line_sprite = sprites.create(line_image, SpriteKind.Player)
        let x_from: number = 0
        let x_to: number = 0
        let y_from: number = 0
        let y_to: number = 0
        if (tmp_vector.x >= 0) {
            x_to = tmp_vector.x
            line_sprite.left = fromSprite.x
        } else {
            x_from = Math.abs(tmp_vector.x)
            line_sprite.left = tmp_vector.x + fromSprite.x
        }
        if (tmp_vector.y >= 0) {
            y_to = tmp_vector.y
            line_sprite.top = fromSprite.y
        } else {
            y_from = Math.abs(tmp_vector.y)
            line_sprite.top = tmp_vector.y + fromSprite.y
        }
        line_image.drawLine(x_from, y_from, x_to, y_to, 2)
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
        let mag = Math.round(Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)))
        let dir = Vector.rad2deg( 1 / Math.tan(y / x))
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
    //% block="get vetcor %v=variables_get(myVector) as text"
    export function text(v:Vector): string {
        return v.mag.toString() + "|" +  v.dir.toString()
    }
}   // namespace vectorMath
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
    //% group=Properties
    //% blockSetVariable="myVector"
    //% blockCombine block="direction"
    get dir() {
        return this._dir
    }   // get dir()
    /**
     * Set the direction of the vector in degrees.
     */
    //% group=Properties
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
    //% blockCombine block="magnitude (size)"s
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
        this._x = Math.round(this._r * Math.cos(this._theta))
        this._y = Math.round(this._r * Math.sin(this._theta))
    }   // calcCartesian()
    /**
     * Convert degrees to radians
     * @param {number} angle - The angle to convert in degrees.
     * @return {number} The angle in radians.
     */
    static deg2rad(angle: number): number {
        return Math.round(angle * Math.PI / 180)
    }   // deg2rad()

    /**
     * Convert radians to degrees.
     * @param {number} angle - The angle to convert in radians.
     * @return {number} The angle in degrees.
     */
    static rad2deg(theta: number): number {
        return Math.round(theta * 180 / Math.PI)
    }   // rad2deg
}   // class Vector


