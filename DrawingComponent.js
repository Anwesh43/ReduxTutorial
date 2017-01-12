import React,{Component} from 'react'
import {createStore} from 'redux'
import ReactDOM from 'react-dom'
import CanvasComponent from './CanvasComponent'
class DrawingComponent  extends Component {
    constructor(props) {
        super(props)
        this.state = {canvasDoms:[]}
    }
    componentDidMount() {
        var prevState = this.state
        var canvasReducer = (state=prevState,action) => {
            var newState = Object.assign({},prevState)
            if(action.type == 'ADD') {
                newState.canvasDoms.push({current:true})
            }
            if(action.type == 'DELETE') {
                var finalIndex = newState.canvasDoms.length-1
                if(finalIndex>=0) {
                    newState.canvasDoms.splice(finalIndex,1)
                }
            }
            return newState
        }
        var canvasStore = createStore(canvasReducer)
        canvasStore.subscribe(()=>{
            this.setState(canvasStore.getState())
        })
        var addButton = this.refs.add
        var deleteButton = this.refs.delete
        addButton.onclick = ()=> {
            canvasStore.dispatch({type:'ADD'})
        }
        deleteButton.onclick = ()=>{
            canvasStore.dispatch({type:'DELETE'})
        }
    }
    render() {
        var canvasDomsJSX = this.state.canvasDoms.map((canvas)=><CanvasComponent/>)
        return <div>
            <button ref="add">Add</button>
            <button ref="delete">Delete</button>
            {canvasDomsJSX}
        </div>
    }
}
ReactDOM.render(<DrawingComponent/>,document.getElementById('drawing-component'))
