import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import MovingBlockComponent from './BlockComponent'
class GameComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {balls:[]}
    }
    componentDidMount() {
        var currState = this.state
        function ballReducer(state = currState,action) {
            var newState = Object.assign({},state)
            for(var i=0;i<state.balls.length;i++) {
                newState.balls[i].selected = false
            }
            if(action.type == "CHANGE") {
                newState.balls[action.j].selected = true
            }
            if(action.type == "ADD") {
               newState.balls.push({selected:true,ref:'ball'+state.balls.length})
            }
            return newState
        }
        var ballStore = createStore(ballReducer)
        ballStore.subscribe(()=>{
            console.log(ballStore.getState())
            this.setState(ballStore.getState())
        })
        window.onkeydown = (event)=> {
          this.state.balls.forEach((ball,index)=>{
              var ballObj = this.refs[ball.ref]
              console.log(ballObj)
              ballObj.changeInKey(event.keyCode)
          })
        }
        window.onmousedown = (event) =>{
            var x = event.pageX ,y = event.pageY
            var touch = false,touchIndex = 0
            this.state.balls.forEach((ball,index)=>{
                var ballObj = this.refs[ball.ref]
                if(x>=ballObj.state.x && x<=ballObj.state.x+100 && y>=ballObj.state.y && y<=ballObj.state.y+100) {
                    touch = true
                    touchIndex = index
                }
            })
            if(touch) {
                ballStore.dispatch({type:'CHANGE',j:touchIndex})
            }
            else {
                ballStore.dispatch({type:'ADD'})
            }
        }
        setInterval(()=>{
          this.state.balls.forEach((ball,index)=>{
              var ballObj = this.refs[ball.ref]
              console.log(ballObj)
              ballObj.move()
          })
        },100)
    }
    render() {
        var ballDoms = this.state.balls.map((ball,index)=><MovingBlockComponent ref={ball.ref} selected={ball.selected}/>)
        return <div>
                  {ballDoms}
              </div>
    }
}
ReactDOM.render(<GameComponent/>,document.getElementById('main-container'))
