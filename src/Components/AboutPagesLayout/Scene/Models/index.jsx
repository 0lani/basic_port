import React, { useRef } from "react";
import { useFrame } from "react-three-fiber";

import Cube from "./cubeConfig";

export default () => {
  const group = useRef();

  useFrame(() => {
    group.current.rotation.y += 0.005;
  });
  let nodesCubes = [];
  for (let i = 0; i <= 78; i++) {
    nodesCubes.push(<Cube key={i} />);
  }

  return <group ref={group}>{nodesCubes}</group>;
};
