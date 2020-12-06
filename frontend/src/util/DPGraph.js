const MAXWT = 99999

function find(parent, i){
  if(parent[i] == i){
    return i
  }
  return find(parent, parent[i])
}

function union(parent, rank, x, y){
  let xroot = find(parent, x)
  let yroot = find(parent, y)

  if(rank[xroot] < rank[yroot]){
    parent[xroot] = parent[yroot]
  }
  else if(rank[xroot] > rank[yroot]){
    parent[yroot] = parent[xroot]
  }
  else{
    parent[yroot] = parent[xroot]
    rank[xroot]++
  }
}

export const kruskalGraph = (graph) => {
  let result = []
  let i = 0, e = 0
  let length = graph.nodes.length

  graph.edges.sort((a,b) => (a.label > b.label) ? 1 : -1)

  let parent = []
  let rank = []

  for(let v = 0; v < length; v++){
    parent.push(v)
    rank.push(0)
  }

  while(e < length - 1){
    let u = graph.edges[i].from
    let v = graph.edges[i].to
    let w = graph.edges[i].label

    i++

    let x = find(parent, u)
    let y = find(parent, v)

    if(x != y){
      e++
      result.push([u, v, w])
      union(parent, rank, x, y)
    }
    
  }


  result.map(r => {
    console.log(`${r[0]} -> ${r[1]} = ${r[2]}`)
  })

  return result
}

