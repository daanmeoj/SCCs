const lineReader = require("line-reader");
const Graph = require("./graph.js");
var tail, head;
var vertexIndex;

// // Using the above implemented graph class
var g = new Graph(875714);
var gRev = new Graph(875714);

// adding vertices
for (var i = 0; i < 875714; i++) {
  vertexIndex = i + 1;
  g.addVertex(vertexIndex.toString());
  gRev.addVertex(vertexIndex.toString());
}

setTimeout(() => {
  lineReader.eachLine("./SCC.txt", function (line) {
    tail = line.split(" ")[0];
    head = line.split(" ")[1];
    g.addEdge(tail, head);
    gRev.addEdge(head, tail);
  });
}, 20000);

setTimeout(() => {
  //g.dfs("1");
  gRev.dfs("1");
  //gRev.printGraph();
}, 140000);
