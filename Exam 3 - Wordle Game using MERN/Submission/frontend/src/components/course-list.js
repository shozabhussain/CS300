import React from "react";
import axios from "axios";
import "../index.css";

export default class CourseList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course_code: [],
    };

    //Execution context

    // this.onChangeCourseCode = this.onChangeCourseCode.bind(this);
  }

  componentDidMount() {
    axios.get("http://localhost:9000/courses").then((res) => {
      console.log(res.data.CourseResponse[0]);
      this.setState({
        course_code: [res.data.CourseResponse[0], res.data.CourseResponse[1]],
      });
    });
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <ul>
          {this.state.course_code.map((elem, index) => (
            <li key={index}>{elem.code}</li>
          ))}
        </ul>
      </div>
    );
  }
}
