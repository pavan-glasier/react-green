import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Collapse,
  Container,
  FormGroup,
  Input,
  Label,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";

import classnames from "classnames";
import { Link } from "react-router-dom";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import IsAuth from "pages/Authentication/IsAuth";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import PhoneInputWithCountrySelect from "react-phone-number-input";

class FormWizard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      col1: true,
      col2: false,
      col3: false,
      col4: false
    };
    console.log("props", this.props);
    this.toggleTab.bind(this);
    this.toggleTabVertical.bind(this);
    this.submitFormHandle.bind(this);
    this.setValue.bind(this);

    this.t_col1 = this.t_col1.bind(this);
    this.t_col2 = this.t_col2.bind(this);
    this.t_col3 = this.t_col3.bind(this);
    this.t_col4 = this.t_col4.bind(this);
  }

  t_col1() {
    this.setState({
      col1: !this.state.col1,
      col2: false,
      col3: false,
      col4: false,
    });
  }

  t_col2() {
    this.setState({
      col1: false,
      col2: !this.state.col2,
      col3: false,
      col4: false,
    });
  }

  t_col3() {
    this.setState({
      col1: false,
      col2: false,
      col3: !this.state.col3,
      col4: false,
    });
  }
  t_col4() {
    this.setState({
      col1: false,
      col2: false,
      col3: false,
      col4: !this.state.col4,
    });
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      if (tab >= 1 && tab <= 4) {
        var modifiedSteps = [...this.state.passedSteps, tab];
        this.setState({
          activeTab: tab,
          passedSteps: modifiedSteps
        });
      }
    }
  }

  toggleTabVertical(tab) {
    if (this.state.activesTab !== tab) {
      if (tab >= 1 && tab <= 4) {
        var modifiedSteps = [...this.state.passedStepsVertical, tab];
        this.setState({
          activeTabVartical: tab,
          passedStepsVertical: modifiedSteps
        });
      }
    }
  }

  submitFormHandle(value) {
    console.log(value);
  }

  componentDidMount() {
    if (localStorage.getItem('authUser')) {
      this.props.history.push("/register");
    }
  }
  setValue(e) {
    console.log(e)
  }


  render() {
    //meta title
    document.title = "Form Wizard | React Admin & Dashboard Template";
    return (
      <React.Fragment>
        <div className="home-btn d-none d-sm-block">
          <Link to="/" className="text-dark">
            <i className="bx bx-home h2" />
          </Link>
        </div>
        <div className="page-content">
          <Container fluid={false}>
            <Row>
              <Card>
                <CardBody>
                  <Row>
                    <Formik
                      enableReinitialize={true}
                      initialValues={{
                        phone: (this.state && this.state.phone) || "",
                        lastname: (this.state && this.state.lastname) || "",
                      }}
                      validationSchema={Yup.object().shape({
                        phone: Yup.string().required("Please Enter Phone Number"),
                        lastname: Yup.string().required("Please Enter Last Name"),
                      })}
                      onSubmit={values => {
                        this.submitFormHandle(values);
                        console.log("values", values)
                      }}
                    >
                      {({ errors, status, touched }) => (
                        <Form>
                          <Col lg={12}>
                            <CardTitle className="h4">Quick start guide</CardTitle>
                            <p className="card-title-desc">
                              Welcome to Green! Thanks for signing up for your free green trial.<br></br>
                              We are going to take you through a few minutes setup to enable you to experience the essential features and benefits of Green.
                            </p>

                            <div className="accordion" id="accordion">
                              <div className="accordion-item">
                                <h2 className="accordion-header" id="">
                                  <button
                                    className={"accordion-button fw-medium flex-wrap" + (!this.state.col1
                                      ? " collapsed"
                                      : "")}
                                    type="button"
                                    onClick={this.t_col1}
                                    style={{ cursor: "pointer", fontSize: "1.1rem" }}
                                  >
                                    <i className="bx bxs-user-detail m-0 me-2" />
                                    Configure your profile
                                    <span>Set up your profile by adding your contact information and notification preferences.</span>
                                  </button>
                                </h2>

                                <Collapse
                                  isOpen={this.state.col1}
                                  className="accordion-collapse"
                                  id="collapseOne"
                                >
                                  <div className="accordion-body">
                                    <div className="text-muted">
                                      <Row>
                                        <Col lg="6">
                                          <div className="mb-3">
                                            <Label for="phone">
                                              SMS/Phone Number
                                            </Label>
                                            <Field
                                              type="text"
                                              name="phone"
                                              id="phone"
                                              placeholder="000 000 000"
                                              className={
                                                "form-control" +
                                                (errors.phone && touched.phone
                                                  ? " is-invalid"
                                                  : "")
                                              }
                                            />
                                            {/* <PhoneInput
                                              name="phone"
                                              id="phone"
                                              placeholder="000 000 000"
                                              onChange={this.setValue}
                                              className={
                                                "" +
                                                (errors.phone && touched.phone
                                                  ? " is-invalid"
                                                  : "")
                                              }
                                            /> */}
                                            <ErrorMessage
                                              name="phone"
                                              component="div"
                                              className="invalid-feedback"
                                            />
                                          </div>

                                        </Col>

                                        <Col lg="6">
                                          <div className="mb-3">
                                            <Label for="lastname">
                                              Last name
                                            </Label>
                                            <Field
                                              type="text"
                                              name="lastname"
                                              id="lastname"
                                              placeholder="Enter Your Last Name"
                                              className={
                                                "form-control" +
                                                (errors.lastname && touched.lastname
                                                  ? " is-invalid"
                                                  : "")
                                              }
                                            />
                                            <ErrorMessage
                                              name="lastname"
                                              component="div"
                                              className="invalid-feedback"
                                            />
                                          </div>
                                        </Col>

                                      </Row>
                                    </div>
                                  </div>
                                </Collapse>
                              </div>
                              <div className="accordion-item">
                                <h2 className="accordion-header" id="">
                                  <button
                                    className={"accordion-button fw-medium flex-wrap" + (!this.state.col2
                                      ? " collapsed"
                                      : "")}
                                    type="button"
                                    onClick={this.t_col2}
                                    style={{ cursor: "pointer", fontSize: "1.1rem" }}
                                  >
                                    <i className="bx bxs-group m-0 me-2" />
                                    Set up your team
                                    <span>Organize your users into teams and share only what&apos;s relevant to them.</span>
                                  </button>
                                </h2>

                                <Collapse
                                  isOpen={this.state.col2}
                                  className="accordion-collapse"
                                >
                                  <div className="accordion-body">
                                    <div className="text-muted">
                                      <strong className="text-dark">
                                        This is the second item&apos;s accordion body.
                                      </strong>{" "}
                                      It is hidden by default, until the collapse
                                      plugin adds the appropriate classes that we use
                                      to style each element. These classes control the
                                      overall appearance, as well as the showing and
                                      hiding via CSS transitions. You can modify any
                                      of this with custom CSS or overriding our
                                      default variables. It&apos;s also worth noting
                                      that just about any HTML can go within the{" "}
                                      <code>.accordion-body</code>, though the
                                      transition does limit overflow.
                                    </div>
                                  </div>
                                </Collapse>
                              </div>
                              <div className="accordion-item">
                                <h2 className="accordion-header" id="">
                                  <button
                                    className={"accordion-button fw-medium flex-wrap" + (!this.state.col3
                                      ? " collapsed"
                                      : "")}
                                    type="button"
                                    onClick={this.t_col3}
                                    style={{ cursor: "pointer", fontSize: "1.1rem" }}
                                  >
                                    <i className="bx bxs-cog m-0 me-2" />
                                    Intergrate with Jira and your monitoring tools
                                    <span>Green has out-of-box integration with over 200 monitoring, Dev and IT tools.</span>
                                  </button>
                                </h2>
                                <Collapse
                                  isOpen={this.state.col3}
                                  className="accordion-collapse"
                                >
                                  <div className="accordion-body">
                                    <div className="text-muted">
                                      <strong className="text-dark">
                                        This is the third item&apos;s accordion body.
                                      </strong>{" "}
                                      It is hidden by default, until the collapse
                                      plugin adds the appropriate classes that we use
                                      to style each element. These classes control the
                                      overall appearance, as well as the showing and
                                      hiding via CSS transitions. You can modify any
                                      of this with custom CSS or overriding our
                                      default variables. It&apos;s also worth noting
                                      that just about any HTML can go within the{" "}
                                      <code>.accordion-body</code>, though the
                                      transition does limit overflow.
                                    </div>
                                  </div>
                                </Collapse>
                              </div>

                              <div className="accordion-item">
                                <h2 className="accordion-header" id="">
                                  <button
                                    className={"accordion-button fw-medium flex-wrap" + (!this.state.col4
                                      ? " collapsed"
                                      : "")}
                                    type="button"
                                    onClick={this.t_col4}
                                    style={{ cursor: "pointer", fontSize: "1.1rem" }}
                                  >
                                    <i className="bx bxs-chat m-0 me-2" />
                                    Intergrate with your chat tool
                                    <span>Easily build bi-directional intergrations with popular Chat/Collboration tools.</span>
                                  </button>
                                </h2>
                                <Collapse
                                  isOpen={this.state.col4}
                                  className="accordion-collapse"
                                >
                                  <div className="accordion-body">
                                    <div className="text-muted">
                                      <strong className="text-dark">
                                        This is the third item&apos;s accordion body.
                                      </strong>{" "}
                                      It is hidden by default, until the collapse
                                      plugin adds the appropriate classes that we use
                                      to style each element. These classes control the
                                      overall appearance, as well as the showing and
                                      hiding via CSS transitions. You can modify any
                                      of this with custom CSS or overriding our
                                      default variables. It&apos;s also worth noting
                                      that just about any HTML can go within the{" "}
                                      <code>.accordion-body</code>, though the
                                      transition does limit overflow.
                                    </div>
                                  </div>
                                </Collapse>
                              </div>
                            </div>
                          </Col>

                          <Col>
                            <div className="mt-4 d-grid">
                              <button
                                className="btn btn-primary btn-block"
                                type="submit"
                              >
                                Submit
                              </button>
                            </div>
                          </Col>
                        </Form>
                      )}
                    </Formik>
                  </Row>
                </CardBody>
              </Card>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default FormWizard;
