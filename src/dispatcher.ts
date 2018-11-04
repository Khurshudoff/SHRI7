export default class Dispatcher {
    _callbacks: Array<Function>;

    constructor(){
        this._callbacks = [];
    }

    dispatch(obj : object){
        for(let i = 0; i < this._callbacks.length; i++){
            if(this._callbacks[i](obj)){
                break;
            }
        }
    }

    register(callback : Function){
        this._callbacks.push(callback);
    }


}