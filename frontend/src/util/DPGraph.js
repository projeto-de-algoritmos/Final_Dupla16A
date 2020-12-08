const MAXWT = 99999

export const bellmanFord = (graph, begin, end) => {
  let dist = []
  let length = graph.nodes.length
  for(let i = 0; i < length; i++){
    dist[i] = MAXWT
  }

  dist[begin] = 0

  let edgeLen = graph.edges.length
    for(let j = 0; j < edgeLen; j++){
      let currEdge = graph.edges[j]
      let w = parseInt(currEdge.label)
      if(dist[currEdge.from] != MAXWT && dist[currEdge.from] + w < dist[currEdge.to]){
        dist[currEdge.to] = dist[currEdge.from] + w
      }
    }

    for(let j = 0; j < edgeLen; j++){
      let currEdge = graph.edges[j]
      let w = parseInt(currEdge.label)
      if(dist[currEdge.from] != MAXWT &&
         dist[currEdge.from] + w < dist[currEdge.to]){
        console.log('Ciclo negativo')
        return -1
      }
    }

  console.log(dist)
  return dist[end]
}
