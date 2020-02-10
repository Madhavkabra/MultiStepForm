import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import OnboardingStep from './containers/OnboardingStep';
import Success from './components/Success'

const Routes = () => (
  <Switch>
    <Route path="/onboarding/:stepNumber" component={OnboardingStep} />
    <Route path="/success" component={Success} />
    <Redirect from="*" to="/onboarding/1" />
  </Switch>
);

export default Routes;
