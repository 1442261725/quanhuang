import{ gameMap} from "./game_map/index.js";
import{ kyo} from "./Player/kyo.js"
class kof{
    constructor(id){
        this.$kof = $('#' + id);
        this.gamemap = new gameMap(this);
        this.player = [
            new kyo(this,
                {
                    id : 0,
                    x : 200,
                    y : 400,
                    width : 100,
                    height : 180,
                }
            ),
            new kyo(this,
                {
                    id : 1,
                    x : 1200,
                    y : 400,
                    width : 100,
                    height : 180,
                }
            ),
        ]
    }
}

export {
    kof
}