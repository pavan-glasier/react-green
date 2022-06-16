import React, { useEffect, useState } from "react";
import { Row, Col, CardBody, Card, Alert, Container, Input, Label, Form, FormFeedback } from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

// action
import { registerUser, apiError } from "../../store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link, useHistory } from "react-router-dom";
// import images
import profileImg from "../../assets/images/profile-img.png";
import logoImg from "../../assets/images/logo.svg";
import logo_lg from "../../assets/images/logo-lg.png";
import logo_sm from "../../assets/images/logo-sm.png";

const Register = props => {
  //meta title
  document.title = "Register Form | Greenalytics";

  const [email, setEmail] = useState('');
  const [yourSite, setYourSite] = useState('');
  const [domainTXT, setDomainTXT] = useState('.app.us.greenalytics.in');
  const [region, setRegion] = useState('US');
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const dispatch = useDispatch();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: '',
      yourSite: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid Email Address').required("Please Enter Your Email"),
      yourSite: Yup.string().required("Please Enter Your Site"),
    }),

    onSubmit: (values) => {
      // dispatch(registerUser(values));
      registerUserData(values);
      console.log("Values-->", values)
    }


  });

  const { user, registrationError, loading } = useSelector(state => ({
    user: state.Account.user,
    registrationError: state.Account.registrationError,
    loading: state.Account.loading,
  }));
  // console.log("user", user);

  useEffect(() => {
    dispatch(apiError(""));
  }, []);


  const registerUserData = (value) => {
    console.log("value", value);
    setEmail(value.email);
    setYourSite(value.yourSite);
    setIsLoading(true);
    setTimeout(() => {
      history.push({
        pathname: '/form-wizard',
        state: { 
          email: value.email,
          yourSite: value.yourSite + domainTXT,
        }
      })
      // console.log(yourSite);
      setIsLoading(false);
    }, 3000);
  }

  const onValueChange = (event) => {
    setRegion(event.target.value);
    setDomainTXT(`.app.${event.target.value.toLowerCase()}.greenalytics.in`);
    console.log(domainTXT)
  }

  //   const handleOnChange = (event) => {
  //     console.log("Form::onChange", event);
  // };

  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="fas fa-home h2" />
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
                        <h5 className="text-primary">Create your account</h5>
                        {/* <p>Get your free Skote account now.</p> */}
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
                            src={logo_sm}
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2">
                    <Form
                      className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      {user && user ? (
                        <Alert color="success">
                          Register User Successfully
                        </Alert>
                      ) : null}

                      {registrationError && registrationError ? (
                        <Alert color="danger">{registrationError}</Alert>
                      ) : null}

                      <div className="mb-3">
                        <Label className="form-label">Work Email</Label>
                        <Input
                          id="email"
                          name="email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ""}
                          invalid={
                            validation.touched.email && validation.errors.email ? true : false
                          }
                        />
                        {validation.touched.email && validation.errors.email ? (
                          <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                        ) : null}

                      </div>

                      <div className="mb-2">
                        <Label for="region" className="form-label">
                          Select the data center region to store your Opsgenie specific product data:
                        </Label>
                      </div>

                      <div className="mb-1">
                        <div className="form-check">
                          <Input
                            id="us"
                            name="region"
                            type="radio"
                            onChange={onValueChange}
                            value="US"
                            checked={region === "US" ? true : false}
                          />
                          <Label className="form-check-label" for="us">
                            US
                          </Label>
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="form-check">
                          <Input
                            id="eu"
                            name="region"
                            type="radio"
                            onChange={onValueChange}
                            value="EU"
                            checked={region === "EU" ? true : false}
                          />
                          <Label className="form-check-label" for="eu">
                            EU
                          </Label>
                        </div>

                        <div className="alert alert-primary fade show mt-2" role="alert">
                          <i className="mdi mdi-alert-circle me-2"></i>
                          Some of your data is automatically stored in the US.
                        </div>
                      </div>

                      <div className="mb-3" style={{ position: "relative" }}>
                        <Label for="yourSite" className="form-label">Your Site</Label>
                        <Input
                          id="yourSite"
                          name="yourSite"
                          type="text"
                          className="right-place"
                          placeholder="Enter Your Site"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          invalid={
                            validation.touched.yourSite && validation.errors.yourSite ? true : false
                          }
                        />
                        <span url={domainTXT}></span>
                        {validation.touched.yourSite && validation.errors.yourSite ? (
                          <FormFeedback type="invalid">{validation.errors.yourSite}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mt-4 d-grid">
                        <button
                          className="btn btn-primary btn-block "
                          type="submit"
                          disabled={isLoading}
                        >
                          {isLoading ?
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
                  © {new Date().getFullYear()} Greenalytics. Crafted with {" "}
                  <i className="mdi mdi-heart text-danger" /> by Glasier Inc.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Register;
