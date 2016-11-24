const INCREMENT = "increment"
const DECREMENT = "decrement"
var counterReducer = (state,action)=> {
   var newState = Object.assign({},state)
   if(action.type == INCREMENT) {
     newState.count = state.count+1
   }
   return newState
}
var currState = {count:0}
currState = counterReducer(currState,{type:INCREMENT},)
currState = counterReducer(currState,{type:INCREMENT})
currState = counterReducer(currState,{type:INCREMENT})
currState = counterReducer(currState,{type:INCREMENT})
console.log(currState.count)
