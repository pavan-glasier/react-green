import React, { useEffect, useState } from "react";

// Formik Validation
import * as Yup from "yup";
import { ErrorMessage, Field, FieldArray, Formik, useFormik } from "formik";

import { Link, useHistory } from "react-router-dom";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Select from "react-select";
import makeAnimated from 'react-select/animated';

import bitbucket from 'assets/images/brands/bitbucket.png';

const animatedComponents = makeAnimated();

import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap"

import classnames from "classnames"

const FormWizard = (props) => {

  //meta title
  document.title = "Register Form | Greenalytics";

  const [activeTab, setactiveTab] = useState(1)
  const [activeTabVartical, setoggleTabVertical] = useState(1)

  const [passedSteps, setPassedSteps] = useState([1])
  const [passedStepsVertical, setPassedStepsVertical] = useState([1])

  const [integration_group, setIntegration_group] = useState([]);


  function toggleTabVertical(tab) {
    if (activeTabVartical !== tab) {
      var modifiedSteps = [...passedStepsVertical, tab]
      if (tab >= 1 && tab <= 4) {
        setoggleTabVertical(tab)
        setPassedStepsVertical(modifiedSteps)
      }
    }
  }


  const initialValues = {
    email: 'pv@gmail.com',
    yourSite: 'test.app.us.example.com',
    notification: [],
    phone: "",
    team_name: "",
    users: [
      {
        user_email: '',
        name_surename: '',
        role: '',
      },
    ],
    integration: '',
    tools: '',
    not_interested: '',
  };

  const optionIntegration = [
    {
      options: [
        { label: "Tool 1", value: "Tool 1" },
        { label: "Tool 2", value: "Tool 2" },
        { label: "Tool 3", value: "Tool 3" },
        { label: "Tool 4", value: "Tool 4" },
        { label: "Tool 5", value: "Tool 5" },
      ]
    },
  ]


  const selectIntegrations = value => {
    console.log(value);
    // setIntegration_group(value);
    // setIntegration_group({...integration_group, value})
    setIntegration_group({ ...integration_group, [value.map(val => val.label)]: value.map(val => val.value) })
    // setIntegration_group(Array.isArray(value) ? value.map(val => val.value) : []);
    console.log(integration_group)
  }

  const toolHandleChange = e => {
    console.log(e.target.checked);
  }

  const saveNumber = num => {
    console.log(num)
  }
  const saveNotification = (noti) => {
    // console.log("save->", noti);
  }
  const saveTeamUsers = () => {
    console.log("save team")
  }

  console.log("props->", props);
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={false}>
          <Breadcrumbs title="Greenalytics" breadcrumbItem="Register" />
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={Yup.object().shape({
              phone: Yup.string().min(10).max(12).required("Please Enter Phone Number"),
              team_name: Yup.string().required("Please Enter Team Name"),
              users: Yup.array()
                .of(Yup.object().shape({
                  user_email: Yup.string().required("Please Enter User Email"),
                  name_surename: Yup.string().required("Please Enter Name"),
                  role: Yup.string().required("Please Enter User Role"),
                })),
            })}
            onSubmit={async (values, actions) => {
              await new Promise((r) => setTimeout(r, 500));
              // alert(JSON.stringify(values, null, 2));
              // actions.resetForm();
              console.log(values)
            }}
            render={({ values, errors, status, touched, isSubmitting, setFieldValue, handleChange, handleBlur, handleSubmit }) => (
              <Form
                className="form-horizontal"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                  return false;
                }}
              >
                <Row>
                  <Col lg="12">
                    <Card>
                      <CardBody>
                        <h4 className="card-title mb-4">Quick start guide</h4>
                        <p className="card-title-desc">
                          Welcome to Greenalytics! Thanks for signing up for your free Greenalytics trial.<br></br>
                          We are going to take you through a few minutes setup to enable you to
                          experience the essential features and benefits of Greenalytics.
                        </p>
                        <div className="vertical-wizard wizard clearfix vertical">
                          <div className="steps w-100 clearfix">
                            <ul>
                              <NavItem
                                className={classnames({
                                  current: activeTabVartical === 1,
                                })}
                              >
                                <NavLink
                                  className={classnames({
                                    active: activeTabVartical === 1,
                                  })}
                                  onClick={() => {
                                    toggleTabVertical(1)
                                  }}
                                  disabled={!(passedStepsVertical || []).includes(1)}
                                >
                                  <span className="number">1.</span>
                                  <div>
                                    <h4>Configure your profile</h4>
                                    <span>Set up your profile by adding your contact information and notification preferences.</span>
                                  </div>
                                </NavLink>
                              </NavItem>
                              <div className="content w-100 clearfix">
                                <TabContent
                                  activeTab={activeTabVartical}
                                  className="body"
                                >
                                  <TabPane tabId={1}>
                                    <Row>
                                      <Col lg="6">
                                        <div className="mb-3">
                                          <Label for="phone">
                                            <b>SMS/Phone Number</b>
                                          </Label>
                                          <p>Enter the phone number that you want to get Greenalytics notifications to.</p>
                                          <Input
                                            id="phone"
                                            name="phone"
                                            className="form-control"
                                            placeholder="Enter phone"
                                            type="number"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.phone || ""}
                                            invalid={
                                              touched.phone && errors.phone ? true : false
                                            }
                                          />
                                          {touched.phone && errors.phone ? (
                                            <FormFeedback type="invalid">{errors.phone}</FormFeedback>
                                          ) : null}

                                        </div>
                                        <button
                                          className="btn btn-primary"
                                          type="button"
                                          disabled={!values.phone}
                                          onClick={num => saveNumber(values.phone)}
                                        >
                                          Save Phone Number
                                        </button>
                                      </Col>
                                    </Row>

                                    <Row className="mt-4">
                                      <Col lg="12">
                                        <div className="mb-3">
                                          <Label for="notifi">
                                            <b>Send test notifications</b>
                                          </Label>
                                          <div className="alert alert-primary fade show mt-2" role="alert">
                                            <i className="mdi mdi-alert-circle me-2"></i>
                                            Please enter a phone number in the previous step to test SMS and voice notifications.
                                          </div>
                                          <p>Greenalytics uses multiple notification channels
                                            (SMS, mobile push, phone call or email)
                                            to ensure that you don&lsquo;t miss any critical alerts.</p>

                                          <div className="form-check-inline" >
                                            <Field
                                              name="notification"
                                              type="checkbox"
                                              id="email"
                                              className="form-check-input me-2"
                                              value="Email"
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                            />
                                            <Label className="form-check-label" for="email">
                                              E-mail
                                            </Label>
                                          </div>

                                          <div className="form-check-inline" >
                                            <Field
                                              name="notification"
                                              type="checkbox"
                                              id="voice"
                                              className="form-check-input me-2"
                                              value="Voice"
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                            />
                                            <Label className="form-check-label" for="voice">
                                              Voice
                                            </Label>
                                          </div>

                                          <div className="form-check-inline" >
                                            <Field
                                              type="checkbox"
                                              name="notification"
                                              id="sms"
                                              className="form-check-input me-2"
                                              value="SMS"
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                            />
                                            <Label className="form-check-label" for="sms">
                                              SMS
                                            </Label>
                                          </div>

                                        </div>

                                        <button
                                          className="btn btn-primary"
                                          type="button"
                                          disabled={values.notification == '' ? true : false}
                                          onClick={noti => saveNotification(values.notification)}
                                        >
                                          Send test notification
                                        </button>
                                      </Col>
                                    </Row>

                                  </TabPane>
                                </TabContent>
                              </div>

                              <NavItem
                                className={classnames({
                                  current: activeTabVartical === 2,
                                })}
                              >
                                <NavLink
                                  className={classnames({
                                    active: activeTabVartical === 2,
                                  })}
                                  onClick={() => {
                                    toggleTabVertical(2)
                                  }}
                                  disabled={!(passedStepsVertical || []).includes(2)}
                                >
                                  <span className="number">2.</span>{" "}
                                  <div>
                                    <h4>Set up your team</h4>
                                    <span>Organize your users into teams and share only what&apos;s relevant to them.</span>
                                  </div>
                                </NavLink>
                              </NavItem>

                              <div className="content w-100 clearfix">
                                <TabContent
                                  activeTab={activeTabVartical}
                                  className="body"
                                >
                                  <TabPane tabId={2}>
                                    <Row>
                                      <Col lg="12">
                                        <div className="mb-3">
                                          <p>Greenalytics is organize around teams that typically reflect your organization,
                                            Each team can set up their own escalation, on-call schedules and routing rules.
                                            Below, please set up your team to experience these features of Greenalytics</p>
                                        </div>
                                      </Col>
                                      <Col lg="6">
                                        <div className="mb-2">
                                          <Label for="team_name">
                                            <b>Enter your team&apos;s name & add members to your team</b>
                                          </Label>
                                          <p>Specify a name for your team, i.e. SRE_Team, Database_Team, ...</p>

                                          <Input
                                            id="team_name"
                                            name="team_name"
                                            className="form-control"
                                            placeholder="Enter Team Name"
                                            type="text"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.team_name || ""}
                                            invalid={
                                              touched.team_name && errors.team_name ? true : false
                                            }
                                          />
                                          {touched.team_name && errors.team_name ? (
                                            <FormFeedback type="invalid">{errors.team_name}</FormFeedback>
                                          ) : null}
                                        </div>
                                      </Col>
                                    </Row>

                                    <Row>
                                      <Col xs="12">
                                        <table style={{ width: "100%" }}>
                                          <tbody>
                                            <FieldArray name="users">
                                              {({ insert, remove, push }) => (

                                                <>
                                                  {values.users.length > 0 &&
                                                    values.users.map((user, index) => {
                                                      const userErrors = errors.users?.length && errors.users[index] || {};
                                                      const userTouched = touched.users?.length && touched.users[index] || {};
                                                      return (
                                                        <tr key={index} >
                                                          <td>
                                                            <div data-repeater-list="group-a">
                                                              <Row data-repeater-item>
                                                                <Col lg="3" className="mb-3">
                                                                  <Field
                                                                    id={`users[${index}]`}
                                                                    type="email"
                                                                    name={`users[${index}].user_email`}
                                                                    placeholder="User E-mail"
                                                                    className={'form-control' + (userErrors.user_email && userTouched.user_email ? ' is-invalid' : '')}

                                                                  />
                                                                  <ErrorMessage
                                                                    name={`users[${index}].user_email`}
                                                                    component="div"
                                                                    className="invalid-feedback"
                                                                  />
                                                                </Col>

                                                                <Col lg="3" className="mb-3">
                                                                  <Field
                                                                    type="text"
                                                                    name={`users[${index}].name_surename`}
                                                                    className={'form-control' + (userErrors.name_surename && userTouched.name_surename ? ' is-invalid' : '')}
                                                                    placeholder="Name and Surename"
                                                                  />
                                                                  <ErrorMessage
                                                                    name={`users[${index}].name_surename`}
                                                                    component="div"
                                                                    className="invalid-feedback"
                                                                  />
                                                                </Col>

                                                                <Col lg="3" className="mb-3">

                                                                  <Field
                                                                    as="select"
                                                                    name={`users[${index}].role`}
                                                                    className={'form-control' + (userErrors.role && userTouched.role ? ' is-invalid' : '')}
                                                                  >
                                                                    <option value="">Select Role</option>
                                                                    <option value="owner">Owner</option>
                                                                    <option value="admin">Admin</option>
                                                                    <option value="user">User</option>
                                                                  </Field>

                                                                  <ErrorMessage
                                                                    name={`users[${index}].role`}
                                                                    component="div"
                                                                    className="invalid-feedback"
                                                                  />
                                                                </Col>

                                                                <Col
                                                                  lg="1"
                                                                  className="mb-3"
                                                                >
                                                                  {" "}
                                                                  <i
                                                                    className="mdi mdi-close-box mdi-close-btn"
                                                                    onClick={() => remove(index)}
                                                                  />
                                                                </Col>
                                                              </Row>
                                                            </div>
                                                          </td>
                                                        </tr>

                                                      )
                                                    })}
                                                  <Button
                                                    onClick={() => push({ user_email: '', name_surename: '', role: '' })}
                                                    color="default"
                                                    className="mt-3 mt-lg-0 btn btn-outline-primary btn-sm">
                                                    + Invite more{" "}
                                                  </Button>{" "}
                                                </>
                                              )}
                                            </FieldArray>
                                          </tbody>
                                        </table>

                                      </Col>
                                    </Row>

                                    <Row className="mt-3">
                                      <Col>
                                        <button
                                          className="btn btn-primary"
                                          type="button"
                                          disabled={!values.team_name ? true : false}
                                          onClick={e => saveTeamUsers()}
                                        >
                                          Create team and invite users
                                        </button>
                                      </Col>
                                    </Row>
                                  </TabPane>
                                </TabContent>
                              </div>

                              <NavItem
                                className={classnames({
                                  current: activeTabVartical === 3,
                                })}
                              >
                                <NavLink
                                  className={
                                    (classnames({
                                      active: activeTabVartical === 3,
                                    }),
                                      "done")
                                  }
                                  onClick={() => {
                                    toggleTabVertical(3)
                                  }}
                                  disabled={!(passedStepsVertical || []).includes(3)}
                                >
                                  <span className="number">3.</span> Bank Details
                                </NavLink>
                              </NavItem>
                              <div className="content w-100 clearfix">
                                <TabContent
                                  activeTab={activeTabVartical}
                                  className="body"
                                >
                                  <TabPane tabId={3}>
                                    <Row>
                                      <Col lg="6">
                                        <FormGroup className="mb-3">
                                          <Label htmlFor="basicpill-firstname-input12">
                                            First name
                                          </Label>
                                          <Input
                                            type="text"
                                            className="form-control"
                                            id="basicpill-firstname-input12"
                                            placeholder="Enter Your First Name"
                                          />
                                        </FormGroup>
                                      </Col>
                                      <Col lg="6">
                                        <FormGroup className="mb-3">
                                          <Label htmlFor="basicpill-lastname-input22">
                                            Last name
                                          </Label>
                                          <Input
                                            type="text"
                                            className="form-control"
                                            id="basicpill-lastname-input22"
                                            placeholder="Enter Your Last Name"
                                          />
                                        </FormGroup>
                                      </Col>
                                    </Row>
                                    <Row>
                                      <Col lg="6">
                                        <FormGroup className="mb-3">
                                          <Label htmlFor="basicpill-phoneno-input32">
                                            Phone
                                          </Label>
                                          <Input
                                            type="text"
                                            className="form-control"
                                            id="basicpill-phoneno-input32"
                                            placeholder="Enter Your Phone No."
                                          />
                                        </FormGroup>
                                      </Col>
                                      <Col lg="6">
                                        <FormGroup className="mb-3">
                                          <Label htmlFor="basicpill-email-input42">
                                            Email
                                          </Label>
                                          <Input
                                            type="email"
                                            className="form-control"
                                            id="basicpill-email-input42"
                                            placeholder="Enter Your Email ID"
                                          />
                                        </FormGroup>
                                      </Col>
                                    </Row>
                                    <Row>
                                      <Col lg="12">
                                        <FormGroup className="mb-3">
                                          <Label htmlFor="basicpill-address-input12">
                                            Address
                                          </Label>
                                          <textarea
                                            id="basicpill-address-input12"
                                            className="form-control"
                                            rows="2"
                                            placeholder="Enter Your Address"
                                          />
                                        </FormGroup>
                                      </Col>
                                    </Row>
                                  </TabPane>
                                </TabContent>
                              </div>

                              <NavItem
                                className={classnames({
                                  current: activeTabVartical === 4,
                                })}
                              >
                                <NavLink
                                  className={
                                    (classnames({
                                      active: activeTabVartical === 4,
                                    }),
                                      "done")
                                  }
                                  onClick={() => {
                                    toggleTabVertical(4)
                                  }}
                                  disabled={!(passedStepsVertical || []).includes(4)}
                                >
                                  <span className="number">4.</span> Confirm Detail
                                </NavLink>
                              </NavItem>
                              <div className="content w-100 clearfix">
                                <TabContent
                                  activeTab={activeTabVartical}
                                  className="body"
                                >
                                  <TabPane tabId={4}>
                                    <Row>
                                      <Col lg="6">
                                        <FormGroup className="mb-3">
                                          <Label htmlFor="basicpill-firstname-input12">
                                            First name
                                          </Label>
                                          <Input
                                            type="text"
                                            className="form-control"
                                            id="basicpill-firstname-input12"
                                            placeholder="Enter Your First Name"
                                          />
                                        </FormGroup>
                                      </Col>
                                      <Col lg="6">
                                        <FormGroup className="mb-3">
                                          <Label htmlFor="basicpill-lastname-input22">
                                            Last name
                                          </Label>
                                          <Input
                                            type="text"
                                            className="form-control"
                                            id="basicpill-lastname-input22"
                                            placeholder="Enter Your Last Name"
                                          />
                                        </FormGroup>
                                      </Col>
                                    </Row>
                                    <Row>
                                      <Col lg="6">
                                        <FormGroup className="mb-3">
                                          <Label htmlFor="basicpill-phoneno-input32">
                                            Phone
                                          </Label>
                                          <Input
                                            type="text"
                                            className="form-control"
                                            id="basicpill-phoneno-input32"
                                            placeholder="Enter Your Phone No."
                                          />
                                        </FormGroup>
                                      </Col>
                                      <Col lg="6">
                                        <FormGroup className="mb-3">
                                          <Label htmlFor="basicpill-email-input42">
                                            Email
                                          </Label>
                                          <Input
                                            type="email"
                                            className="form-control"
                                            id="basicpill-email-input42"
                                            placeholder="Enter Your Email ID"
                                          />
                                        </FormGroup>
                                      </Col>
                                    </Row>
                                    <Row>
                                      <Col lg="12">
                                        <FormGroup className="mb-3">
                                          <Label htmlFor="basicpill-address-input12">
                                            Address
                                          </Label>
                                          <textarea
                                            id="basicpill-address-input12"
                                            className="form-control"
                                            rows="2"
                                            placeholder="Enter Your Address"
                                          />
                                        </FormGroup>
                                      </Col>
                                    </Row>
                                  </TabPane>
                                </TabContent>
                              </div>

                            </ul>
                          </div>

                          <div className="actions clearfix">
                            <ul>
                              <li
                                className={
                                  activeTabVartical === 1
                                    ? "previous disabled"
                                    : "previous"
                                }
                              >
                                <Link
                                  to="#"
                                  onClick={() => {
                                    toggleTabVertical(activeTabVartical - 1)
                                  }}
                                >
                                  Previous
                                </Link>

                              </li>
                              <li
                                className={
                                  activeTabVartical === 4 ? "next disabled" : "next"
                                }
                              >
                                <Link
                                  to="#"
                                  onClick={() => {
                                    toggleTabVertical(activeTabVartical + 1)
                                  }}
                                >
                                  Next
                                </Link>
                                {/* <button
                                  className="btn btn-primary btn-block"
                                  type="submit"
                                  disabled={isSubmitting}
                                  onClick={() => { 
                                    
                                    setFieldValue("integration", integration_group) 
                                    }}
                                >
                                  {isSubmitting ?
                                    <div className="spinner-border text-white" role="status" style={{ width: "1.2rem", height: "1.2rem" }}>
                                      <span className="sr-only">Loading...</span>
                                    </div>
                                    :
                                    "Submit"
                                  }
                                </button> */}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Form>
            )}
          />
        </Container>
      </div>
    </React.Fragment>
  )
}

export default FormWizard
