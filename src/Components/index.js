import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Spin, Result } from 'antd';

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

const LandingComponent = lazy(() => import('./HomePageLayout'));
const ProjectsComponent = lazy(() => import('./SitePagesLayout'));
const AboutComponent = lazy(() => import('./AboutPagesLayout'));

//TODO: make errorboundry for loading and a 404 page 

const App = () => {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={props => (
          <Suspense fallback={renderLoading()}>
           <LandingComponent {...props}/>
         </Suspense>
        )}/>

        <Route path="/projects" render={props => (
          <Suspense fallback={renderLoading()}>
           <ProjectsComponent {...props}/>
         </Suspense>
        )}/>

        <Route path="/about" render={props => (
          <Suspense fallback={renderLoading()}>
           <AboutComponent {...props}/>
         </Suspense>
        )}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App;


// const debug = lazy(async () => {
//   return new Promise(resolve => setTimeout(resolve, 10000)).then(
//     () => import("./HomePageLayout")
//   );
// })
