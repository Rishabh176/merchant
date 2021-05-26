import React, { Suspense, lazy } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';

const Home = lazy(() => import("./components/Home"));
const Merchant = lazy(() => import("./components/Merchant"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<CircularProgress />}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/merchant/:id" component={Merchant} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
