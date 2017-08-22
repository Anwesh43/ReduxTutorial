import React,{Component} from 'react'
import {createStore} from 'redux'
const timerCreateReducer = (state={timers:[]},action) => {
    const newState = Object.assign({},state)
      if(action.type == "CREATE") {
          const timer = {id:state.timers.length,time:0}
          newState.timers.push(timer)
      }
      if(action.type == "UPDATE") {
          const timer = newState.timers[action.id]
          timer.time++
          newState.timers[action.id] = timer
      }
}
const timerStore = createStore(timerCreateReducer)

class TimerGroupComponent {
    constructor(props) {
        super(props)
        this.state = timerStore.getState()
    }
    componentDidMount() {
        timerStore.subscribe(()=>{
            this.setState(timerStore.getState())
        })
    }
    render() {
        <div>
        </div>
    }
}
