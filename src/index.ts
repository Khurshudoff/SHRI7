import Dispatcher from './dispatcher'
let AppDispatcher = new Dispatcher();

interface Store{
    _events: any,
    currentPage: any,
    getAll: Function,
    trigger: Function,
    bind: Function,
    // unbind: Function
}
const ListStore: Store = {
    _events: {},
    currentPage: '',

    getAll: function() {
        return this.currentPage;
    },
    bind : function(event : string, fct : Function){
        this._events = this._events || {};
        this._events[event] = this._events[event]	|| [];
        this._events[event].push(fct);
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
        case 'change-page':
            ListStore.currentPage = payload.page;
            ListStore.trigger && ListStore.trigger( 'change' );
            break;
    }
    return true; // Needed for Flux promise resolution
});

const pageChanged = function(){
    const currentPage = ListStore.currentPage;

    const currentPageNode: HTMLElement | null = document.querySelector('#'+currentPage);

    document.querySelectorAll('.page').forEach(function(page: any){
        page.style.display = 'none';
    })

    currentPageNode!.style.display = 'block';
}

//function which is subscribing on 'change'
const componentDidMount = function() {  
    ListStore.bind( 'change', pageChanged );
}

const page1Button = document.querySelector('#page1_button')
const page2Button = document.querySelector('#page2_button')

const buttonCLick = function(event : any){
    event.preventDefault();

    AppDispatcher.dispatch({
        eventName: 'change-page',
        page: event.target.value
    })
}

componentDidMount();

page1Button && page1Button.addEventListener('click', buttonCLick);
page2Button && page2Button.addEventListener('click', buttonCLick);