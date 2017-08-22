import React,{Component} from 'react'
import {createStore} from 'redux'
import ReactDOM from 'react-dom'
const w = window.innerWidth,h = window.innerHeight
const timerCreateReducer = (state={timers:[]},action) => {
    const newState = Object.assign({},state)
      if(action.type == "CREATE") {
          const timer = {id:state.timers.length,time:0,x:action.x,y:action.y}
          newState.timers.push(timer)
      }
      if(action.type == "UPDATE") {
          console.log("updated")
          const timer = newState.timers[action.id]
          timer.time++
          newState.timers[action.id] = timer
      }
      return newState
}
const timerStore = createStore(timerCreateReducer)

class TimerGroupComponent extends Component{
    constructor(props) {
        super(props)
        this.state = {timers:[]}
    }
    componentDidMount() {
        timerStore.subscribe(()=>{
            this.setState(timerStore.getState())
        })
    }
    render() {
        const timerComponents = this.state.timers.map((timer)=>(<TimerComponent key={`timer_c_${timer.id}`} time={timer.time} x = {timer.x} y = {timer.y}/>))
        return <div>
            {timerComponents}
        </div>
    }
}
class TimerComponent extends Component{
    constructor(props) {
        super(props)
    }
    render() {
        return (<div style={{width:w/12,height:w/12,borderWidth:2,borderStyle:'solid',borderColor:'green',fontSize:30,position:'absolute',top:this.props.y-w/24,left:this.props.x-w/24,textAlignment:'center'}}>{this.props.time}</div>)
    }
}
const getCreateAction = (x,y) => {
    return {type:'CREATE',x,y}
}
const getUpdateAction = (index) => {
    return {type:'UPDATE',id:index}
}
class TimerCreateComponent extends Component  {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        var timers = 0
        window.onmousedown = (event) => {
            console.log(timers)
            timerStore.dispatch(getCreateAction(event.offsetX,event.offsetY))
            timers++
        }
        setInterval(()=>{
            console.log(timers)
            for(var i=0;i<timers;i++) {
                timerStore.dispatch(getUpdateAction(i))
            }
        },1000)
    }
    render() {
        return <div><TimerGroupComponent/></div>
    }
}
ReactDOM.render(<TimerCreateComponent/>,document.getElementById('app'))
