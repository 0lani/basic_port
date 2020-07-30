import React from "react"
// @css css
import { css } from "theme-ui"
import { ParallaxLayer } from "react-spring/renderprops-addons";

const Content = ({
  speed,
  offset,
  children,
  factor,
}) => (
  <ParallaxLayer
    css={css({
      padding: [3, 4, 4, 5],
      display: `flex`,
      flexDirection: `column`,
      alignItems: `center`,
      justifyContent: `center`,
      zIndex: 1,
    })}
    speed={speed}
    offset={offset}
    factor={factor || 1}
  >
    {children}
  </ParallaxLayer>
)

export default Content
