const Graph = require("./graph.js");
const numberOfNodes = 875714;
const txtPath = "./SCC.txt";
// const numberOfNodes = 5;
// const txtPath = "./input.txt";

// // Using the above implemented graph class
var g = new Graph(numberOfNodes);

g.addVertices(numberOfNodes, function () {
  g.addEdgesFromtxt(txtPath, function () {
    //g.printGraph();
    g.getTranspose(function (gr) {
      //gr.printGraph();
      var stack = [];
      var visited = {};
      var iAux;
      for (var i = 0; i < numberOfNodes; i++) {
        iAux = i + 1;
        if (!visited[iAux]) {
          g.fillOrder(iAux.toString(), visited, stack, function () {
            visited = {};
            while (stack.length > 0) {
              var v = stack.pop();
              if (!visited[v]) {
                console.log(`for vertex ${v}:`);
                gr.DFSUtil(v, visited);
              }
            }
          });
        }
      }
    });
  });
});
