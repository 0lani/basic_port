import React, { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Spin, Result } from 'antd';
import Header from "./HomePageLayout/Sections/Header"

const App = () => {
  const intialState = {
    width: false,
    height: false,
  };
  const [windowSize, setWindowSize] = useState(intialState);
  // Handler to call on window resize
  const handleResize = (setWindowSize) => {
    // Set window width/height to state
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }
  
  useEffect(() => {
    // Hides pre-load screen
    const ele = document.getElementById('ipl-progress-indicator');
    if(ele){
      // fade out
      ele.classList.add('available')
      // remove from DOM
      ele.outerHTML = ''
    }
    // Function for event listner
    const resizer = () => handleResize(setWindowSize);
    // Add event listener
    window.addEventListener("resize", resizer);
    // Call handler right away so state gets updated with initial window size
    resizer();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", resizer);
  }, []); // Empty array ensures that effect is only run on mount
  
  const currentWindowSize = windowSize.width && windowSize;
  
  //loading screen
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
  return (
    <React.Fragment>
      <BrowserRouter>
        <header>
          <Header currentWindowSize={currentWindowSize}/>
        </header>
        <Switch>
          <Route exact path="/" render={props => (
            <Suspense fallback={renderLoading()}>
            <LandingComponent {...props} currentWindowSize={currentWindowSize}/>
          </Suspense>
          )}/>

          <Route path="/projects" render={props => (
            <Suspense fallback={renderLoading()}>
            <ProjectsComponent {...props} currentWindowSize={currentWindowSize}/>
          </Suspense>
          )}/>

          <Route path="/about" render={props => (
            <Suspense fallback={renderLoading()}>
            <AboutComponent {...props} currentWindowSize={currentWindowSize}/>
          </Suspense>
          )}/>
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  )
}

export default App;


// const debug = lazy(async () => {
//   return new Promise(resolve => setTimeout(resolve, 10000)).then(
//     () => import("./HomePageLayout")
//   );
// })
