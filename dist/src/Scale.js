class Scale {
    constructor() {
        this.isPressed = false;
        this.watchMouse();
    }
    watchMouse() {
        window.addEventListener("mousedown", () => {
            this.isPressed = true;
            window.addEventListener("mousemove", () => {
                if (this.isPressed) {
                    console.log("Нажата");
                }
            });
            window.addEventListener("mouseup", () => {
                this.isPressed = false;
            });
        });
    }
}
export default Scale;
