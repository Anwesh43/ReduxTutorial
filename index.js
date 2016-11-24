const INCREMENT = "increment"
const DECREMENT = "decrement"
var printCurrentCount = (state) => {
    console.log(`currentState is ${state.count}`)
}
var counterReducer = (state={count:0},action)=> {
   var newState = Object.assign({},state)
   switch(action.type) {
        case INCREMENT:
            newState.count = newState.count+1
            break
        case DECREMENT:
            newState.count = newState.count-1
            break
   }
   return newState
}
var currState = {count:0}
currState = counterReducer(currState,{type:INCREMENT},)
printCurrentCount(currState)
currState = counterReducer(currState,{type:INCREMENT})
printCurrentCount(currState)
currState = counterReducer(currState,{type:INCREMENT})
printCurrentCount(currState)
currState = counterReducer(currState,{type:INCREMENT})
printCurrentCount(currState)
import {createStore} from 'redux'
var store = createStore(counterReducer)
store.subscribe(()=>{
    document.body.innerHTML= `<p>count is ${store.getState().count}</p>`
})
var index = 0
setInterval(()=>{
    if(index%4 !=0) {
        store.dispatch({type:INCREMENT})
    }
    else {
        store.dispatch({type:DECREMENT})
    }
    index++
},1000)
