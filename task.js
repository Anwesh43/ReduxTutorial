import React,{Component} from 'react'
import ReactDOM from 'react-dom'
const TODO = "todo"
const REMOVE = "remove"
const VISIBILITY_FILTER = "visibility_filter"
const VISIBLE = true
const INVISIBLE = false
var createTodoAction = (text) =>{
    return {type:TODO,text}
}
var createRemoveAction = (index) => {
    return {type:REMOVE,index}
}
var createVisibilityFilterAction = (index,visibility) => {
    return {type:VISIBILITY_FILTER,visibility,index}
}
function taskReducer(state={todos:[]},action) {
    var newState = Object.assign({},state)
    switch(action.type) {
        case TODO:
            newState.todos.push({text:action.text,visibility:VISIBLE})
            break
        case REMOVE:
            if(newState.todos.length > 0) {
                newState.todos.splice(action.index,1)
            }
            break
        case VISIBILITY_FILTER:
            if(newState.todos.length > 0 ){
                newState.todos[action.index].visibility = action.visibility
            }
            break
    }
    return newState
}
class PresentationalComponent extends Component {
    constructor(props) {
        super(props)

    }
    componentDidMount(){
        this.refs.add.onclick = ()=>{
            this.props.handler.handle(TODO,"Hello",-1)
            console.log(this.refs)
            var buttonKeys = Object.keys(this.refs).filter((key)=>key.startsWith("button"))
            buttonKeys.forEach((buttonKey,index)=>{
              this.refs[buttonKey].onclick = () =>{console.log(index);this.props.handler.handle(REMOVE,"",index)}

            })
        }
    }
    render() {
        var tasksVisible = this.props.todos.filter((task)=>task.visibility)
        var styleSheet = {border:'1px dotted black',width:'100px',height:'30px',textAlign:'center',textIndent:'5px'}
        var tasksHtml = tasksVisible.map((task,index)=><div key={'task'+index}><p style={styleSheet}>{task.text}</p><button ref={'button'+index}>remove</button></div>)
        return (<div>{tasksHtml}<p><button ref="add">Add</button></p></div>)
    }
}
class StateComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {todos:[]}
        this.handler = {}
        this.handler.handle = (type,text,index) => {
            var action = createTodoAction(text)
            if(type == REMOVE) {
               action = createRemoveAction(index)
            }
            this.setState(taskReducer(this.state,action))
        }
    }
    componentDidMount() {
        this.handler.handle = (type,text,index) => {
            var action = createTodoAction(text)
            if(type == REMOVE) {
               action = createRemoveAction(index)
            }
            this.setState(taskReducer(this.state,action))
        }
    }
    render() {
        return <PresentationalComponent todos={this.state.todos} handler={this.handler}/>
    }
}
ReactDOM.render(<StateComponent/>,document.getElementById('container'))
