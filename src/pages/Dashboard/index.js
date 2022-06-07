import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Input,
} from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

//import action
import { getChartsData } from "../../store/actions";

// Pages Components
import WelcomeComp from "./WelcomeComp";
import MonthlyEarning from "./MonthlyEarning";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";
import IsAuth from "pages/Authentication/IsAuth";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reports: [
        { title: "Orders", iconClass: "bx-copy-alt", description: "1,235" },
        {
          title: "Revenue",
          iconClass: "bx-archive-in",
          description: "$35, 723",
        },
        {
          title: "Average Price",
          iconClass: "bx-purchase-tag-alt",
          description: "$16.2",
        },
      ],
      email: [
        { title: "Week", linkto: "#", isActive: false },
        { title: "Month", linkto: "#", isActive: false },
        { title: "Year", linkto: "#", isActive: true },
      ],
      modal: false,
      subscribemodal: false,
      chartSeries: [],
      periodType: "yearly",
    };

    this.togglemodal.bind(this);
    this.togglesubscribemodal.bind(this);
  }

  componentDidMount() {
    const { onGetChartsData } = this.props;
    setTimeout(() => this.setState({ subscribemodal: true }), 2000);
    onGetChartsData("yearly");
  }

  togglemodal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  };

  togglesubscribemodal = () => {
    this.setState(prevState => ({
      subscribemodal: !prevState.subscribemodal,
    }));
  };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({ ...this.state, chartSeries: this.props.chartsData });
    }
  }

  render() {
    //meta title
    document.title = "Dashboard | React Admin & Dashboard Template";

    return (
      <React.Fragment>
        <div className="page-content">
        <IsAuth />
          <Container fluid>
            {/* Render Breadcrumb */}
            <Breadcrumbs
              title={this.props.t("Dashboards")}
              breadcrumbItem={this.props.t("Dashboard")}
            />
            <Row>
              <Col xl="4">
                <WelcomeComp />
                {/* <MonthlyEarning /> */}
              </Col>
              <Col xl="8">
                <Row>
                  {/* Reports Render */}
                  {this.state.reports.map((report, key) => (
                    <Col md="4" key={"_col_" + key}>
                      <Card className="mini-stats-wid">
                        <CardBody>
                          <div className="d-flex">
                            <div className="flex-grow-1">
                              <p className="text-muted fw-medium">
                                {report.title}
                              </p>
                              <h4 className="mb-0">{report.description}</h4>
                            </div>
                            <div className="mini-stat-icon avatar-sm rounded-circle bg-primary align-self-center">
                              <span className="avatar-title">
                                <i
                                  className={
                                    "bx " + report.iconClass + " font-size-24"
                                  }
                                />
                              </span>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>


          </Container>
        </div>
      </React.Fragment>
    );
  }
}

Dashboard.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

const mapStateToProps = ({ Dashboard }) => ({
  chartsData: Dashboard.chartsData,
});

const mapDispatchToProps = dispatch => ({
  onGetChartsData: periodType => dispatch(getChartsData(periodType)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(Dashboard));
