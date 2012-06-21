var vows      = require('vows'),
    assert    = require('assert'),
    _         = require('underscore'),
    eg        = require('../src/server/eg-probes'),
    screening = require('../src/server/eg-screening');

// Screening suite
vows.describe('The logic for screening reads against probes').addBatch({
  'A hit is found (both strands)...': {
    topic: function() {
      var line   = "1\t100006955\trs4908018\tTTTGTCTAAAACAAC\tCTTTCACTAGGCTCA\tC\tA",
          probes = eg.hash_probe(line),
          seq    = "TGAGCCTAGTGAAAGNGTTGTTTTAGACAAA",
          rc     = "TTTGTCTAAAACAACNCTTTCACTAGGCTCA",
          ref    = 'C',
          _var   = 'A';

      return {
        ref                      : ref,
        _var                     : _var,
        probes                   : eg.probes,
        seq                      : seq,
        rc                       : rc,
        id                       : "rs4908018",
        read_with_hit_ref        : "ACCGGT" + seq.replace(/N/, ref)  + "ACCTT",
        read_with_hit_var        : "ACCGGT" + seq.replace(/N/, _var) + "ACCTT",
        read_with_hit_others     : "ACCGGT" + seq.replace(/N/, 'T')  + "ACCTT",

        read_with_rc_hit_ref     : "CCCCCC" + rc.replace(/N/, ref)  + "CCCCC",
        read_with_rc_hit_var     : "CCCCCC" + rc.replace(/N/, _var)  + "CCCCC",
        read_with_rc_hit_others  : "CCCCCC" + rc.replace(/N/, 'T')  + "CCCCC",

        read_with_hit_beg_ref    : seq.replace(/N/, ref)  + "ACCTTACACTTACTAT",
        read_with_rc_hit_beg_ref : rc.replace(/N/, ref)  + "ACCTTACACTTACTAT",

        read_with_hit_end_var    : "AAAAAAAAAAA" + seq.replace(/N/, _var),
        read_with_rc_hit_end_var : "CCCCCCCCCCC" + rc.replace(/N/, _var)
      };
    },

    'hit ref': function(o) {
      screening.process_read(o.read_with_hit_ref, o.probes);
      assert.strictEqual(eg.probes[o.seq].hits.ref, 1);
      screening.process_read(o.read_with_rc_hit_ref, o.probes);
      assert.strictEqual(eg.probes[o.rc].hits.ref, 1);
    },

    'hit var': function(o) {
      screening.process_read(o.read_with_hit_var, o.probes);
      assert.strictEqual(eg.probes[o.seq].hits["var"], 1);
      screening.process_read(o.read_with_rc_hit_var, o.probes);
      assert.strictEqual(eg.probes[o.rc].hits["var"], 1);
    },

    'hit others': function(o) {
      screening.process_read(o.read_with_hit_others, o.probes);
      assert.strictEqual(eg.probes[o.seq].hits.others, 1);
      screening.process_read(o.read_with_rc_hit_others, o.probes);
      assert.strictEqual(eg.probes[o.rc].hits.others, 1);
    },

   'hit at the beginning ref': function(o) {
     screening.process_read(o.read_with_hit_beg_ref, o.probes);
     assert.strictEqual(eg.probes[o.seq].hits.ref, 2);
     screening.process_read(o.read_with_rc_hit_beg_ref, o.probes);
     assert.strictEqual(eg.probes[o.rc].hits.ref, 2);
    },

   'hit at the end var': function(o) {
     screening.process_read(o.read_with_hit_end_var, o.probes);
     assert.strictEqual(eg.probes[o.seq].hits["var"], 2);
     screening.process_read(o.read_with_rc_hit_end_var, o.probes);
     assert.strictEqual(eg.probes[o.rc].hits["var"], 2);
    }
  }

}).export(module);
