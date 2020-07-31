import React from "react"
import { css } from "theme-ui"

const Inner = ({ className, children }) => (
  <div className={className} css={css({width: `100vw`, textAlign: `left`})}>
    {children}
  </div>
)

export default Inner
