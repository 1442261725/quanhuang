class controller{
    constructor($canvas){
        this.$canvas = $canvas;
        this.key_press = new Set();
        this.start();
    }
    start(){
        let outer = this;
        this.$canvas.keydown(
            function (e){
                outer.key_press.add(e.key);
            }
        );
        this.$canvas.keyup(
            function (e){
                outer.key_press.delete(e.key);
            }
        )
    }
}
export{
    controller
}