import React from 'react'
export default class Clock extends React.Component {
  constructor(props) { super(props); this.state = { now: new Date() }; console.log('Clock: constructor') }
  componentDidMount() { console.log('Clock: componentDidMount'); this.timer = window.setInterval(() => this.setState({ now: new Date() }), 1000) }
  componentDidUpdate() { console.log('Clock: componentDidUpdate') }
  componentWillUnmount() { console.log('Clock: componentWillUnmount'); window.clearInterval(this.timer) }
  render() { console.log('Clock: render'); return <p className="clock">{this.state.now.toLocaleTimeString('vi-VN')}</p> }
}
