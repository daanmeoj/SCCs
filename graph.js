const lineReader = require("line-reader");
var vertexIndex;
var tail, head;

// create a graph class
module.exports = class Graph {
  // defining vertex array and
  // adjacent list
  constructor(noOfVertices) {
    this.noOfVertices = noOfVertices;
    this.AdjList = new Map();
  }

  addVertices(noOfVertices, callback) {
    for (var i = 0; i < noOfVertices; i++) {
      //vertexIndex = i + 1;
      vertexIndex = i;
      this.addVertex(vertexIndex.toString());
    }
    if (callback) {
      callback();
    }
  }

  // add vertex to the graph
  addVertex(v) {
    // initialize the adjacent list with a
    // null array
    this.AdjList.set(v, []);
  }

  addEdge(v, w) {
    // get the list for vertex v and put the
    // vertex w denoting edge between v and w
    this.AdjList.get(v).push(w);

    // Since graph is undirected,
    // add an edge from w to v also
    //this.AdjList.get(w).push(v);
  }

  addEdgesFromtxt(txtPath, callback) {
    lineReader.eachLine(
      txtPath,
      function (line) {
        tail = line.split(" ")[0];
        head = line.split(" ")[1];
        this.addEdge(tail, head);
      }.bind(this),
      callback
    );
  }

  getTranspose(callback) {
    var g = new Graph(this.noOfVertices);
    g.addVertices(
      this.noOfVertices,
      function () {
        for (var vertex = 0; vertex < this.noOfVertices; vertex++) {
          var get_neighbours = this.AdjList.get(vertex.toString());
          //console.log(get_neighbours);
          for (var edge of get_neighbours) {
            // g.addEdge(edge, vertex.toString());
            //console.log(`edge${edge},vertex${vertex}`);

            g.addEdge(edge, vertex.toString());
          }
        }
        callback(g);
      }.bind(this)
    );
  }

  printGraph() {
    // get all the vertices
    var get_keys = this.AdjList.keys();

    // iterate over the vertices
    for (var i of get_keys) {
      // great the corresponding adjacency list
      // for the vertex
      var get_values = this.AdjList.get(i);
      var conc = "";

      // iterate over the adjacency list
      // concatenate the values into a string
      for (var j of get_values) conc += j + " ";

      // print the vertex and its adjacency list
      console.log(i + " -> " + conc);
    }
  }

  // Main DFS method
  dfs(startingNode) {
    var visited = {};

    this.DFSUtil(startingNode, visited);
  }

  // Main DFS method
  fillOrder(vert, visited, stack, callback) {
    visited[vert] = true;

    var get_neighbours = this.AdjList.get(vert);
    for (var edge of get_neighbours) {
      if (!visited[edge]) {
        this.fillOrder(edge, visited, stack);
      }
    }
    stack.push(vert);
    if (callback) {
      callback();
    }
  }

  // Recursive function which process and explore
  // all the adjacent vertex of the vertex with which it is called
  DFSUtil(vert, visited) {
    visited[vert] = true;
    console.log(`${vert},`);
    var get_neighbours = this.AdjList.get(vert);

    for (var i in get_neighbours) {
      var get_elem = get_neighbours[i];
      if (!visited[get_elem]) this.DFSUtil(get_elem, visited);
    }
  }
};
