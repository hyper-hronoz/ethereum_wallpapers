class Scale {
    private isPressed: boolean;

    constructor() {
        this.isPressed = false;

        this.watchMouse();
    }

    private watchMouse(): void {
        window.addEventListener("mousedown", () => {
            this.isPressed = true;

            window.addEventListener("mousemove", () => {
                if (this.isPressed) {
                    console.log("Нажата")
                }
            })

            window.addEventListener("mouseup", () => {
                this.isPressed = false;
            })
        })
    }
}

export default Scale;