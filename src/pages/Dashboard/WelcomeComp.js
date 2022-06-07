import React, { Component } from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

import avatar1 from "../../assets/images/users/avatar-1.jpg";
import img from "../../assets/images/profile-img.png";


const getUserName = () => {
  if (localStorage.getItem("authUser")) {
    const obj = JSON.parse(localStorage.getItem("authUser"))
    return obj;
  }
}
class WelcomeComp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "Admin",
      profileImg: img
    }
  }

  componentDidMount() {
    // const userData = getUserName();
    // if (userData) {
    //   this.setState({ name: userData.username })
    // }
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser"))
      this.setState({ name: obj.data.frist_name, profileimg: obj.data.user_image ? obj.data.user_image : img })
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.success !== this.props.success) {
      // const userData = getUserName();
      // if (userData) {
      //   this.setState({ name: userData.username })
      // }
      if (localStorage.getItem("authUser")) {
        const obj = JSON.parse(localStorage.getItem("authUser"))
        this.setState({ name: obj.data.frist_name, profileimg: obj.data.user_image ? obj.data.user_image : img })
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <Card className="overflow-hidden">
          <div className="bg-primary bg-soft">
            <Row>
              <Col xs="7">
                <div className="text-primary p-3">
                  <h5 className="text-primary">Welcome Back !</h5>
                  <p>Skote Dashboard</p>
                </div>
              </Col>
              <Col xs="5" className="align-self-end">
                <img src={img} alt="" className="img-fluid" />
              </Col>
            </Row>
          </div>
          <CardBody className="pt-0">
            <Row>
              <Col sm="4">
                <div className="avatar-md profile-user-wid mb-4">
                  <img
                    src={this.state.profileimg}
                    alt=""
                    className="img-thumbnail rounded-circle"
                  />
                </div>
                <h5 className="font-size-15 text-truncate"> {this.state.name}</h5>
                <p className="text-muted mb-0 text-truncate">UI/UX Designer</p>
              </Col>

              <Col sm="8">
                <div className="pt-4">
                  <Row>
                    <Col xs="6">
                      <h5 className="font-size-15">125</h5>
                      <p className="text-muted mb-0">Projects</p>
                    </Col>
                    <Col xs="6">
                      <h5 className="font-size-15">$1245</h5>
                      <p className="text-muted mb-0">Revenue</p>
                    </Col>
                  </Row>
                  <div className="mt-4">
                    <Link
                      to="/profile"
                      className="btn btn-primary btn-sm"
                    >
                      View Profile {" "}<i className="mdi mdi-arrow-right ms-1"/>
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </React.Fragment>
    )
  }
}

export default WelcomeComp