var heatmap = {};

heatmap.cc_sel     = "#color-chart"; // color-chart section id
heatmap.sel        = "#heatmap";
heatmap.chart      = null;
heatmap.size       = 20;
heatmap.domain_max = 100;
heatmap.range_max  = 100;
heatmap.random     = function(m) { return Math.floor((Math.random()*m)+1); };
heatmap.trans_x    = 25,
heatmap.trans_y    = 25;

// Display the palette
heatmap.display_palette = function() {
  var range = heatmap.scale.range();

  var palette = d3.select(heatmap.cc_sel)
                  .append("div")
                    .attr("class", "color palette");

  var swatch = palette.selectAll(".swatch")
                  .data(range)
                  .enter().append("div")
                    .attr("class", "swatch")
                    .style("background", String);

  // Add text for the start/end of the pallete values
  d3.select("#pmin").text(0);
  d3.select("#pmax").text(heatmap.domain_max);
};

// Generate a range of colors for the scale
heatmap.gen_range = function() {
  var n_colors = 30,
      white = d3.rgb("white"), i, new_color, range = [];

  range.push(white.toString());
  new_color = white;
  for(i=0; i<n_colors-1; i++) {
    new_color = new_color.darker(0.2);
    range.push(new_color.toString());
  }
  return range;
};

heatmap.scale = d3.scale.quantile()
  .domain([0, heatmap.domain_max])
  .range(heatmap.gen_range());

// Build a string to id a particular cell in the heatmap
heatmap.s_cell = function(cell) {
  return "r" + cell.r + "v" + cell.v;
};

heatmap.empty = function (data, extras, sel) {
  var width   = typeof extras.width   === 'undefined' ? 600 : extras.width,
      height  = typeof extras.height  === 'undefined' ? 400 : extras.height;

  var cell_size = 15;

  heatmap.chart = d3.select(heatmap.sel)
        .append("svg")
         .attr("class", "chart")
         .attr("width", width)
         .attr("height", height)
       .append("g")
         .attr("transform",
               "translate(" + heatmap.trans_x + "," + heatmap.trans_y + ")"); // Move the points in the object by (x, y)

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
  console.log(">> Update: " + c.c + "|"+ heatmap.scale(c.c));
  heatmap.chart
    .select("#" + heatmap.s_cell(c))
    .style("fill", heatmap.scale(c.c));
};

heatmap.random_data = function() {
  var d = [], i, j;

  for(i=0; i<heatmap.size; i++)
    for(j=0; j<heatmap.size; j++)
      d.push({r:i, v:j, c:heatmap.random(heatmap.domain_max)});
  return d;
};

heatmap.random_datum = function () {
  var r = heatmap.random;
  return {r:r(heatmap.size), v:r(heatmap.size), c:r(heatmap.domain_max)};
};

