/*
 * Per each hit (to any of the probes) we have to recompute the matrix that
 * will be use in the clients to visualize the heatmap.
 *
 * The counts object keeps track of the hits per each probe.
 *
 * When this module is loaded, we have an empty matrix and an empty counts
 * object.
 *
 * When a new hit is received the code using this module should use the add
 * function. In this function, we update the counts and we update the heatmap
 * matrix. The HMM has to be accessed twice (if previous hits for that probe
 * already exists) since the ratio of ref/var for the probe has changed.
 */
var _           = require('underscore'),
    counts      = {},
    matrix      = create_square_matrix(30);

function create_square_matrix(size) {
  var m = [],i,j;

  for(i=0; i<size; i++) {
    m[i] = [];
    for(j=0; j<size; j++) {
      m[i].push(0);
    }
  }
  return m;
}

function add(id, ref_or_var) {
  var cc_ref, cc_var; // current ref/var counts

  if (counts.hasOwnProperty(id)) {
    cc_ref = counts[id].r;
    cc_var = counts[id].v;
    matrix[cc_ref][cc_var]--;
  }
  else
    counts[id] = {r:0, v:0};

  if      (ref_or_var === 'R') counts[id].r++;
  else if (ref_or_var === 'V') counts[id].v++;

  matrix[counts[id].r][counts[id].v]++;
}

exports.create_square_matrix = create_square_matrix;
exports.add                  = add;
exports.matrix               = matrix;
