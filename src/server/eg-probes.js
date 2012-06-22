(function () {
  var lr     = require('./line-reader'),
      _      = require('underscore'),
      probes = {};

  /* Reverse complement a chunck of DNA */
  function reverse_comp(seq) {
    var rc_table = { 'A':'T', 'C':'G', 'G':'C', 'T':'A', 'N':'N' },
        rev_seq  = seq.split('').reverse().join(''),
        i,
        rc_seq   = '';

    for (i=0; i<seq.length; ++i) { rc_seq += rc_table[rev_seq[i]]; }
    return rc_seq;
  }

  /* Hash a probe provided in a line (string) */
  function hash_probe(line) {
    var al     = line.split('\t'),
        seq    = al[3] + 'N' + al[4],
        rc_seq = reverse_comp(seq);

    probes[seq]    = { "id" : al[2], "ref" : al[5], "var" : al[6] };
    probes[rc_seq] = { "id" : al[2], "ref" : al[5], "var" : al[6] };
  }

  exports.hash_probe   = hash_probe;
  exports.probes       = probes;
  exports.reverse_comp = reverse_comp;
}());
