class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex)
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    vertexArray.forEach(vertex => this.nodes.add(vertex))
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2)
    v2.adjacent.add(v1)
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2)
    v2.adjacent.delete(v1)
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    // loop through the adjacent nodes
    for (let neighbor of vertex.adjacent){
      this.removeEdge(vertex, neighbor)
    }

    this.nodes.delete(vertex)
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start, values=[start.value], nodes=new Set([start])) {

    for(let neighbor of start.adjacent){
      if (!nodes.has(neighbor)){
        nodes.add(neighbor)
        values.push(neighbor.value)
        this.depthFirstSearch(neighbor, values, nodes)
      }
    }
    return values
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    const queue = [start]
    const visited = new Set()
    const values = []

    while(queue.length){
      let current = queue.shift()
      if(!visited.has(current)){
        visited.add(current)
        values.push(current.value)
        for(let neighbor of current.adjacent){
          queue.push(neighbor)
        }
      }
    }
    return values
  }
}

module.exports = {Graph, Node}