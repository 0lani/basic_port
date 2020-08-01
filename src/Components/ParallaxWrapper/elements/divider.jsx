
import React from "react"
import { css } from "theme-ui"
import { ParallaxLayer } from "react-spring/renderprops-addons";

const Divider = ({
  speed,
  offset,
  factor,
  bg,
  fill,
  clipPath,
  children,
  className
}) => (
  <ParallaxLayer
    className={className}
    css={css({
      zIndex: -1,
      position: `absolute`,
      width: `full`,
      height: `full`,
      background: bg,
      backgroundColor: bg,
      "#contact-wave": {
        color: fill,
        fill: `currentColor`,
      },
      clipPath,
    })}
    speed={speed}
    offset={offset}
    factor={factor || 1}
  >
    {children}
  </ParallaxLayer>
)

export default Divider
