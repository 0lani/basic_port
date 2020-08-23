import React from "react"
import VisibilitySensor from "react-visibility-sensor"
import { Spring, Trail, animated } from "react-spring/renderprops"
import { Row, Col } from "antd"
import context from "./data/servicesData"
import "../../../resources/less/services.less"

const Services = ({windowSize}) => {
  const {width} = windowSize
  const isMobile = width <= 896;

  const mobileTransform = isMobile ? `translateX(200px)` : `translateX(400px)`;
  const mobileX = isMobile ? -200 : -400;

  return (
    <React.Fragment>
      <article className="home-serve-wrapper">
        <Row type="flex" justify="center" className="home-layout">
          <VisibilitySensor partialVisibility={true} delayedCall={true}>
            {({ isVisible }) => (
              <Spring
                delay={300}
                to={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? `translateX(0)` : mobileTransform,
                }}
              >
                {props => (
                  <React.Fragment>
                    <div style={{ ...props }} className="home-serve">
                      <h3 className="main-title">Skills</h3>
                      <i className="line" />
                      {child(context, isVisible, mobileX)}
                    </div>
                  </React.Fragment>
                )}
              </Spring>
            )}
          </VisibilitySensor>
        </Row>
      </article>
    </React.Fragment>
  )
}

const child = (context, isVisible, isMobile) => (
  context.map(node => {
    const {
      content,
      slug,
      title,
      acf: {
        service_img: {
          localFile: {
            childImageSharp: {
              fluid: { src },
            },
          },
        },
      },
    } = node;

    const items = [
      <div key={slug}>
        <h3>{title}</h3>
        <i className="line" />
        <div>
          <p>
            <em>{content}</em>
          </p>
        </div>
      </div>,
    ]
    return (
      <React.Fragment>
        <Col span={8} className="col">
          <div className="content-wrapper home-hover">
            <img className="image" src={src} />
            <div className="content-wrapper-services">
              <Trail
                native
                delay={300}
                initial={null}
                items={items}
                from={{ opacity: 0, x: isMobile }}
                to={{
                  opacity: isVisible ? 1 : 0.25,
                  x: isVisible ? 0 : isMobile,
                }}
              >
                {item => ({ x, opacity }) => (
                  <animated.div
                    className="box"
                    style={{
                      opacity,
                      transform: x.interpolate(x => `translate3d(${x}%,0,0)`),
                    }}
                  >
                    {item}
                  </animated.div>
                )}
              </Trail>
            </div>
          </div>
        </Col>
      </React.Fragment>
    )
  })
);
export default Services
