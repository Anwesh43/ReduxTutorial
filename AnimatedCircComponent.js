import React,{Component} from 'react'
import ReactDOM from 'react-dom'
export default class AnimatedCircComponent extends Component {
    constructor(props){
        super(props)
        this.state = {deg:0}
    }
    componentDidMount() {
        var canvas = this.refs.canvas
        var ctx = canvas.getContext('2d')
        ctx.fillStyle = this.props.color || "yellowgreen"
        ctx.beginPath()
        ctx.arc(canvas.width/2,canvas.height/2,canvas.width/4,0,2*Math.PI)
        ctx.fill()
        var c = setInterval(()=>{
          if(this.state.deg < 360) {
              this.setState({deg:this.state.deg+10})
              console.log(this.state.deg)
          }
          else {
              clearInterval(c)
          }
        },100)
    }
    render() {
        var style = {border:'1px dotted black',position:'absolute',left:this.props.x,top:this.props.y,transform:`rotate(${this.state.deg}deg)`,}
        return (<canvas ref = "canvas" width="100px" height="100px" style={style}></canvas>)
    }
}
