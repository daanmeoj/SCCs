const Graph = require("./graph.js");
// const numberOfNodes = 875714;
// const txtPath = "./SCC.txt";

const numberOfNodes = 5;
const txtPath = "./input.txt";

// // Using the above implemented graph class
var g = new Graph(numberOfNodes);

var p = g.addVertices(numberOfNodes);
p.then(() => {
  var r = g.addEdgesFromtxt(txtPath);
  var q = r.then(() => {
    g.printGraph();
    var s = g.getTranspose();
    s.then((gr) => {
      gr.printGraph();
      var stack = [];
      var visited = {};
      var iAux = undefined;
      for (var i = 0; i < numberOfNodes; i++) {
        iAux = i + 1;
        if (!visited[i]) {
          g.fillOrder(i.toString(), visited, stack, function () {
            visited = {};
            console.log(stack.length);
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
