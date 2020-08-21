import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Loading from './Loading'

const LandingComponent = lazy(() => import('./HomePageLayout'));
const ProjectsComponent = lazy(() => import('./SitePagesLayout'));
const AboutComponent = lazy(() => import('./AboutPagesLayout'));

//TODO: make errorboundry for loading and a 404 page 

const App = () => {

  return (
    <BrowserRouter>
      <Switch>
        <Suspense fallback={Loading}>
          <Route exact path="/" component={LandingComponent}/>
          <Route path="/projects" component={ProjectsComponent}/>
          <Route path="/about" component={AboutComponent}/>
        </Suspense>
      </Switch>
    </BrowserRouter>
  )

}

export default App;
