(function() {
  _         = require('underscore');

  function process_read(read, probes, callback) {
    var i,
        r_length = read.length,
        p_length = _.keys(probes)[0].length,
        sub_read,
        middle = parseInt(p_length/2, 10),
        ref, _var,
        nt, // Nucleotide at middle
        index_hit; // index in array of hits

    for(i=0; (r_length-i)>=p_length; i++) { // slide a window of size p_length across the read

      // Capture the middle nucleotide and change it for an 'N'
      sub_read = read.substring(i, i+p_length);
      nt       = sub_read[middle];
      sub_read = sub_read.substr(0, middle) + 'N' + sub_read.substr(middle+1, p_length);

      if (probes[sub_read]) { // hit
        pid  = probes[sub_read].id; // probe id
        ref  = probes[sub_read].ref;
        _var = probes[sub_read]["var"];
        // Only callback if the allele seen matches the ref or var for the probe
        if (nt === ref)  callback(pid, "R");
        else if (nt === _var) callback(pid, "V");
        else callback(0, '');
      }
    }
  }

  exports.process_read = process_read;
}());
