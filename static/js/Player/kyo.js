import {player} from "../Player/paler.js"
import {GIF } from "../gif/gif.js"
export class kyo extends player{
    constructor(root, info){
        super(root,info);
        this.init_animantions();
    }
    init_animantions(){
        let outer = this;
        for (let i = 0; i < 7; i ++) {
            var myGif = GIF();
            let offset_yy =  [0, -22, -22, -30, 0, 0, 0]
            myGif.load(`../static/images/player/kyo/${i}.gif`);
            this.animantions.set(i,
                {gif: myGif,
                frame_cnt : 0,//总图片数
                frame_rate : 5,//每五帧刷新一次
                offset_y : offset_yy[i],
                loaded : false,
                scale : 2,
            }
            );
            myGif.onload = function(){
                let obj = outer.animantions.get(i);
                obj.frame_cnt = myGif.frames.length;
                obj.loaded = true;
            }
        }
        }
}
