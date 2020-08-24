import React, {useEffect, useState} from "react";
import { BackTop, Tabs} from 'antd';
import Prism from 'prismjs';
import "../../../resources/less/projects.less"
import lapImg from '../../../resources/images/laptop.png'
import phoneImg from '../../../resources/images/mobile.jpg'

const ProjectContainer = ({mobile}) => {
  const [state, stateFunc] = useState({device1: null, device2: null, load: false});
  
  let position, type, canvasStyle, contentStyle;
  if(mobile){
    // mobile styles
    position = "top"
    type = "line"
    contentStyle = {
      backgroundColor: 'rgb(228, 228, 228)', 
      height: '110vh',
      width: '95%',
      margin: '0px auto 3rem',
      borderRadius: '1rem',
      padding: '1rem',
      border: '1px solid black'
    }
    canvasStyle = { 
      height: '55vh',
      width: '85vw',
      margin: '0px auto',
      position: 'absolute',
      top: '10%',
      left: '5%'
    }
  } else {
    // desktop styles
    position = "left"
    type = "card"
    contentStyle = {
      backgroundColor: 'rgb(228, 228, 228)', 
      height: '100vh',
      width: '95%',
      margin: '0px auto 3rem',
      borderRadius: '2rem',
      padding: '4rem',
      border: '1px solid black'
    }
    canvasStyle = {
      height: '50vh',
      width: '50vw',
      margin: '0 auto',
      position: 'absolute',
      top: '10%',
      left: '25%'
    }
  }
  const { TabPane } = Tabs;
 
  const codeResort =`
  {
    "dependencies": {
      "@babel/runtime-corejs2": "7.8.4",
      "@material-ui/core": "4.9.2",
      "@material-ui/icons": "4.9.1",
      "axios": "0.19.2",
      "bcryptjs": "^2.4.3",
      "clean-css": ">=4.1.11",
      "compile-run": "^2.3.2",
      "connect-flash": "^0.1.1",
      "cookie-parser": "~1.4.4",
      "cors": "2.8.5",
      "dotenv": "8.2.0",
      "debug": "~2.6.9",
      "express": "~4.16.1",
      "express-session": "^1.16.2",
      "http-errors": "~1.6.3",
      "install": "^0.13.0",
      "lodash": "^4.17.15",
      "morgan": "~1.9.1",
      "passport": "^0.4.0",
      "passport-local": "^1.0.0",
      "path": "0.12.7",
      "pg": "^7.12.1",
      "pug": "2.0.0-beta11",
      "react": "^16.8.6",
      "react-dom": "^16.8.6",
      "react-router-dom": "^5.0.1",
      "react-scripts": "^2.1.8",
      "sequelize": "^5.16.0",
      "styled-components": "^4.3.2"
      "validator": "^11.1.0"
    } 
  }
  `.trim();

  const codeTea = `
  {
    "dependencies": {
      "axios": "0.19.2",
      "bcryptjs": "2.4.3",
      "body-parser": "1.19.0",
      "clsx": "1.1.0",
      "cookie-parser": "1.4.4",
      "cors": "2.8.5",
      "dotenv": "8.2.0",
      "express": "4.17.1",
      "external-ip": "2.1.1",
      "is-empty": "1.2.0",
      "methods": "1.1.2",
      "mongodb": "3.5.3",
      "mongoose": "5.9.1",
      "morgan": "1.9.1",
      "net": "^1.0.2",
      "node-sass": "4.13.1",
      "passport": "0.4.1",
      "passport-jwt": "4.0.0",
      "path": "0.12.7",
      "react": "16.12.0",
      "react-composer": "5.0.1",
      "react-dom": "16.12.0",
      "react-icons": "3.9.0",
      "react-loadable": "5.5.0",
      "react-request": "3.1.2",
      "react-router-dom": "5.1.2",
      "recharts": "2.0.0-beta.1",
      "request": "2.88.2",
      "semantic-ui-css": "2.4.1",
      "semantic-ui-react": "0.88.2",
      "serve-favicon": "2.5.0",
      "validator": "12.2.0"
    }
  }
  `.trim()

  const readMeResort = `
    # Beach Resort

    Beach Resort Site

    ## Description

    I wanted to make a simple booking site for a resort that has the potential to be a live site

    ## Getting Started

    - clone repo
    - index.js is starting point
    - use npm start 

    ## Main Goals

    - have site where users can look through site for rooms they want
    - once room is selected user can go to check out page for prices

    ## Stretch Goals

    - create hosted db
    - make pages more lively
    - have an admin area where users can save personal info
    - have log in/out functions with full authentication

    ## Built With

    - [Node]: (https://www.nodejs.org) - Server used
    - [PostegreSQL]: (https://postgresql.org/ - Database used
    - [Javascript]: (https://developer.mozilla.org/en-US/docs/Web/JavaScript) - Main Languauge used
    - [React]: (http://www.reactjs.org) - Library used

    ## License

    This project is licensed under the **MIT License**- see the [LICENSE.md](LICENSE.md) file for details
  `.trim()

  const readMeTea = `
    # Tea Station

    Tea Station Site

    ## Description

    This site is for a tea station

    ## Getting Started

    - clone repo
    - index.js is starting point
    - use npm start 

    ## Main Goals

    - have site where users can find new and current products for a local tea station

    ## Stretch Goals

    - create delivery/pick-up portal for orders
    - allow users to make personal profile

    ## Built With

    - [Node]: (https://www.nodejs.org) - Server used
    - [Javascript]: (https://developer.mozilla.org/en-US/docs/Web/JavaScript) - Main Languauge used
    - [React]: (http://www.reactjs.org) - Library used

    ## License

    This project is licensed under the **MIT License**- see the [LICENSE.md](LICENSE.md) file for details
  `.trim()

  const driveIn = [
    {
      object: "model", // Swivel the device from -30 to 0 degrees
      move: "rotation",
      axis: "y",
      duration: 1500,
      easing: "swingTo",
      from: -30,
    },
    {
      object: "camera", // Move the camera down by 3 units
      move: "position",
      axis: "y",
      duration: 2000,
      easing: "easeOutQuad",
      from: 3,
    },
    {
      object: "camera", // Move the camera forward by 20 units
      move: "position",
      axis: "z",
      duration: 2000,
      easing: "easeOutQuad",
      from: 20,
    },
    {
      object: "camera", // Rotate the camera on the X axis from -5 to 0 degrees
      move: "rotation",
      axis: "x",
      duration: 2000,
      easing: "easeOutQuad",
      from: -5,
    },
  ];

  useEffect(() => {
    Prism.highlightAll();

    let device1,device2;
    const laptop = document.getElementById('main-laptop');
  
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = "./edfb3e592fd8074a.min.js";

    document.body.appendChild(script);

    script.onload = () => {
      if(laptop) {
        device1 = new Deviceful({
          parent: '#main-laptop',
          device: 'laptop',
          screenshot: lapImg,
          screenshotHeight: 2402,
        });

        device2 = new Deviceful({
          parent: '#sub-laptop',
          device: 'laptop',
          screenshot: phoneImg,
          screenshotHeight: 2402
        });

        device1.mount();
        device2.mount();

        stateFunc({device1: device1, device2: device2, load: true});
      }
    }
  }, [stateFunc]);

  return (
    <React.Fragment>
      <article >
        <Tabs style={contentStyle} tabPosition={position} type={type} keyboard={true} defaultActiveKey="1"
          onTabClick={(key,event) => {
          if((key === "2")){
            state.device1.animate(driveIn);
            state.device1.scroll({
              direction: 'down', // 'up' or 'down'
              duration: 3150, // in milliseconds
              easing: 'easeOutQuad' // default
            })
          } else {
            state.device1.scroll({
              direction: 'up', // 'up' or 'down'
              duration: 100, // in milliseconds
              easing: 'easeOutQuad' // default
            })
          }
        }}>
          <TabPane forceRender={true} tab="Project Scope" key="1">
            <pre className="line-numbers">
              <code className="language-makefile">{readMeResort}</code>
            </pre>
          </TabPane>
          <TabPane forceRender={true} tab="Website" key="2">
            <div id="main-laptop" style={canvasStyle}/>
          </TabPane>
          <TabPane forceRender={true} tab="Technologies" key="3">
            <pre className="line-numbers">
              <code className="language-json">{codeResort}</code>
            </pre>
          </TabPane>
        </Tabs>

        <Tabs style={contentStyle} tabPosition={position} type={type} keyboard={true} defaultActiveKey="1"
          onTabClick={(key) => {
            if((key === "2")) {
              state.device2.animate(driveIn);
              state.device2.scroll({
                direction: 'down', // 'up' or 'down'
                duration: 3500, // in milliseconds
                easing: 'easeOutQuad' // default
              })
            } else {
              state.device2.scroll({
                direction: 'up', // 'up' or 'down'
                duration: 100, // in milliseconds
                easing: 'easeOutQuad' // default
              })
            }
        }}>
          <TabPane forceRender={true} tab="Project Scope" key="1">
            <pre className="line-numbers">
              <code className="language-makefile">{readMeTea}</code>
            </pre>
          </TabPane>
          <TabPane forceRender={true} tab="Website" key="2">
            <div id="sub-laptop" style={canvasStyle}/>
          </TabPane>
          <TabPane forceRender={true} tab="Technologies" key="3">
            <pre className="line-numbers">
              <code className="language-json">{codeTea}</code>
            </pre>
          </TabPane>
        </Tabs>

        <BackTop>
          <div id="backUp">Top</div>
        </BackTop>
      </article>
    </React.Fragment>
  )
}

export default ProjectContainer;