import React,{Component} from 'react'
export default class CircleQuoteComponent extends Component {
    constructor(props) {
      super(props)
    }
    render() {
      var divStyle = {background:'green',width:200,height:200,borderRadius:'50%',floating:'top',textAlign:'center'}
      var textStyle = {color:'white',fontSize:20,textAlign:'center',padding:75}
      return (<div style={divStyle}>
          <p style={textStyle}>
              {this.props.text}
          </p>
      </div>)
    }
}
