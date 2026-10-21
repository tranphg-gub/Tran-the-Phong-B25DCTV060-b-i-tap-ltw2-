import React from 'react'
import StudentManager from './StudentManager'
import Clock from './Clock'
export default class App extends React.Component {
  state = { visible: true, count: 0 }
  componentDidMount() { this.originalTitle = document.title; document.title = 'Số lần bấm: 0' }
  componentDidUpdate(previousProps, previousState) { if (previousState.count !== this.state.count) document.title = `Số lần bấm: ${this.state.count}` }
  componentWillUnmount() { document.title = this.originalTitle }
  render() { return <main><header><div><p>LẬP TRÌNH WEB</p><h1>Bài tập Buổi 8</h1></div></header><StudentManager/><section><h2>Đồng hồ và lifecycle</h2><button onClick={() => this.setState(previous => ({ visible: !previous.visible }))}>{this.state.visible ? 'Ẩn đồng hồ' : 'Hiện đồng hồ'}</button>{this.state.visible && <Clock/>}<p>Mở Console để xem constructor, render, componentDidMount, componentDidUpdate và componentWillUnmount. Ẩn đồng hồ sẽ dọn bộ hẹn giờ.</p><button onClick={() => this.setState(previous => ({ count: previous.count + 1 }))}>Đã bấm {this.state.count} lần</button><p>Tiêu đề tab thay đổi theo số lần bấm nút đếm.</p></section><section><h2>Chuẩn bị Buổi 9: Class và Hooks</h2><ol><li>Cập nhật state dựa trên giá trị cũ cần dùng setState dạng hàm; đọc this.state rồi tăng liên tiếp dễ mất lượt cập nhật khi React gộp các thay đổi.</li><li>Logic đồng hồ nằm ở nhiều phương thức: tạo timer trong componentDidMount và dọn trong componentWillUnmount. Quên dọn có thể để timer tiếp tục chạy sau khi ẩn.</li><li>Cập nhật document.title cần xử lý cả lần mount và các lần count thay đổi. componentDidUpdate phải so sánh count để tránh chạy tác vụ không cần thiết mỗi lần render.</li></ol></section></main> }
}
