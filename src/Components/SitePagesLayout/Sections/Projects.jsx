import React, {useEffect, useState} from "react";
import { BackTop, Tabs} from 'antd';
import Prism from 'prismjs';
import "../../../resources/less/projects.less"
import lapImg from '../../../resources/images/laptop.png'
import phoneImg from '../../../resources/images/mobile.jpg'

const ProjectContainer = () => {
  const [state, stateFunc] = useState({device1: null, device2: null, load: false});

  const { TabPane } = Tabs;
  const contentStyle = {
    backgroundColor: 'rgb(228, 228, 228)', 
    height: '75vh',
    width: '95%',
    margin: '0px auto 3rem',
    borderRadius: '2rem',
    padding: '4rem',
    border: '1px solid black'
  };

  const canvasStyle = {
    height: '50vh',
    width: '50vw',
    margin: '0 auto',
    position: 'absolute',
    top: '10%',
    left: '25%'
  };

  const code =`
    {
      "@ant-design/icons": "^4.2.2",
      "@emotion/core": "^10.0.28",
      "@emotion/styled": "^10.0.27",
      "@theme-ui/presets": "^0.3.0",
      "antd": "^3.12.3",
      "babel-plugin-prismjs": "^2.0.1",
      "classnames": "^2.2.6",
      "dotenv": "^8.2.0",
      "less": "^3.9.0",
      "path": "^0.12.7",
      "prismjs": "^1.21.0",
      "react": "^16.6.3",
      "react-dom": "^16.6.3",
      "react-helmet": "^5.2.0",
      "react-hot-loader": "^4.12.21",
      "react-loadable": "^5.5.0",
      "react-router-dom": "^5.2.0",
      "react-spring": "^8.0.27",
      "react-three-fiber": "^4.2.19",
      "react-visibility-sensor": "^5.1.1",
      "tailwindcss": "^1.6.0",
      "theme-ui": "^0.3.1",
      "three": "^0.119.1"
    }  
  `.trim();

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

    console.log({window: window, laptop}, 'on mount');
  
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = "./public/deviceful.min.js";

    document.body.appendChild(script);

    script.onload = () => {
      if(laptop) {
        console.log({window: window}, 'after script loads');
        device1 = new Deviceful({
          parent: '#main-laptop',
          device: 'laptop',
          screenshot: lapImg,
          screenshotHeight: 2402,
        });

        device2 = new Deviceful({
          parent: '#docs-phone',
          device: 'phone',
          screenshot: phoneImg,
          screenshotHeight: 2792
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
        <Tabs style={contentStyle} tabPosition="left" type="card" keyboard={true} defaultActiveKey="2"
          onTabClick={(key,event) => {
          console.log({key}, {driveIn}, 'in tab function');
          if((key === "1")){
            state.device1.animate(driveIn);
            state.device1.scroll({
              direction: 'down', // 'up' or 'down'
              duration: 3500, // in milliseconds
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
          <TabPane forceRender={true} tab="Site" key="1">
            <div id="main-laptop" style={canvasStyle}/>
          </TabPane>
          <TabPane forceRender={true} tab="Dependencies" key="2">
            <pre className="line-numbers">
              <code className="language-js">{code}</code>
            </pre>
          </TabPane>
        </Tabs>

        <Tabs style={contentStyle} tabPosition="left" type="card" keyboard={true} defaultActiveKey="2"
          onTabClick={(key,event) => {
            console.log({key}, {driveIn}, 'in tab function');
            if((key === "1")) {
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
          <TabPane forceRender={true} tab="Site" key="1">
            <div id="docs-phone" style={canvasStyle}/>
          </TabPane>
          <TabPane forceRender={true} tab="Dependencies" key="2">
            <pre className="line-numbers">
              <code className="language-js">{code}</code>
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