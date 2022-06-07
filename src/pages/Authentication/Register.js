import React, { Component } from "react";
import PropTypes from "prop-types";
import { Alert, Card, CardBody, Col, Container, Row, Label } from "reactstrap";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

// action
import {
  apiError,
  registerUser,
  registerUserFailed,
} from "../../store/actions";

// Redux
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// import images
import profileImg from "../../assets/images/profile-img.png";
import logoImg from "../../assets/images/logo.svg";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      your_site: "",
      isLoading: false
    };
    this.registerUserData = this.registerUserData.bind(this)
  }
  componentDidMount() {
    this.props.apiError("");
    this.props.registerUserFailed("");
  }
  registerUserData(value) {
    let text = ".app.example.com";
    this.setState({ email: value.email, isLoading: true })
    setTimeout(() => {
      this.props.history.push({
        pathname: '/form-wizard',
        state: { email: value.email, your_site: value.your_site + text }
      })
      this.setState({ isLoading: false })
    }, 3000);
  }
  render() {
    return (
      <React.Fragment>
        <div className="home-btn d-none d-sm-block">
          <Link to="/" className="text-dark">
            <i className="bx bx-home h2" />
          </Link>
        </div>
        <div className="account-pages my-5 pt-sm-5">
          <Container>
            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <Card className="overflow-hidden">
                  <div className="bg-primary bg-soft">
                    <Row>
                      <Col className="col-7">
                        <div className="text-primary p-4">
                          <h5 className="text-primary">Free Register</h5>
                          <p>Get your free Skote account now.</p>
                        </div>
                      </Col>
                      <Col className="col-5 align-self-end">
                        <img src={profileImg} alt="" className="img-fluid" />
                      </Col>
                    </Row>
                  </div>
                  <CardBody className="pt-0">
                    <div>
                      <Link to="/">
                        <div className="avatar-md profile-user-wid mb-4">
                          <span className="avatar-title rounded-circle bg-light">
                            <img
                              src={logoImg}
                              alt=""
                              className="rounded-circle"
                              height="34"
                            />
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className="p-2">
                      <Formik
                        enableReinitialize={true}
                        initialValues={{
                          email: (this.state && this.state.email) || "",
                          your_site: (this.state && this.state.your_site) || "",
                        }}
                        validationSchema={Yup.object().shape({
                          email: Yup.string().email("Invalid Email").required("Please Enter Your Email"),
                          your_site: Yup.string().required("Please Enter Your Site"),
                        })}
                        // onChange={() => {
                        //   console.log('changing');
                        // }}
                        onSubmit={values => {
                          this.registerUserData(values);
                        }}
                      >
                        {({ errors, status, touched }) => (
                          <Form className="form-horizontal">
                            <div className="mb-3">
                              <Label for="email" className="form-label">
                                Work Email
                              </Label>
                              <Field
                                name="email"
                                type="email"
                                id="email"
                                className={
                                  "form-control" +
                                  (errors.email && touched.email
                                    ? " is-invalid"
                                    : "")
                                }
                              />
                              <ErrorMessage
                                name="email"
                                component="div"
                                className="invalid-feedback"
                              />

                            </div>

                            <div className="mb-2">
                              <Label for="region" className="form-label">
                                Select the data center region to store your Opsgenie specific product data:
                              </Label>
                            </div>

                            <div className="mb-3">
                              <div className="form-check" >
                                <Field
                                  name="region"
                                  type="radio"
                                  id="us11"
                                  className="form-check-input"
                                  value="US"
                                  checked={true}
                                />
                                <Label className="form-check-label" for="us11">
                                  US
                                </Label>
                              </div>

                              <div className="form-check" >
                                <Field
                                  name="region"
                                  type="radio"
                                  id="eu11"
                                  className="form-check-input"
                                  value="EU"
                                />
                                <Label className="form-check-label" for="eu11">
                                  EU
                                </Label>
                              </div>
                              <div className="alert alert-primary fade show mt-2" role="alert">
                                <i className="mdi mdi-alert-circle me-2"></i>
                                Some of your data is automatically stored in the US.
                              </div>
                            </div>


                            <div className="mb-3" style={{ position: "relative" }}>
                              <Label for="your_site" className="form-label">
                                Your Site
                              </Label>
                              <Field
                                name="your_site"
                                type="text"
                                id="your_site"
                                className={
                                  "form-control right-place" +
                                  (errors.your_site && touched.your_site
                                    ? " is-invalid"
                                    : "")
                                }
                              />
                              <span url="app.example.com"></span>
                              <ErrorMessage
                                name="your_site"
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>

                            <div className="mt-4 d-grid">
                              <button
                                className="btn btn-primary "
                                type="submit"
                              >
                                {this.state.isLoading ?
                                  <div className="spinner-border text-white" role="status" style={{ width: "1.2rem", height: "1.2rem" }}>
                                    <span className="sr-only">Loading...</span>
                                  </div>
                                  : 
                                  "Register"
                                  }

                              </button>
                            </div>

                            <div className="mt-4 text-center">
                              <p className="mb-0">
                                By clicking below, you agree to the Green {" "}
                                <Link to="#" className="text-primary">
                                  Terms of Services
                                </Link> {" "}
                                and {" "}
                                <Link to="#" className="text-primary">
                                  Privacy Policy
                                </Link>.{" "}
                              </p>
                            </div>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </CardBody>
                </Card>
                <div className="mt-5 text-center">
                  <p>
                    Already have an account ?{" "}
                    <Link to="/login" className="fw-medium text-primary">
                      {" "}
                      Login
                    </Link>{" "}
                  </p>
                  <p>
                    © {new Date().getFullYear()} Skote. Crafted with{" "}
                    <i className="mdi mdi-heart text-danger" /> by Themesbrand
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

Register.propTypes = {
  apiError: PropTypes.any,
  registerUser: PropTypes.func,
  registerUserFailed: PropTypes.any,
  registrationError: PropTypes.any,
  user: PropTypes.object,
};

const mapStateToProps = state => {
  const { user, registrationError, loading } = state.Account;
  return { user, registrationError, loading };
};

export default connect(mapStateToProps, {
  registerUser,
  apiError,
  registerUserFailed,
})(Register);
