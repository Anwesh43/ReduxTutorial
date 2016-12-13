import React,{Component} from 'react'
export default class ChatComponent extends Component{
    constructor(props) {
        super(props)
        this.state = {w:100,h:100,src:''}
    }
    componentDidMount() {
        var w = 224
        var msg = this.props.msg
        var tokens = msg.split(" ")
        msg = ""
        var totalY = 0
        var canvas = document.createElement('canvas')

        var h = 14
        var ctx = canvas.getContext('2d')

        ctx.font = `${h}px arial`
        console.log(ctx.font)


        var totalW = ctx.measureText(this.props.msg).width
        console.log(totalW)
        var chatMsgs = []
        tokens.forEach((token)=>{
           if(ctx.measureText(msg+" "+token).width > w) {

              chatMsgs.push({x:0,y:totalY,msg:msg})
              msg = ""
              totalY = totalY+h+h/5
              totalW = w
           }
           else {
              msg = msg+" "+token
           }
        })
        chatMsgs.push({x:0,y:totalY,msg:msg})

        console.log(chatMsgs)
        console.log(ctx.fillStyle)
        totalW = totalW+4*h
        var totalH = totalY+4*h
        canvas.width = totalW
        canvas.height = totalH+2*h
        ctx = canvas.getContext('2d')
        console.log(ctx)
        ctx.font = `${h}px arial`
        ctx.fillStyle = "#1976D2"
        ctx.fillRect(0,0,this.state.w,this.state.h)
        console.log(`${totalW} and ${totalH}`)
        ctx.fillStyle = "#1976D2"
        ctx.fillRect(0,0,totalW,totalH)
        ctx.fillStyle="white"
        ctx.save()
        ctx.translate(2*h,2*h)
        chatMsgs.forEach((chatMsgObj)=>{
            ctx.fillText(chatMsgObj.msg,chatMsgObj.x,chatMsgObj.y)
            console.log(chatMsgObj.msg)
        })
        ctx.restore()
        ctx.fillStyle = "#1976D2"
        ctx.beginPath()
        ctx.moveTo(totalW*0.8,totalH)
        ctx.lineTo(totalW,totalH+2*h)
        ctx.lineTo(totalW,totalH)
        ctx.lineTo(totalW*0.8,totalH)
        ctx.fill()

        this.setState({w:totalW,h:totalH,src:canvas.toDataURL()})
    }
    render() {
        var styleObj = {border:'1px dotted black',visibility:'hidden'}

        return <div><img src={this.state.src}/></div>
    }
}
