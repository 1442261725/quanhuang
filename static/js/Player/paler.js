import { game_object } from "../HUI_Game_Object/HUI_Game_Object.js";

class player extends game_object{
    constructor(root, info){
        super();
        this.root = root;
        this.id = info.id;
        this.x = info.x;
        this.y = info.y;
        this.width = info.width;
        this.height = info.height;
        this.color = info.color;
        this.floor = 400;

        this.vx = 0;
        this.vy = 0;
        this.g = 100;
        this.speedx = 400;
        this.speedy = -2000;
        this.derection = 1;

        this.station = 0;//状态
        this.animantions = new Map();
        this.framecurrent = 0;

        this.can = this.root.gamemap.can;//动画帧
        this.presskeys = this.root.gamemap.controller.key_press;

        this.hp = 100;
        this.$hp = this.root.$kof.find(`.player_hp_${this.id}`).find(`.blood`);
    }
    start(){

    }
    update(){
        this.derection_controll();
        this.update_control();
        this.strike();
        this.move();
        this.render();
        this.update_stack();
    }
    update_control(){
        
        let w,a,d,j;
        if(this.id == 0)
        {
        w = this.presskeys.has('w');
        a = this.presskeys.has('a');
        d = this.presskeys.has('d');
        j = this.presskeys.has('j');}
        else {
        w = this.presskeys.has('ArrowUp');
        a = this.presskeys.has('ArrowLeft');
        d = this.presskeys.has('ArrowRight');
        j = this.presskeys.has('Enter');
        }
        if(this.station == 0 || this.station == 1)
        {
            if(j){
                this.station = 4;
                this.framecurrent = 0;
                this.vx = 0;
            }
            else if(w){
                if(d){
                    this.vx = 400;
                }
                else if(a){
                    this.vx = -400;
                }
                else{
                    this.vx = 0;
                }
                this.vy = this.speedy;
                this.station = 3;
                this.framecurrent = 0;
            }
            else if(d){
                this.vx = this.speedx;
                this.station = 1;
            }
            else if(a){
                this.vx = -this.speedx;
                this.station = 1;
            }
            else{
                this.vx = 0;
                this.station = 0;
            }
        }
        if(this.station == 3)
        {
            if(d){
                this.vx = this.speedx;
                if(this.y == this.floor )this.station = 1;
            }
            else if(a){
                this.vx = -this.speedx;
                if(this.y == this.floor)this.station = 1;
            }
            else{
                this.vx = 0;
                if(this.y == this.floor)this.station = 0;
            }
        }
    }
    update_stack(){
        if(this.root.gamemap.time_left <= 0 && this.station != 6){
            this.hp = 0;
            this.station = 6;
            this.framecurrent = 0;
            this.vx = 0;
            this.vy = 0;
            this.$hp.animate({
                width : this.$hp.parent().width()* this.hp /100
             }, 2000)}
        if(this.station == 4 && this.framecurrent == 16){
            let players = this.root.player;
            let me = players[this.id],you = players[1 - this.id];
            let me_stack, you_onstack;
            if(this.derection == 1){
                me_stack = {
                    x1 : me.x + me.width,
                    x2 : me.x + me.width + 110,
                    y1 : me.y + 40,
                    y2 : me.y + 40 + 30,
                }
                you_onstack = {
                    x1 : you.x,
                    x2 : you.x + you.width,
                    y1 : you.y,
                    y2 : you.y + you.height,
                }
            }
            else {
                me_stack = {
                    x1 : me.x - 110,
                    x2 : me.x,
                    y1 : me.y + 40,
                    y2 : me.y + 40 + 30,
                }
                you_onstack = {
                    x1 : you.x,
                    x2 : you.x + you.width,
                    y1 : you.y,
                    y2 : you.y + you.height,
                }
            }
            if(this.is_onstack(me_stack, you_onstack ) && you.station != 6){
                you.station = parseInt(5);
                you.framecurrent = 0;
                you.hp -=10;
                you.$hp.animate({
                   width : you.$hp.parent().width()* you.hp /100
                })
                if(you.hp <= 0){
                    you.station = 6;
                    you.framecurrent = 0;
                }
            }
        }
    }
    is_onstack (me_stack, you_onstack ){
        if(Math.max(me_stack.x1, you_onstack.x1) > Math.min(me_stack.x2, you_onstack.x2))return false;
        if(Math.max(me_stack.y1, you_onstack.y1) > Math.min(me_stack.y2, you_onstack.y2)){ return false;}
        return true;
    }
    derection_controll(){
        if(this.station == 6)return;
        let players = this.root.player;
        if(players[0] && players[1]){
            let me = this;
            let you = players[ 1 - this.id ];
            if(me.x < you.x) me.derection = 1;
            else me.derection = -1; 
        }
    }
    render(){
        let station = this.station;
        if(this.derection * this.vx < 0 && this.station === 1){station = 2;}
        let obj = this.animantions.get(this.station);
        let frame_rate = obj.frame_rate;
        if(obj && obj.loaded)
        {
            if(this.station === 3){
                frame_rate = 3;
            }
            if(this.derection > 0){
            let t = parseInt(this.framecurrent / frame_rate) % obj.frame_cnt;
            let image = obj.gif.frames[t].image;
            this.can.drawImage(image,this.x, this.y + obj.offset_y, image.width * obj.scale, image.height *obj.scale);
            }
            else
                {
                this.can.save();
                this.can.scale(-1, 1);
                this.can.translate(-this.root.gamemap.$canvas.width(), 0);
                let t = parseInt(this.framecurrent / frame_rate) % obj.frame_cnt;
                let image = obj.gif.frames[t].image;
                this.can.drawImage(image, this.root.gamemap.$canvas.width() - this.x - this.width, this.y + obj.offset_y, image.width * obj.scale, image.height *obj.scale);
                
                this.can.restore();
                }
                
            if((this.station ===4 || this.station ==5 ||this.station == 6) && parseInt(this.framecurrent / obj.frame_rate) == obj.frame_cnt - 1){
                if(this.station == 6){this.framecurrent --;}
                else
                {this.station = 0;}

            }
                
        }
    this.framecurrent++;
    }
    strike(){
        let players = this.root.player;
        let a = players[this.id],b = players[1 - this.id];
        let r1 = {
            x1 : a.x,
            x2 : a.x + a.width,
            y1 : a.y,
            y2 : a.y + a.height
        }
        let r2 = {
            x1 : b.x,
            x2 : b.x + b .width,
            y1 : b.y,
            y2 : b.y + b.height
        }
        if(this.is_onstack(r1, r2)){
            if( a.vx * a.derection > 0)
            {
                a.vx *=0.5;
                b.x += a.vx * this.timedelta/1000;
            }
        }
        else if(this.is_onstack2(r1, r2)){
            a.floor = 400 -b.height - 1; 
        }
        else {
            this.floor = 400;
        }
    }  
     
    is_onstack2 (me_stack, you_onstack ){
        if(Math.max(me_stack.x1, you_onstack.x1) < Math.min(me_stack.x2, you_onstack.x2) 
            && me_stack.y2 <  you_onstack.y1)return true;
        return false;
    }
    move(){
        if(this.station == 3 || this.station == 1 || this.station == 6)
        this.vy += this.g;
        this.x += this.vx * this.timedelta/1000;
        this.y += this.vy * this.timedelta/1000;
        if(this.y > this.floor) {this.vy = 0, this.y =this.floor;}
        if(this.x <= 0){this.x = 0;}
        else if(this.x >= 1500-this.width){this.x = 1500-this.width;}
    }
}
export{
    player
}