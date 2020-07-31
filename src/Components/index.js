import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import OtherPage from "./SitePagesLayout"
import Landing from "./HomePageLayout"

const App = () => {

  return (
    <BrowserRouter>
      <Switch>
    
          <Route path="/" component={Landing}/>
          <Route path="/services" component={OtherPage}/>

      </Switch>
    </BrowserRouter>
  )

}

export default App;
