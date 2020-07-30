import React from "react"
// @jsx jsx
import { jsx } from "theme-ui"

const wh = { width: `100vw`, textAlign: `left` };

const Inner = ({ className, children }) => (
  <div className={className} sx={wh}>
    {children}
  </div>
)

export default Inner
