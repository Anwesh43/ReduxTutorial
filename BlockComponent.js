import React,{Component} from 'react'
import {createStore} from 'redux'
import ReactDOM from 'react-dom'
const w = window.innerWidth
const h = window.innerHeight
class BlockComponent extends Component {
  constructor(props) {
      super(props)
  }
  render() {
      var x = this.props.x
      var y = this.props.y
      var selected = this.props.selected
      var style = {backgroundColor:'#2196F3',borderRadius:'50%',width:'100px',height:'100px',position:'absolute',left:x,top:y}
      if(selected) {
          style.border = '2px dotted #FF5722'
      }
      return (<div style={style}>
              </div>)
  }
}
//Since a state associated to it we need a store for it lets say movement store
export default class MovingBlockComponent extends Component {
    constructor(props) {
      super(props)
      this.state = {x:w/2,y:h/2,tx:0,ty:0}
    }
    move() {
        this.movementStore.dispatch({type:'MOVE'})
    }
    changeInKey(keyCode) {
        if(this.props.selected) {
          switch(keyCode) {
             case 38:
                this.movementStore.dispatch({type:'MOVE_Y',y:-10})
                break;
             case 40:
                this.movementStore.dispatch({type:'MOVE_Y',y:10})
                break;
             case 37:
                this.movementStore.dispatch({type:'MOVE_X',x:-10})
                break;
             case 39:
                this.movementStore.dispatch({type:'MOVE_X',x:10})
                break;
             default:
                break;
          }
        }
    }
    componentDidMount() {
        //we need a reducer
        var currState = this.state
        function movementReducer(state=currState,action) {
            var newState = Object.assign({},state)
            if(action.type == 'MOVE_Y') {
                newState.ty = action.y
                newState.tx = 0
            }
            if(action.type == 'MOVE_X') {
                newState.tx = action.x
                newState.ty = 0
            }
            if(action.type == 'MOVE') {
                newState.x += newState.tx
                newState.y += newState.ty
            }
  
            return newState
        }
        this.movementStore = createStore(movementReducer)
        this.movementStore.subscribe(()=>{
            console.log(this.movementStore.getState())
            this.setState(this.movementStore.getState())
        })
    }
    render() {
        return <BlockComponent x={this.state.x} y = {this.state.y} selected = {this.props.selected}/>
    }
}

// This is a presentational component
// A presentational component shows the view we need a container component for it
// Let's create the container component here
