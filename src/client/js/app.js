function main() {
  console.log("Starting js...");
  heatmap.empty(heatmap.random_data(), {}, "#heatmap");
  heatmap.display_palette();

  // Connect via socket.io to communicate with the server
  // in the socket we will get the updates for the heatmap
  var socket = io.connect('http://localhost:8080'),
      jdata; // json data

  socket.on('message', function(data){
    jdata = JSON.parse(data);
    if (jdata.type === 'info') {
      d3.select("#info")
        .text("# reads processed: " + jdata.n_reads + " | # of hits: " + jdata.n_hits);
    }
    else if (jdata.type === 'heatmap') {
      heatmap.update(jdata);
    }
  });
}
