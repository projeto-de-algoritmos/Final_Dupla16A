import React, { useState } from 'react';
import MGraph from './MGraph'
import { genGraph } from '../util/GraphGen'
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { kruskalGraph } from '../util/DPGraph'

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

const QuestCatalog = () => {
  const [level, setLevel] = useState(10); 
	var initialNode = Math.floor(Math.random()*level)
	console.log("initial", initialNode)
	var finalNode = initialNode;
	while (finalNode === initialNode)
		finalNode = Math.abs(Math.floor(Math.random()*level) - initialNode)
	console.log("final", finalNode)
	const [graph, setGraph] = useState(genGraph(level, initialNode, finalNode))
	graph.nodes.map((item, index) => {
		if (index == initialNode)
			initialNode = item
	})
  const [selectedList, setSelectedList] = useState([initialNode]); 
  const [network, setNetwork] = useState();
  const classes = useStyles();

	function checkNode(graph, list, newItem){
		console.log('new item', newItem)
		var validation = false;
		graph.edges.forEach((item, index) => {
			if(list[list.length - 1].id === item.from && newItem.id === item.to && newItem.id !== initialNode.id){
				validation = true;
			}
		})
		return validation;
	}


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
								border: 'rgba(50,161,47, 1)'
							}, borderWidth: 10}
							setSelectedList([...selectedList, item]);
						}
						else if(checkNode(graph, selectedList, item)){
							if(item.id != finalNode){
								newGraph.nodes[index] = {...item, 'color': {
									border: 'rgba(50,161,47, 1)'
								}, borderWidth: 10}
								setSelectedList([...selectedList, item]);
							}
							else {
								setSelectedList([...selectedList, item]);
								verificarCaminho().map((item, index) => {
									if(item.id !== selectedList[index].id){
										setLevel(level)
										alert('Caminho errado');
										return;
									}
									else{
										setLevel(level + 10)
										alert('Caminho correto');
										return;
									}
								})
							}
						}
					}
				}
			})
			setGraph(newGraph);
			network.setData(graph)
			console.log('selectedList', selectedList)
			console.log('graph', graph)
		}
	}

	return (
		<div>
			<div style={{justifyContent: 'center', display: 'flex'}}>
				<Button onClick={() => {console.log('kruskal', kruskalGraph(graph))}}>Melhor caminho possível</Button>
			</div>
			<div>
				<MGraph network={graph} setNetwork={setNetwork}handler={handleSelect}/>
			</div>
		</div>
	);
}
export default QuestCatalog;

