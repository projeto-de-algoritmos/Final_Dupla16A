import React, { useState } from 'react';
import MGraph from './MGraph'
import { genGraph } from '../util/GraphGen'
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function checkNode(graph, list, newItem){
	console.log('new item', newItem)
	var validation = false;
	console.log('entrei', list)
	graph.edges.forEach((item, index) => {
		if(list[list.length - 1].id === item.from && newItem.id === item.to){
			validation = true;
		}
	})
	return validation;
}
const QuestCatalog = () => {
	const [graph, setGraph] = useState(genGraph(10))
  const [selectedList, setSelectedList] = useState([]); 
  const [quests, setQuests] = useState([]); 
  const [network, setNetwork] = useState();
  const classes = useStyles();

  const handleSelect = {
		selectNode: function (event) {
			var { nodes, edges } = event;
			var newGraph = graph;
			newGraph.nodes.forEach((item, index) => {
				if (item.id === nodes[0]){
					var newItem = true;
					selectedList.forEach((lista, index) => {
						if(lista.id === item.id)
							newItem = false;
					})
					if(newItem){
						if(selectedList.length == 0){
							newGraph.nodes[index] = {...item, 'color': {
								background: 'rgba(50,205,50, 1)',
								border: 'rgba(50,161,47, 1)'
							}}
							setSelectedList([...selectedList, item]);
						}
						else if(checkNode(graph, selectedList, item)){
							newGraph.nodes[index] = {...item, 'color': {
								background: 'rgba(50,205,50, 1)',
								border: 'rgba(50,161,47, 1)'
							}}
							setSelectedList([...selectedList, item]);
						}
					}
				}
			})
			setGraph(newGraph);
			network.setData(graph)
			console.log('selectedList', selectedList)
		}
	}

	return (
		<div>
			<div style={{justifyContent: 'center', display: 'flex'}}>
				<Button onClick={() => {}}>Melhor caminho possível</Button>
			</div>
			<div>
				<MGraph network={graph} setNetwork={setNetwork}handler={handleSelect}/>
			</div>
		</div>
	);
}
export default QuestCatalog;

