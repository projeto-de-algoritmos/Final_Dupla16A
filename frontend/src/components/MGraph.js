import React, { useState } from 'react';
import Graph from "react-graph-vis";
import { level } from '../levels.js'

const MGraph = ({events, network}) => {
  const [graph, setGraph] = useState(level.levelSP);
 
  const options = {
    layout: {
    },
    edges: {
      color: "#000000"
    },
    height: "700px",
  };
 
  return (
			<Graph
				getNetwork={network}
				graph={graph}
				options={options}
				events={events}
			/>
  );
}

export default MGraph;

