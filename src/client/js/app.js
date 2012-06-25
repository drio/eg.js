var heatmap = {};

heatmap.sel        = "#heatmap";
heatmap.chart      = null;
heatmap.size       = 30;
heatmap.domain_max = 100;
heatmap.range_max  = 100;
heatmap.random     = function(m) { return Math.floor((Math.random()*m)+1); };

// Generate a range of colors for the scale
heatmap.gen_range = function(n_colors) {
  var white = d3.rgb("white"), i, new_color, range = [];

  range.push(white.toString());
  new_color = white;
  for(i=0; i<n_colors-1; i++) {
    new_color = new_color.darker(3);
    range.push(new_color.toString());
  }
  return range;
};

heatmap.scale = d3.scale.linear()
  .domain([0, heatmap.domain_max])
  .range(heatmap.gen_range(heatmap.range_max));

// Build a string to id a particular cell in the heatmap
heatmap.s_cell = function(cell) {
  return "r" + cell.r + "v" + cell.v;
};

heatmap.empty = function (data, extras, sel) {
  var width  = typeof extras.width   === 'undefined' ? 800 : extras.width,
      height = typeof extras.height  === 'undefined' ? 700 : extras.height;

  var cell_size = 10;

  heatmap.chart = d3.select(heatmap.sel)
        .append("svg")
         .attr("class", "chart")
         .attr("width", width)
         .attr("height", height)
       .append("g");
       //  .attr("transform", "translate(" + trans_x + "," + trans_y + ")"); // Move the points in the object by (x, y)

  heatmap.chart.selectAll("rect")
    .data(data)
    .enter().append("rect")
      .attr("class", "day")
      .attr("width", cell_size)
      .attr("height", cell_size)
      .attr("x", function(d,i)  { return d.r * cell_size; })
      .attr("y", function(d,i)  { return d.v * cell_size; })
      .attr("id", function(d,i) { return heatmap.s_cell(d); });
};

heatmap.update = function(c) {
  heatmap.chart
    .select("#" + heatmap.s_cell(c))
    .style("fill", heatmap.scale(c.c));
};

heatmap.random_data = function() {
  var d      = [], i, j;

  for(i=0; i<heatmap.size; i++)
    for(j=0; j<heatmap.size; j++)
      d.push({r:i, v:j, c:heatmap.random(heatmap.domain_max)});
  return d;
};

heatmap.random_datum = function () {
  var r = heatmap.random;
  return {r:r(heatmap.size), v:r(heatmap.size), c:r(heatmap.domain_max)};
};

