import {game_object} from "../HUI_Game_Object/HUI_Game_Object.js"
import { controller } from "../Controller/index.js";
export class gameMap extends game_object{
    constructor(root){
        super();
        this.root = root;
        this.$canvas = $('<canvas  width="1500" height="700" tabindex = 0></canvas>');
        this.can = this.$canvas[0].getContext('2d');
        this.root.$kof.append(this.$canvas);
        this.$canvas.focus();
        this.controller = new controller(this.$canvas);
        this.root.$kof.append($(`<div class = 'head_use'>
        <div class = 'player_hp_0'><div class = 'blood'></div></div>
        <div class = 'game_time'>60</div>
        <div class = 'player_hp_1'><div class = 'blood'></div></div>
        </div>`));
        this.time_left = 60000;
        this.$time = this.root.$kof.find(`.game_time`);
    }
    start(){

    }
    update(){
        this.render();
        this.update_time();
    }
    render(){
        this.can.clearRect(0,0,this.can.canvas.width,this.can.canvas.height);
        // this.can.fillStyle = 'black';
        // this.can.fillRect(0,0,this.can.canvas.width, this.can.canvas.height);
    }
    update_time(){
        this.time_left -= this.timedelta;
        if(this.time_left <= 0) this.time_left =0;
        this.$time.text(parseInt(this.time_left / 1000));
    }
}