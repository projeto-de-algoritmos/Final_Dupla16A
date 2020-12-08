const MAXWT = 99999

export const bellmanFord = (graph, begin, end) => {
  let dist = []
  let length = graph.nodes.length
  for(let i = 0; i < length; i++){
    dist[i] = MAXWT
  }

  dist[begin] = 0

  let edgeLen = graph.edges.length
  for(let i = 0; i < length; i++)
    for(let j = 1; j < edgeLen; j++){
      let currEdge = graph.edges[j]
      let w = parseInt(currEdge.label)
      if(dist[parseInt(currEdge.from)] != MAXWT && dist[parseInt(currEdge.from)] + w < dist[parseInt(currEdge.to)]){
        dist[parseInt(currEdge.to)] = dist[parseInt(currEdge.from)] + w
      }
    }
    console.log(dist)

    for(let j = 1; j < edgeLen; j++){
      let currEdge = graph.edges[j]
      let w = parseInt(currEdge.label)
      if(dist[parseInt(currEdge.from)] != MAXWT &&
         dist[parseInt(currEdge.from)] + w < dist[parseInt(currEdge.to)]){
        console.log('Ciclo negativo')
        return "cycle"
      }
    }

  return dist[end]
}
