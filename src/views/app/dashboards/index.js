import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

const Plants = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ "./plants")
);

const Identify = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ "./Identify")
);
const Dashboard = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ "./dashbord")
);
const Database = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ "./database")
);
const Personalized = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ "./Personalized_foods")
);

const Healthcare = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ "./Healthcare")
);
const Green = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ "./Green_tours")
);
const Activity = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ "./Activitys")
);

const Dashboards = ({ match, role }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Route
        path={`${match.url}/plants`}
        render={(props) => <Plants {...props} />}
      />
      <Route
        path={`${match.url}/identify`}
        render={(props) => <Identify {...props} />}
      />
      <Route
        path={`${match.url}/dashboard`}
        render={(props) => <Dashboard {...props} />}
      />
      <Route
        path={`${match.url}/personalized`}
        render={(props) => <Personalized {...props} />}
      />
      <Route
        path={`${match.url}/healthcare`}
        render={(props) => <Healthcare {...props} />}
      />
      <Route
        path={`${match.url}/green`}
        render={(props) => <Green {...props} />}
      />

      <Route
        path={`${match.url}/activity`}
        render={(props) => <Activity {...props} />}
      />

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);

const mapStateToProps = (state) => {
  return {
    role: state.auth.response,
  };
};
export default connect(mapStateToProps)(Dashboards);
