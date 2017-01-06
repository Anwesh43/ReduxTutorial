import CircleQuoteComponent from './CircleQuotes'
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
class CircleQuoteBox extends Component {
    constructor(props) {
      super(props)
      this.state = {quotes:[]}
    }
    componentDidMount() {
        var textBox = this.refs.textbox
        var button = this.refs.button
        var quoteReducer = function(state={quotes:[]},action) {
            var newState = Object.assign({},state)
            if(action.type == 'ADD') {
                newState.quotes.push({text:action.text})
            }
            return newState
        }
        var store = createStore(quoteReducer)
        store.subscribe(()=>{
            this.setState(store.getState())
            console.log(this.state.quotes)
        })
        button.onclick = () => {
            console.log('clicked')
            console.log(store.getState())
            if(textBox.value.trim() != "") {
               store.dispatch({type:'ADD',text:textBox.value.trim()})
            }
        }
    }
    render() {
      var circleQuotes = this.state.quotes.map((quote,index)=>{return <CircleQuoteComponent key={'#quote'+index} text={quote.text}/>})
      console.log(circleQuotes)
      return   (<div>
                <input type='text' ref="textbox"/>
                <p></p>
                <button ref="button">
                  add
                </button>
                <div>{circleQuotes}</div>

            </div>)
    }
}
ReactDOM.render(<CircleQuoteBox/>,document.getElementById('compo'))
