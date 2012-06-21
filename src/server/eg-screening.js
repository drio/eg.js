(function() {
  _         = require('underscore');

  function process_read(read, probes) {
    var i,
        r_length = read.length,
        p_length = _.keys(probes)[0].length,
        sub_read,
        middle = parseInt(p_length/2, 10),
        ref, _var,
        nt, // Nucleotide at middle
        index_hit; // index in array of hits

    for(i=0; (r_length-i)>=p_length; i++) {
      sub_read = read.substring(i, i+p_length);
      nt       = sub_read[middle];
      sub_read = sub_read.substr(0, middle) + 'N' + sub_read.substr(middle+1, p_length);
      if (probes[sub_read]) { // hit
        ref  = probes[sub_read].ref;
        _var = probes[sub_read]["var"];
        if      (nt === ref)  index_hit = "ref";
        else if (nt === _var) index_hit = "var";
        else                  index_hit = "others";
        probes[sub_read].hits[index_hit]++;
      }
    }
  }

  exports.process_read = process_read;
}());
