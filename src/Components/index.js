import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Spin, Result } from 'antd';

const LandingComponent = lazy(() => import('./HomePageLayout'));
const ProjectsComponent = lazy(() => import('./SitePagesLayout'));
const AboutComponent = lazy(() => import('./AboutPagesLayout'));

// const debug = lazy(async () => {
//   return new Promise(resolve => setTimeout(resolve, 10000)).then(
//     () => import("./HomePageLayout")
//   );
// })

const renderLoading = () => (
  <div id="loadingContainer">
    <div id="loading">
      <Result
        icon={<Spin size="large" />}
        title="Loading Assets"
        subTitle="Thank You For Your Patience"
      />
    </div>
  </div>
);

//TODO: make errorboundry for loading and a 404 page 

const App = () => {

  return (
    <BrowserRouter>
      <Switch>
        <Suspense fallback={renderLoading()}>
          <Route exact path="/" component={LandingComponent}/>
          <Route path="/projects" component={ProjectsComponent}/>
          <Route path="/about" component={AboutComponent}/>
        </Suspense>
      </Switch>
    </BrowserRouter>
  )

}

export default App;
