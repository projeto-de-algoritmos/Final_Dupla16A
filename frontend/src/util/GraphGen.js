const DIR = 'hehe/'
export const genGraph = (num) => {
  let base = []
  let nodes = []
  let edges = []

  for(let i = 0; i < num; i++){
    let aux = {
      id: i,
      image: `${DIR}Network-Pipe-icon.png`,
      shape: 'image',
      edges: []
    }

    let edge_count = Math.floor(((Math.random() * num) + 1)/2)
    let edge_list = []
    
    for(let j = 0; j < edge_count; j++){
      let newEdge = Math.floor(Math.random() * num)
      while(edge_list.includes(newEdge)){
        newEdge = Math.floor(Math.random() * num)
      }
      edge_list.push(newEdge)
      aux.edges.push(newEdge)
    }

    base.push(aux)
  }

  for(let i = 0; i < num; i++){
    nodes.push({id: base[i].id, image: base[i].image, shape: base[i].shape})
    for(let j = 0; j < base[i].edges.length; j++){
      edges.push({from: base[i].id, to: base[i].edges[j]})
    }
  }

  let res = {
    nodes: nodes,
    edges: edges
  }

  console.log(res)

  return base
}
