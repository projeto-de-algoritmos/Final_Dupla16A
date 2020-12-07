const DIR = '../images/'
export const genGraph = (num, initialNode, finalNode) => {
  let base = []
  let nodes = []
  let edges = []

  for(let i = 0; i < num; i++){
		let aux
		if(i === initialNode)
			aux = {
				id: i.toString(),
				image: `https://e7.pngegg.com/pngimages/607/275/png-clipart-computer-icons-cell-site-tower-aerials-symbol-miscellaneous-text.png`,
				shape: 'circularImage',
				background: '#000',
				color: {
					border: 'blue'
				},
				borderWidth: 10,
				edges: []
			}
		else if(i === finalNode)
			aux = {
				id: i.toString(),
				image: `https://e7.pngegg.com/pngimages/607/275/png-clipart-computer-icons-cell-site-tower-aerials-symbol-miscellaneous-text.png`,
				shape: 'circularImage',
				background: '#000',
				color: {
					border: 'red'
				},
				borderWidth: 10,
				edges: []
			}
		else
			aux = {
				id: i.toString(),
				image: `https://e7.pngegg.com/pngimages/607/275/png-clipart-computer-icons-cell-site-tower-aerials-symbol-miscellaneous-text.png`,
				shape: 'circularImage',
				background: '#000',
				borderWidth: '0',
				edges: []
			}

    let edge_count = Math.floor(((Math.random() * 3) + 2))
		if(edge_count === 0)
			edge_count++;
    let edge_list = []
    
    for(let j = 0; j < edge_count; j++){
      let newEdge = Math.floor(Math.random() * num).toString()
      while(edge_list.includes(newEdge) || newEdge == i){
        newEdge = Math.floor(Math.random() * num).toString()
      }
      edge_list.push(newEdge)
      aux.edges.push(newEdge)
    }

    base.push(aux)
  }

  for(let i = 0; i < num; i++){
    nodes.push({borderWidth: base[i].borderWidth, color: base[i].color, id: base[i].id, image: base[i].image, shape: base[i].shape})
    for(let j = 0; j < base[i].edges.length; j++){
      edges.push({
        from: base[i].id,
        to: base[i].edges[j],
        label: ((Math.floor(Math.random() * 35) + 1) * ((Math.round(Math.random()*10)) - 2)).toString(),
        length: 300
      })
    }
  }

  let res = {
    nodes: nodes,
    edges: edges
  }


  return res
}
