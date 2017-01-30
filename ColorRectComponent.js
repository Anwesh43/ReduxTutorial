import React,{Component} from 'react'
export default class ColorRectComponent extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        var style = {width:50,height:50,backgroundColor:this.props.color,float:'left'}
        return <div style={style}></div>
    }
}
