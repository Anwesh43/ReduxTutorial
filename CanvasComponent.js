import React,{Component} from 'react'

export default class CanvasComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {drawingObjects:[]}
    }
    componentDidMount() {
       var canvas = this.refs.canvas
       var context = canvas.getContext('2d')
       var drawingObjects = this.state.drawingObjects || []
       var isDown = false
       var drawInCanvas = ()=>{
          context.clearRect(0,0,canvas.width,canvas.height)
          context.strokeStyle = "black"
          context.strokeRect(0,0,canvas.width,canvas.height)
          drawingObjects.forEach((drawingObject)=>{
              drawingObject.draw(context)
          })
       }
       drawInCanvas()
      //  setInterval(()=>{
      //    drawInCanvas()
      //  },50)
       canvas.onmousedown = (event)=>{
          if(!isDown) {
              var drawingObject = {}
              drawingObject.x_array=[event.offsetX]
              drawingObject.y_array=[event.offsetY]
              drawingObject.isFill=false
              drawingObject.draw = function(ctx) {
                  ctx.beginPath()
                  for(var i=0;i<this.x_array.length;i++) {
                      var x = this.x_array[i]
                      var y = this.y_array[i]
                      if(i == 0) {
                          ctx.moveTo(x,y)
                      }
                      else {
                          ctx.lineTo(x,y)
                      }
                  }
                  if(this.isFill) {
                      ctx.fillStyle = "#3F51B5"
                      ctx.fill()
                  }
                  else {
                      ctx.stroke()
                  }
              }
              drawingObjects.push(drawingObject)
              this.setState({drawingObjects})
              isDown = true
          }
          drawInCanvas()
       }
       canvas.onmousemove = (event)=>{
          var l = drawingObjects.length
          if(isDown && l>0) {
              var drawingObject = drawingObjects[l-1]
              drawingObject.x_array.push(event.offsetX)
              drawingObject.y_array.push(event.offsetY)
              drawingObjects[l-1] = drawingObject
              this.setState({drawingObjects})
              drawInCanvas()
          }

       }
       canvas.onmouseup = ()=>{
         var l = drawingObjects.length
          if(isDown && l>0) {
                var drawingObject = drawingObjects[l-1]
                drawingObject.isFill = true
                drawingObjects[l-1] = drawingObject
                isDown = false
                this.setState({drawingObjects})
                drawInCanvas()
          }
       }
    }
    render() {

        return (<canvas ref="canvas" width='300px' height='300px'>
            </canvas>)
    }
}
