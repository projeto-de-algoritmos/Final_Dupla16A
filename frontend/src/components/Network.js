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
  const [selectedList, setSelectedList] = useState([{
				id: '3',
				image: `https://e7.pngegg.com/pngimages/607/275/png-clipart-computer-icons-cell-site-tower-aerials-symbol-miscellaneous-text.png`,
				shape: 'circularImage',
				background: '#000',
				color: {
					border: 'blue'
				},
				borderWidth: 10,
				edges: []
			}]); 
	const [caminho, setCaminho] = useState(0)
  const [network, setNetwork] = useState();
	const [graph, setGraph] = useState({nodes: [], edges: []})
  const classes = useStyles();

	useEffect(() => {
		setCaminho(0)
		setSelectedList([{
				id: '3',
				image: `https://e7.pngegg.com/pngimages/607/275/png-clipart-computer-icons-cell-site-tower-aerials-symbol-miscellaneous-text.png`,
				shape: 'circularImage',
				background: '#000',
				color: {
					border: 'blue'
				},
				borderWidth: 10,
				edges: []
			}])
		if(network !== undefined)
		network.setData(graph)
	}, [graph])

	useEffect(() => {
		setCaminho(0)
		console.log('a')
		setSelectedList([{
				id: '3',
				image: `https://e7.pngegg.com/pngimages/607/275/png-clipart-computer-icons-cell-site-tower-aerials-symbol-miscellaneous-text.png`,
				shape: 'circularImage',
				background: '#000',
				color: {
					border: 'blue'
				},
				borderWidth: 10,
				edges: []
			}])
		setGraph(genGraph(level, initialNode, finalNode))
	}, [])
	function checkNode(graph, newItem){
				console.log("newItem", newItem)
				console.log("selectedList", selectedList)
		var validation = false;
		graph.edges.forEach((item, index) => {
			if(selectedList[selectedList.length - 1].id === item.from && newItem.id === item.to && newItem.id !== initialNode.id){
				validation = true;
			}
		})
		return validation;
	}

  const handleSelect = {
		selectNode: function (event) {
			var { nodes, edges } = event;
			var newGraph = graph;
			var meioCaminho
			if(selectedList.length !== 0)
				newGraph.edges.forEach(elem => {
					if(elem.from == selectedList[selectedList.length-1].id && elem.to == nodes[0]){
						meioCaminho = caminho+parseInt(elem.label,10)
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
				console.log('nodes', nodes)
				console.log('item', item)
						if(checkNode(graph, item)){
							console.log('n 1', newItem)
							console.log('finalNode', finalNode)
							if(item.id != finalNode){
								console.log('n 2', newItem)
								newGraph.nodes[index] = {...item, 'color': {
									border: 'green'
								}, borderWidth: 10}
							}
							else {
								var currentLevel = level
								console.log('n 3', newItem)
								console.log('caminho', caminho)
								if (bellmanFord(graph, initialNode, finalNode) !== meioCaminho){
									console.log('n 4', newItem)
									alert('Caminho errado');
								}
								else{
									console.log('n 5', newItem)
									currentLevel += 2
									alert('Caminho correto');
								}
								newGraph = genGraph(currentLevel, initialNode, finalNode)
								setLevel(currentLevel)
								setSelectedList([{
										id: '3',
										image: `https://e7.pngegg.com/pngimages/607/275/png-clipart-computer-icons-cell-site-tower-aerials-symbol-miscellaneous-text.png`,
										shape: 'circularImage',
										background: '#000',
										color: {
											border: 'blue'
										},
										borderWidth: 10,
										edges: []
									}])
							setGraph(genGraph(level, initialNode, finalNode))
							}
						}
						console.log('newGraph', newGraph)
						network.setData(newGraph)
						setGraph(newGraph);
					}
					setSelectedList([...selectedList, item]);
				}
			})
			console.log('selectedList', selectedList)
			console.log('graph', graph)
		}
	}

	const verifyCycle = () => {
		var newGraph;
		if(bellmanFord(graph, 3, 8) === 'cycle'){
			newGraph = genGraph(level, initialNode, finalNode)
			setLevel(level + 2)
			setSelectedList([{
					id: '3',
					image: `https://e7.pngegg.com/pngimages/607/275/png-clipart-computer-icons-cell-site-tower-aerials-symbol-miscellaneous-text.png`,
					shape: 'circularImage',
					background: '#000',
					color: {
						border: 'blue'
					},
					borderWidth: 10,
					edges: []
				}])
			setGraph(genGraph(level, initialNode, finalNode))
			alert('Resposta correta')
		}
		else{
			newGraph = genGraph(level, initialNode, finalNode)
			setLevel(level)
			setSelectedList([{
					id: '3',
					image: `https://e7.pngegg.com/pngimages/607/275/png-clipart-computer-icons-cell-site-tower-aerials-symbol-miscellaneous-text.png`,
					shape: 'circularImage',
					background: '#000',
					color: {
						border: 'blue'
					},
					borderWidth: 10,
					edges: []
				}])
			setGraph(genGraph(level, initialNode, finalNode))
			alert('Resposta errada')
		}
	}

	return (
		<div>
			<div style={{justifyContent: 'center', display: 'flex'}}>
				<Button onClick={() => verifyCycle()}>Ciclo negativo!</Button>
			</div>
			<div>
				<MGraph network={graph} setNetwork={setNetwork}handler={handleSelect}/>
			</div>
		</div>
	);
}
export default QuestCatalog;

