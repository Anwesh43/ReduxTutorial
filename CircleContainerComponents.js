import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import ColorRectComponent from './ColorRectComponent'
import AnimatedCircComponent from './AnimatedCircComponent'
const colors = ["#81D4FA","#F57F17","#448AFF","#651FFF","#00897B","#00ACC1","#76FF03","#00B8D4","#6A1B9A","#c62828"]
export default class CircleContainerComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {circles:[],color:'#81D4FA'}
    }
    componentDidMount() {
        var initialState = this.state
        function circleReducer(state=initialState,action) {
            var newState = Object.assign({},state)
            if(action.type == "ADD_CIRCLE"){
                newState.circles.push({x:action.x,y:action.y,color:state.color})
            }
            if(action.type == "CHANGE_COLOR") {
                newState.color = action.color
            }
            return newState
        }

        var circleStore = createStore(circleReducer)
        circleStore.subscribe(()=>{
            this.setState(circleStore.getState())
        })
        window.onmousedown = (event)=> {
            var x = event.pageX,y = event.pageY
            if(event.pageY<550) {
                circleStore.dispatch({type:'ADD_CIRCLE',x,y})
            }
            else if(x>=0 && y>=550 && y<=600 && x<colors.length*50){
                var colorIndex = Math.floor(x/50)
                console.log(colorIndex)
                circleStore.dispatch({type:'CHANGE_COLOR',color:colors[colorIndex]})
            }
        }
    }
    render() {
        var circleDivs = this.state.circles.map((circle)=><AnimatedCircComponent x={circle.x} y={circle.y} color={circle.color}/>)
        var colorDivs = colors.map((color)=><ColorRectComponent color={color}/>)
        var colorDivStyle = {position:'absolute',top:550,left:0}
        return <div>
            <div>{circleDivs}</div>
            <div style={colorDivStyle}>
                {colorDivs}
            </div>
        </div>
    }
}
ReactDOM.render(<CircleContainerComponent/>,document.getElementById('d1'))
