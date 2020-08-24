import React from "react"
import { Row, Col, Card} from 'antd';
import QueueAnim from "rc-queue-anim"
import BannerImage from "./BannerImage"
import selfie from "../../resources/images/selfie.png"
import "../../resources/less/about.less"
import {github as Git, linkedin as Linked} from "../../resources/icons"

const Banner = ({mobile}) => {
  let title;

  if(mobile) {
    title = 'Javascript/Node Developer'
  } else {
    title = 'Olonnye Taylor — Javascript/Node Developer'
  }
  return (
    <React.Fragment>
      <section className="about-page about-banner-single">
        <div className={`about-layout-wrapper about-banner`}>
          <div className="about-layout">
            <Row gutter={[24, 0]} className={`about-banner-image-wrapper`}>
              <Col className="about-mobile" span={12}>
                <div className="container container-mobile">
                  <div className="center span4">
                    <img className="about" alt="picture of developer" src={selfie} style={{maxWidth: '140px', margin: '0 auto', borderRadius: '21%' }}/>
                    <div id="about-social">
                      <a href="https://www.linkedin.com/in/olonnye" target="_blank" rel="noopener">
                        <span><Git style={{color: '#68d391'}}/></span>
                      </a> 
                      <a href="https://github.com/boredasfawk" target="_blank" rel="noopener">
                        <span><Linked style={{color: '#68d391'}}/></span>
                      </a> 
                    </div>
                  </div>

                  <div className="site-card-border-less-wrapper">
                  <Card className="about-title-mobile" title={title} bordered={false}>

                  <p>I've spent the last few years working as a freelance developer that specializes in Javascript(front-end) and node(back-end) as the sole developer for a local start-up along with various other compaines in Las Vegas. 
                    I acquired project and time management skills, as well as the ability to communicate with new team members and clients while effectively meeting milestones and deadlines.</p>

                  <p>During my time working on a multitude of web Development projects I've had to learn other languages and app structures on the fly in order to effectively complete projects. Some of these skills include: React, Vue, Webpack, SQL, PHP, WordPress, jQuery, SASS, LESS, Bootstrap, along with other modern development necessities like the software development life cycle(agile, waterfall mainly). 
                    I put all the skills I've learned over the years to good use on every project I work on.</p>

                  <p>During these uncertain times I keep my own morale high by enjoying my free time with my dog Tika Masala and working with exciting new technologies like Three.js, WebGL, Blender among other fun animation tools.</p>
                  
                  <p>I am always available to discuss your project over the phone or via Skype. </p>
                  </Card>
                  </div>
                </div>
              </Col>
              <Col className="mobile-banner-image" span={12}>
                <QueueAnim
                  delay={300}
                  ease="easeOutQuart"
                  className="banner-image about-banner-image-mobile"
                >
                  <BannerImage />
                </QueueAnim>
              </Col>
            </Row>
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}

export default Banner
