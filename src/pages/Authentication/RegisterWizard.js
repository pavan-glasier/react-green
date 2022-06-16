import React, { useEffect, useState } from "react";
import { Row, Col, CardBody, Card, Alert, Container, Input, Label, Form, FormFeedback, CardTitle, Collapse, Button } from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { ErrorMessage, Field, FieldArray, Formik, useFormik } from "formik";

import { Link, useHistory } from "react-router-dom";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import classnames from "classnames";
import Select from "react-select";
import makeAnimated from 'react-select/animated';

import bitbucket from 'assets/images/brands/bitbucket.png';
const animatedComponents = makeAnimated();

const RegisterWizard = (props) => {
    // meta title
    document.title = "Register Form | Greenalytics";

    const [col1, setcol1] = useState(true);
    const [col2, setcol2] = useState(false);
    const [col3, setcol3] = useState(false);
    const [col4, setcol4] = useState(false);
    const [integration_group, setIntegration_group] = useState([]);


    const t_col1 = () => {
        setcol1(!col1);
        setcol2(false);
        setcol3(false);
        setcol4(false);
    };

    const t_col2 = () => {
        setcol2(!col2);
        setcol1(false);
        setcol3(false);
        setcol4(false);
    };

    const t_col3 = () => {
        setcol3(!col3);
        setcol1(false);
        setcol2(false);
        setcol4(false);
    };

    const t_col4 = () => {
        setcol4(!col4);
        setcol1(false);
        setcol2(false);
        setcol3(false);
    };

    console.log("props-->", props);
    // const validation = useFormik({
    //     // enableReinitialize : use this flag when initial values needs to be changed
    //     enableReinitialize: true,

    //     // initialValues: {
    //     //     email: props.location.state.email,
    //     //     yourSite: props.location.state.yourSite,
    //     //     notification: [],
    //     //     phone: "",
    //     //     team_name: "",
    //     //     users: [
    //     //         {
    //     //             user_email: '',
    //     //             name_surename: '',
    //     //             role: '',
    //     //         },
    //     //     ],
    //     // },
    //     validationSchema: Yup.object({
    //         phone: Yup.string().min(10).max(12).required("Please Enter Phone Number"),
    //         team_name: Yup.string().required("Please Enter Team Name"),
    //     }),

    //     onSubmit: (values) => {
    //         // dispatch(registerUser(values));
    //         // registerUserData(values);
    //         console.log("Values-->", values)
    //     }


    // });
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
        setIntegration_group({...integration_group, [value.map(val => val.label)]: value.map(val => val.value)})
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
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={false}>
                    <Breadcrumbs title="Greenalytics" breadcrumbItem="Register" />
                    <Row>
                        <Card>
                            <CardBody>
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
                                                <Col lg={12}>
                                                    <CardTitle className="h4">Quick start guide</CardTitle>
                                                    <p className="card-title-desc">
                                                        Welcome to Greenalytics! Thanks for signing up for your free Greenalytics trial.<br></br>
                                                        We are going to take you through a few minutes setup to enable you to
                                                        experience the essential features and benefits of Greenalytics.
                                                    </p>

                                                    <div className="accordion" id="accordion">
                                                        <div className="accordion-item">
                                                            <h2 className="accordion-header" id="headingOne">
                                                                <button
                                                                    className={classnames(
                                                                        "accordion-button",
                                                                        "fw-medium",
                                                                        "flex-wrap",
                                                                        { collapsed: !col1 }
                                                                    )}
                                                                    type="button"
                                                                    onClick={t_col1}
                                                                    style={{ cursor: "pointer", fontSize: "1.1rem" }}
                                                                > <span>1</span> {" "}{" "}
                                                                    {/* <i className="mdi mdi-18px mdi-account-details m-0 me-2" /> */}
                                                                    Configure your profile
                                                                    <span>Set up your profile by adding your contact information and notification preferences.</span>
                                                                </button>
                                                            </h2>

                                                            <Collapse isOpen={col1} className="accordion-collapse">
                                                                <div className="accordion-body">
                                                                    <div className="text-muted">
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
                                                                        {/* <Row className="mt-4">
                                                                            <Col lg="12">
                                                                                <div className="mb-3">
                                                                                    <Label for="notifi">
                                                                                        <b>Install Greenalytics mobile app</b>
                                                                                    </Label>
                                                                                    <p>With our mobile app, you can manage your alerts and incidents from anywhere, anytime.
                                                                                        You can learn more about our mobile apps from here.</p>
                                                                                </div>
                                                                                <button
                                                                                    className="btn btn-primary"
                                                                                    type="button"
                                                                                >
                                                                                    Get the link via e-mail and SMS
                                                                                </button>
                                                                            </Col>
                                                                        </Row> */}
                                                                    </div>
                                                                </div>
                                                            </Collapse>
                                                        </div>
                                                        <div className="accordion-item">
                                                            <h2 className="accordion-header" id="headingTwo">
                                                                <button
                                                                    className={classnames(
                                                                        "accordion-button",
                                                                        "fw-medium",
                                                                        "flex-wrap",
                                                                        { collapsed: !col2 }
                                                                    )}
                                                                    type="button"
                                                                    onClick={t_col2}
                                                                    style={{ cursor: "pointer", fontSize: "1.1rem" }}
                                                                >
                                                                <span>2</span> {" "}{" "}
                                                                    {/* <i className="bx bxs-group m-0 me-2" /> */}
                                                                    Set up your team
                                                                    <span>Organize your users into teams and share only what&apos;s relevant to them.</span>
                                                                </button>
                                                            </h2>

                                                            <Collapse isOpen={col2} className="accordion-collapse">
                                                                <div className="accordion-body">
                                                                    <div className="text-muted">

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

                                                                    </div>
                                                                </div>
                                                            </Collapse>
                                                        </div>
                                                        <div className="accordion-item">
                                                            <h2 className="accordion-header" id="headingThree">
                                                                <button
                                                                    className={classnames(
                                                                        "accordion-button",
                                                                        "fw-medium",
                                                                        "flex-wrap",
                                                                        { collapsed: !col3 }
                                                                    )}
                                                                    type="button"
                                                                    onClick={t_col3}
                                                                    style={{ cursor: "pointer", fontSize: "1.1rem" }}
                                                                >
                                                                <span>3</span> {" "}{" "}
                                                                    {/* <i className="bx bxs-cog m-0 me-2" /> */}
                                                                    Intergrate with Jira and your monitoring tools
                                                                    <span>Greenalytics has out-of-box integration with over 200 monitoring, Dev and IT tools.</span>
                                                                </button>
                                                            </h2>
                                                            <Collapse isOpen={col3} className="accordion-collapse">
                                                                <div className="accordion-body">
                                                                    <div className="text-muted">
                                                                        <Row>
                                                                            <Col lg="12">
                                                                                <div className="mb-3">
                                                                                    <p>Integration enable Greenalytics to connect to your monitoring tools,
                                                                                        email and applications. Once connected.
                                                                                        <br></br>
                                                                                        Greenalytics can centralize alerts from all sources, and use routing rules,
                                                                                        on-call shedules and qscalation policies to ensure the right people are notified of issues.</p>
                                                                                    <div className="alert alert-primary fade show mt-2" role="alert">
                                                                                        <i className="mdi mdi-alert-circle me-2"></i>
                                                                                        To set up an integration, you need to first create a team.
                                                                                    </div>

                                                                                    <Label>
                                                                                        Select the tool(s) to integrate with
                                                                                    </Label>
                                                                                    <p>Select the tool(s) to integrate with from here; then complete your integration setup in Team</p>


                                                                                    <Row className="mb-3">
                                                                                        <Label>
                                                                                            POPULAR INTEGRATIONS
                                                                                        </Label>
                                                                                        <Col lg="1">
                                                                                        <Input
                                                                                                type="hidden"
                                                                                                name="integration"
                                                                                            />
                                                                                            <input
                                                                                                id="tool1"
                                                                                                type="checkbox"
                                                                                                value="bitbucket"
                                                                                                className="d-none"
                                                                                                onChange={e => selectIntegrations(
                                                                                                    [{label: "Tool 6", value: "Tool 6"}])}
                                                                                            />
                                                                                            <Label for="tool1" className="tools-img">
                                                                                                <img src={bitbucket} />
                                                                                            </Label>
                                                                                        </Col>
                                                                                    </Row>

                                                                                    <Row>
                                                                                        <Label>
                                                                                            All INTEGRATIONS
                                                                                        </Label>
                                                                                        <Col lg="3" className="mb-3">
                                                                                            
                                                                                            <Select
                                                                                                components={animatedComponents}
                                                                                                isMulti={true}
                                                                                                options={optionIntegration}
                                                                                                onChange={e => selectIntegrations(e)}
                                                                                                classNamePrefix="select2-selection"
                                                                                            />
                                                                                        </Col>
                                                                                    </Row>
                                                                                    <Row className="mb-3">
                                                                                        <span>
                                                                                            {/* {integration_group && integration_group.map((item, index) => (
                                                                                                <>
                                                                                                    {
                                                                                                        index == 0 ? <b>{item}</b> : <b>{", "}{item}</b>
                                                                                                    }
                                                                                                </>
                                                                                            ))} */}
                                                                                            {" "}{" "} are selected.
                                                                                        </span>
                                                                                    </Row>

                                                                                    <button
                                                                                        className="btn btn-primary"
                                                                                        type="button"
                                                                                    >
                                                                                        Save integrations
                                                                                    </button>
                                                                                </div>

                                                                            </Col>
                                                                        </Row>
                                                                    </div>
                                                                </div>
                                                            </Collapse>
                                                        </div>

                                                        <div className="accordion-item">
                                                            <h2 className="accordion-header" id="headingThree">
                                                                <button
                                                                    className={classnames(
                                                                        "accordion-button",
                                                                        "fw-medium",
                                                                        "flex-wrap",
                                                                        { collapsed: !col4 }
                                                                    )}
                                                                    type="button"
                                                                    onClick={t_col4}
                                                                    style={{ cursor: "pointer", fontSize: "1.1rem" }}
                                                                >
                                                                <span>4</span> {" "}{" "}
                                                                    {/* <i className="bx bxs-chat m-0 me-2" /> */}
                                                                    Intergrate with your chat tool
                                                                    <span>Easily build bi-directional intergrations with popular Chat/Collboration tools.</span>
                                                                </button>
                                                            </h2>
                                                            <Collapse isOpen={col4} className="accordion-collapse">
                                                                <div className="accordion-body">
                                                                    <div className="text-muted">

                                                                        <div className="alert alert-primary fade show mt-2" role="alert">
                                                                            <i className="mdi mdi-alert-circle me-2"></i>
                                                                            To set up an integration, you need to first create a team.
                                                                        </div>

                                                                        <Label>
                                                                            Select team chat tool
                                                                        </Label>
                                                                        <p>Enable your teams to work with Greenanlytics alerts and schedules directly in your chat tool.
                                                                            Through chat integration, you can forard</p>
                                                                        <p>Choose your chat tool below, and complete its integration configuration in the newly opend page</p>

                                                                        <Row className="mb-3">
                                                                            <Col lg="1">
                                                                                <Field
                                                                                    id="chatTool1"
                                                                                    type="checkbox"
                                                                                    name="tools"
                                                                                    value="bitbucket"
                                                                                    className="d-none"
                                                                                    // // onChange={toolHandleChange}
                                                                                    // onChange={handleChange}
                                                                                    //         onBlur={handleBlur}
                                                                                />
                                                                                <Label for="chatTool1" className="tools-img">
                                                                                    <img src={bitbucket} />
                                                                                </Label>
                                                                            </Col>
                                                                        </Row>

                                                                        <Row className="mb-3">
                                                                            <Col lg="12">
                                                                                <Field
                                                                                    id="not_interested"
                                                                                    type="checkbox"
                                                                                    name="not_interested"
                                                                                    value="Not Interested"
                                                                                    className="form-check-input me-2"
                                                                                    // onChange={toolHandleChange}
                                                                                />
                                                                                <Label for="not_interested" >
                                                                                    I am not interested in a chat integration now.
                                                                                </Label>
                                                                            </Col>
                                                                        </Row>
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
                                                            disabled={isSubmitting}
                                                            onClick={() => { setFieldValue("integration", integration_group) }}
                                                        >
                                                            {isSubmitting ?
                                                                <div className="spinner-border text-white" role="status" style={{ width: "1.2rem", height: "1.2rem" }}>
                                                                    <span className="sr-only">Loading...</span>
                                                                </div>
                                                                :
                                                                "Submit"
                                                            }
                                                        </button>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Form>
                                    )}
                                />
                            </CardBody>
                        </Card>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
}

export default RegisterWizard;
