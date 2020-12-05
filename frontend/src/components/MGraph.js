import React, { useState } from 'react';
import Graph from "react-graph-vis";

const MGraph = ({ setNetwork, network, handler }) => {
  const [graph, setGraph] = useState(network);
 
  const options = {
    edges: {
      color: "#000000"
    },
		nodes: {
			borderWidth: 10,
			color: {
				border: 'green'
			}
		},
    height: "700px",
  };
 
  return (
			<Graph
				getNetwork={setNetwork}
				graph={graph}
				options={options}
				events={handler}
			/>
  );
}

export default MGraph;

