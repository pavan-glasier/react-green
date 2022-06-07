import React from "react";
import { Redirect } from "react-router-dom";


// Pages Calendar
import Calendar from "../pages/Calendar/index";

// User profile
import UserProfile from "../pages/Authentication/UserProfile";


// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";

// Dashboard
import Dashboard from "../pages/Dashboard/index";
import FormWizard from "pages/Forms/FormWizard";


const authProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },
  //profile
  { path: "/profile", component: UserProfile },
  //calendar
  { path: "/calendar", component: Calendar },
  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
];

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },
  { path: "/form-wizard", component: FormWizard },
];

export { authProtectedRoutes, publicRoutes };