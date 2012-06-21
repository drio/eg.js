var vows   = require('vows'),
    assert = require('assert'),
    _      = require('underscore'),
    eg     = require('../src/server/eg-probes');

// Probes suite
vows.describe('We properly deal with probes').addBatch({
  'Reverse Complement is done right': {
    topic: "TTTGTCTAAAACAACNCTTTCACTAGGCTCA",

    'basic sequence': function(seq) {
      assert.strictEqual(eg.reverse_comp(seq), "TGAGCCTAGTGAAAGNGTTGTTTTAGACAAA");
    }
  },

  'When hashing a probe': {
    topic: function() {
      var line   = "1\t100006955\trs4908018\tTTTGTCTAAAACAAC\tCTTTCACTAGGCTCA\tC\tA",
          probes = eg.hash_probe(line);
      return {
        seq    : "TGAGCCTAGTGAAAGNGTTGTTTTAGACAAA",
        rc     : "TTTGTCTAAAACAACNCTTTCACTAGGCTCA",
        id     : "rs4908018"
      };
    },

    'I can query a probe once hashed' : function(o) {
      assert.strictEqual(eg.probes[o.seq].id, o.id);
    },

    'The hit counts are properly set to 0': function(o) {
      assert.strictEqual(eg.probes[o.seq].hits["var"], 0);
      assert.strictEqual(eg.probes[o.seq].hits.ref, 0);
      assert.strictEqual(eg.probes[o.seq].hits.others, 0);
    },

    'And I the RC version of the hashed probe is there': function(o) {
      assert.strictEqual(eg.probes[o.rc].id, o.id);
    }
  }
}).export(module);
