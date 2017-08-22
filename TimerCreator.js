import React,{Component} from 'react'
import {createStore} from 'redux'
const w = window.innerWidth,h = window.innerHeight
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

class TimerGroupComponent extends Component{
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
        const timerComponents = this.state.timers.map((timer)=>(<TimerComponent time={timer.time}/>))
        <div>
            {timerComponents}
        </div>
    }
}
class TimerComponent extends Component{
    constructor(props) {
        super(props)
    }
    render() {
        return (<div style={{width:w/12,height:w/12,borderWidth:2,borderStyle:'solid',borderColor:'green',fontSize:30}}>{this.props.time}</div>)
    }
}
