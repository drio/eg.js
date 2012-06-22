var vows   = require('vows'),
    assert = require('assert'),
    _      = require('underscore'),
    eg     = require('../src/server/eg-probes');

// Probes suite
vows.describe('test-eg-logic-probes').addBatch({
  'Reverse comlement is done right for': {
    topic: "TTTGTCTAAAACAACNCTTTCACTAGGCTCA",

    'a basic sequence': function(seq) {
      assert.strictEqual(eg.reverse_comp(seq), "TGAGCCTAGTGAAAGNGTTGTTTTAGACAAA");
    }
  },

  'When hashing a probe': {
    topic: function() {
      var line   = "1\t100006955\trs4908018\tTTTGTCTAAAACAAC\tCTTTCACTAGGCTCA\tC\tA",
          probes = eg.hash_probe(line);
      return {
        seq          : "TGAGCCTAGTGAAAGNGTTGTTTTAGACAAA",
        rc           : "TTTGTCTAAAACAACNCTTTCACTAGGCTCA",
        id           : "rs4908018",
        probe_size   : 31,
        probe_middle : 15
      };
    },

    'I can query a probe once hashed' : function(o) {
      assert.strictEqual(eg.probes[o.seq].id, o.id);
    },

    'And the RC version of the hashed probe is there': function(o) {
      assert.strictEqual(eg.probes[o.rc].id, o.id);
    },

    'I can query the size of the probe(s)': function(o) {
      assert.strictEqual(eg.probe_size(), o.probe_size);
    },

    'I can query the middle of the probe(s)': function(o) {
      assert.strictEqual(eg.probe_middle(), o.probe_middle);
    },
  }

}).export(module);
