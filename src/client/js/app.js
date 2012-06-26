function main() {
  console.log("Starting js...");
  heatmap.empty(heatmap.random_data(), {}, "#heatmap");
  heatmap.display_palette();

  /*
  var socket = io.connect('http://localhost:8080');
  socket.on('message', function(data){
    //d3.select("#log").text(data);
    $("pre").append(data + "\n");
  });
  */
}
