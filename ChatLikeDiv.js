import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import ChatComponent from './ChatComponent'

var messageReducer = (state={messages:[]},action)=>{
    var newState = state
    if(action.type == "ADD") {
        newState.messages.push(action.text)
    }
    return newState
}
class ChatCreateComponent extends Component{

    constructor(props) {
        super(props)
        this.state = {messages:[]}
    }
    render() {
        var chatComponents = this.state.messages.map((message,index)=><ChatComponent key={'message#0X'+index} msg = {message}/>)
        return <div>{chatComponents}</div>
    }
}
class TotalChatUi extends Component {
    constructor(props) {
        super(props)
        this.store = createStore(messageReducer)
    }
    componentDidMount() {
      this.store.subscribe(()=>{
          this.refs.ch.setState(this.store.getState())
      })
    }
    submit() {
      var tBox = this.refs.t1
      this.store.dispatch({type:'ADD',text:tBox.value})
      tBox.value = ""
    }

    render() {
        return (<div>
                  <ChatCreateComponent ref="ch"/>
                  <input ref="t1"/>
                  <button ref="b1" onClick={this.submit.bind(this)}>Submit</button>
              </div>)
    }
}
ReactDOM.render(<TotalChatUi/>,document.getElementById('chat'))
