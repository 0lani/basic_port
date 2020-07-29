import React from "react"
// @jsx jsx
import { jsx } from "theme-ui"

type InnerProps = {
  className?: string
  children?: React.ReactNode
}

const wh: object = { width: `100vw`, textAlign: `left` };

const Inner = ({ className, children }: InnerProps) => (
  <div className={className} sx={wh}>
    {children}
  </div>
)

export default Inner
