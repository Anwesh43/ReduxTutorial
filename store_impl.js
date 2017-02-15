class Store {
    constructor(reducer){
        this.state = undefined
        this.reducer = reducer
    }
    subscribe(cb) {
        this.cb = cb
    }
    getState() {
        return this.state
    }
    dispatch(action) {
        if(this.state == undefined) {
            this.state = this.reducer(action)
        }
        else {
           this.state = this.reducer(action,this.state)
        }
        this.cb()
    }
}
const createStore = (reducer)=>{
    return new Store(reducer)
}
export default createStore
