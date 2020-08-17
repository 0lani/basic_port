import React, {useEffect, useState} from "react";
import { BackTop, Tabs} from 'antd';
import Prism from 'prismjs';
import "../../../resources/less/projects.less"
import lapImg from '../../../resources/images/laptop.png'
import phoneImg from '../../../resources/images/mobile.jpg'

const ProjectContainer = () => {

  const { TabPane } = Tabs;
  const contentStyle = {
    backgroundColor: 'rgb(228, 228, 228)', 
    height: '75vh',
    width: '95%',
    margin: '0px auto 3rem',
    borderRadius: '2rem',
    padding: '4rem'
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

  const [state, stateFunc] = useState({laptop: false, iphone: false, deviceful: null})

  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = "./public/deviceful.min.js";

  document.body.appendChild(script);

  (state.laptop) && (script.onload = () => {
    console.log({window: window},{state}, 'after script loads')
    const device1 = new window.Deviceful({
      parent: '#main-laptop',
      device: 'laptop',
      screenshot: lapImg,
      screenshotHeight: 2402
    });
    device1.mount();

    const device2 = new window.Deviceful({
      parent: '#docs-phone',
      device: 'phone',
      screenshot: phoneImg,
      screenshotHeight: 2792
    });
    device2.mount();
  })

  useEffect(() => {
    Prism.highlightAll();
    const laptop = document.getElementById('main-laptop');
    const iphone = document.getElementById('docs-phone');

    console.log({window: window, laptop, iphone}, 'on mount')
  
    if(laptop) {
      stateFunc({laptop, iphone})
    }
  }, [stateFunc]);

  return (
    <React.Fragment>
      <article >
        <Tabs style={contentStyle} tabPosition="left" type="card" keyboard={true}>
          <TabPane forceRender={true} tab="Site" key="1">
            <div id="main-laptop"/>
          </TabPane>
          <TabPane forceRender={true} tab="Dependencies" key="2">
            <pre className="line-numbers">
              <code className="language-js">{code}</code>
            </pre>
          </TabPane>
        </Tabs>

        <Tabs style={contentStyle} tabPosition="left" type="card" keyboard={true}>
          <TabPane forceRender={true} tab="Site" key="1">
            <div id="docs-phone"/>
          </TabPane>
          <TabPane forceRender={true} tab="Dependencies" key="2">
            <pre className="line-numbers">
              <code className="language-js">{code}</code>
            </pre>
          </TabPane>
        </Tabs>

        <Tabs style={contentStyle} tabPosition="left" type="card" keyboard={true}>
          <TabPane tab="Site" key="1">
            <p>Content of Tab Pane 2</p>
            <p>Content of Tab Pane 2</p>
            <p>Content of Tab Pane 2</p>
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