import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Projects from "./SitePagesLayout"
import Landing from "./HomePageLayout"
import About from "./AboutPagesLayout"

const App = () => {

  return (
    <BrowserRouter>
      <Switch>
    
          <Route exact path="/" component={Landing}/>
          <Route path="/projects" component={Projects}/>
          <Route path="/about" component={About}/>

      </Switch>
    </BrowserRouter>
  )

}

export default App;
