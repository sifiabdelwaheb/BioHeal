import React, { Component, Suspense } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import AppLayout from "../../layout/AppLayout";

const Dashboards = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ "./dashboards")
);

//const Menu = React.lazy(() => import(/* webpackChunkName: "menu" */ './menu'));

class App extends Component {
  render() {
    const { match } = this.props;
    console.log("match********", match.url);
    return (
      <AppLayout>
        <div className="dashboard-wrapper">
          <Suspense fallback={<div className="loading" />}>
            <Switch>
              <Redirect
                exact
                from={`${match.url}/`}
                to={`${match.url}/dashboards`}
              />
              <Route
                path={`${match.url}/dashboards`}
                render={(props) => <Dashboards {...props} />}
              />

              <Redirect to="/error" />
            </Switch>
          </Suspense>
        </div>
      </AppLayout>
    );
  }
}
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));
