let Hui_Game_Object =[];

class game_object{
    constructor(){
        Hui_Game_Object.push(this);
        this.timedelta = 0;
        this.has_start = false;
        
    }
    start(){
    }
    update(){

    }
    destroy(){
        for(let i in Hui_Game_Object)
        {
            if(Hui_Game_Object[i] === this)
            {
            Hui_Game_Object.splice(i,1);
            break;}
        }
    }
}
export{
    game_object
}
let last_timestamp;
let Hui_Game_Object_frame = (timestamp) => {
    for(let i of Hui_Game_Object)
    {
        if(!i.has_start)
        {
            i.start();
            i.has_start = true;
            
        }
        else{
            i.timedelta = timestamp - last_timestamp;
            i.update();
        }
    }
    last_timestamp = timestamp;
    requestAnimationFrame(Hui_Game_Object_frame);
}
requestAnimationFrame(Hui_Game_Object_frame);