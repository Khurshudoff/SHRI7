class Dispatcher {
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
let AppDispatcher = new Dispatcher();


interface myObject extends Object{
    name: string
}
interface ListStore{
    _events: any,
    items: Array<myObject>,
    getAll: Function,
    trigger: Function,
    bind: Function,
    unbind: Function
}
const ListStore: ListStore = {
    _events: {},
    items: [],

    getAll: function() {
        return this.items;
    },
    bind : function(event : string, fct : Function){
        this._events = this._events || {};
        this._events[event] = this._events[event]	|| [];
        this._events[event].push(fct);
    },
    unbind: function(event : string, fct : Function){
        this._events = this._events || {};
        if( event in this._events === false  )	return;
        this._events[event].splice(this._events[event].indexOf(fct), 1);
    },
    trigger: function(event : string) {
        this._events = this._events || {};
        if( event in this._events === false  )	return;
        for(var i = 0; i < this._events[event].length; i++){
            this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
        }
    }
}

AppDispatcher.register( function( payload : any ) {
    switch( payload.eventName ) {
        case 'new-item':
           // We get to mutate data!
            ListStore.items.push( payload.newItem );
            ListStore.trigger && ListStore.trigger( 'change' );
            break;
    }
    return true; // Needed for Flux promise resolution
});

//function which is subscribing on 'change'
const componentDidMount = function() {  
    ListStore.bind && ListStore.bind( 'change', listChanged );
}
const button = document.querySelector('.button');
let ul = document.querySelector('.ul')

const createNewItem = function() {
    AppDispatcher.dispatch({
        eventName: 'new-item',
        newItem: { name: 'Marco' }
    })   
}

//function which is called when list changed
const listChanged = function() {
    ul = document.querySelector('.ul')
    const tmp_ul = document.createElement('ul');
    tmp_ul.classList.add('ul')

    ListStore.items.forEach(v => {
        const tmp_li = document.createElement('li');
        tmp_li.innerHTML = v.name

        tmp_ul.appendChild(tmp_li);
    })

    const ulParent = ul && ul.parentNode
    ulParent && ulParent.appendChild(tmp_ul)
    ul && ulParent && ulParent.removeChild(ul);
}

componentDidMount()

button && button.addEventListener('click', createNewItem)