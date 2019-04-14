class ScrollingCamera extends Phaser.Cameras.Scene2D.Camera {
    constructor(scene, x, y, width, height, { top, bottom, wheel, drag, minSpeed }) {
        super(x, y, width, height);
        // Public members
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.top = top;
        this.bottom = (bottom) ? (bottom - this.height) : null;
        this.wheel = wheel || false;
        this.drag = drag || 0.95;
        this.minSpeed = minSpeed || 5;
        this.init();
    }

    init() {
        //// Private members               
        this.scrollY = this.top || this.y;
        this._rectangle = new Phaser.Geom.Rectangle(this.x, this.y, this.width, this.height);
        // Vertical speed in pixels per second
        this._speed = 0;
        // scrollY value when drag action begins
        this._startY = this.scrollY;
        // scrollY value when drag action ends
        this._endY = this.scrollY;
        // timeStamp when drag action begins
        this._startTime = 0;
        // timeStamp when drag action ends
        this._endTime = 0;

        //// Sets events
        this.setDragEvent();
        if (this.wheel) {
            this.setWheelEvent();
        }
    }

    setSpeed() {
        let t = this;
        let distance = t._endY - t._startY; // pixels
        let duration = (t._endTime - t._startTime) / 1000; //seconds
        this._speed = distance / duration; // pixels/second
    }

    setDragEvent() {
        this.scene.input.on('pointermove', this.dragHandler, this);
        this.scene.input.on('pointerup', this.upHandler, this);
        this.scene.input.on('pointerdown', this.downHandler, this);
    }

    setWheelEvent() {
        window.addEventListener('wheel', this.wheelHandler.bind(this));
    }

    downHandler() {
        this._startY = this.scrollY;
        this._startTime = performance.now();
    }

    dragHandler(pointer) {
        if (pointer.isDown && this.isOver(pointer)) {
            this.startY = this.scrollY;
            this.scrollY -= (pointer.position.y - pointer.prevPosition.y);
        }
    }

    upHandler() {
        this._endY = this.scrollY;
        this._endTime = performance.now();
        this.setSpeed();
    }

    wheelHandler(event) {
        if (this.isOver(this.scene.input.activePointer)) {
            this.scrollY += event.deltaY;
        }
    }

    isOver(pointer) {
        return this._rectangle.contains(pointer.x, pointer.y);
    }

    clampScroll() {
        this.scrollY = Phaser.Math.Clamp(this.scrollY, this.top, this.bottom);
        this._endY = this.scrollY;
    }

    update(time, delta) {
        this.scrollY += this._speed * (delta / 1000);
        this._speed *= this.drag;
        if (Math.abs(this._speed) < this.minSpeed) {
            this._speed = 0;
        }
        this.clampScroll();

    }

    destroy() {
        this.emit(Events.DESTROY, this);
        window.removeEventListener('wheel', this.wheelHandler);
        this.removeAllListeners();
        this.matrix.destroy();
        this.culledObjects = [];
        if (this._customViewport) {
            //  We're turning off a custom viewport for this Camera
            this.sceneManager.customViewports--;
        }
        this._bounds = null;
        this.scene = null;
        this.scaleManager = null;
        this.sceneManager = null;

    }
}