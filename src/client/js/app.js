function main() {
  console.log("Starting js...");
  heatmap.empty(heatmap.random_data(), {}, "#heatmap");
  heatmap.display_palette();

  // Connect via socket.io to communicate with the server
  // in the socket we will get the updates for the heatmap
  var socket = io.connect('http://localhost:8080');
  socket.on('message', function(data){
    console.log(data);
  });
}
