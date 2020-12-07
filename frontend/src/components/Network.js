import React, { useState, useEffect } from 'react';
import MGraph from './MGraph'
import { genGraph } from '../util/GraphGen'
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { bellmanFord } from '../util/DPGraph'

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
	var initialNode = 3
	var initial
	var finalNode = 8
	const [graph, setGraph] = useState(genGraph(level, initialNode, finalNode))
  const [selectedList, setSelectedList] = useState([]); 
	const [caminho, setCaminho] = useState(0)
  const [network, setNetwork] = useState();
  const classes = useStyles();
	if(selectedList.length === 0){
		graph.nodes.map((item, index) => {
			if (index == initialNode)
				initial = item
		})
		console.log('initial', initial)
		setSelectedList([initial])
	}

	useEffect(() => {
		console.log('a')
		if(network !== undefined){
			setGraph(genGraph(level, initialNode, finalNode))
			network.setData(graph)
		}
	}, [level])

	function checkNode(graph, list, newItem){
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
			if(selectedList.length !== 0)
				newGraph.edges.forEach(elem => {
					if(elem.from == selectedList[selectedList.length-1].id && elem.to == nodes[0]){
						setCaminho(caminho+parseInt(elem.label,10))
					}
				})
			newGraph.nodes.forEach((item, index) => {
				if (item.id === nodes[0]){
					var newItem = true;
					selectedList.forEach((lista, index) => {
						if(lista.id === item.id)
							newItem = false;
					})
					if(newItem){
						if(checkNode(graph, selectedList, item)){
							console.log('new item', newItem)
							console.log('finalNode', finalNode)
							if(item.id != finalNode){
								newGraph.nodes[index] = {...item, 'color': {
									border: 'rgba(50,161,47, 1)'
								}, borderWidth: 10}
								setSelectedList([...selectedList, item]);
							}
							else {
								console.log('caminho', caminho)
								setSelectedList([...selectedList, item]);
								if (bellmanFord(graph, initialNode, finalNode) !== caminho){
									alert('Caminho errado');
									setLevel(level)
								}
								else{
									setLevel(level + 10)
									alert('Caminho correto');
								}
								newGraph = genGraph(level, initialNode, finalNode)
							}
						}
						setGraph(newGraph);
						network.setData(graph)
					}
				}
			})
			console.log('selectedList', selectedList)
			console.log('graph', graph)
		}
	}

	return (
		<div>
			<MGraph network={graph} setNetwork={setNetwork}handler={handleSelect}/>
		</div>
	);
}
export default QuestCatalog;

