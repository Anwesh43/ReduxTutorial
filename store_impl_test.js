var todoReducer = (action,state={todos:[]})=>{
    var newState = Object.assign({},state)
    if(action.type=="ADD") {
        newState.todos.push(action.text)
    }
    return newState
}
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import createStore from './store_impl'
class ToDoComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {todos:[]}
    }
    componentDidMount() {
        var store = createStore(todoReducer)
        store.subscribe(()=>{
            console.log(store.getState())
            this.setState(store.getState())
        })
        var i = 0
        setInterval(()=>{
            console.log("dispatching")
            store.dispatch({type:'ADD',text:"task "+i})
            i++
        },3000)
    }
    render() {
        var todos = this.state.todos
        var todoDivs = todos.map((todo)=><div>{todo}</div>)
        return <div>{todoDivs}</div>
    }
}
ReactDOM.render(<ToDoComponent/>,document.getElementById('test'))
