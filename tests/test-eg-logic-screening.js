var vows      = require('vows'),
    assert    = require('assert'),
    _         = require('underscore'),
    eg        = require('../src/server/eg-probes'),
    screening = require('../src/server/eg-screening');

var line   = "1\t100006955\trs4908018\tTTTGTCTAAAACAAC\tCTTTCACTAGGCTCA\tC\tA",
    seq    = "TGAGCCTAGTGAAAGNGTTGTTTTAGACAAA",
    rc     = "TTTGTCTAAAACAACNCTTTCACTAGGCTCA",
    ref    = 'C',
    _var   = 'A',
    id     = 'rs4908018';

// Screening suite
vows.describe('test-eg-logic-screening').addBatch({
  'When I screen a read that has a ref hit in the middle': { // Context 1
    topic: function() {
      eg.hash_probe(line);
      var read = "ACCGGT" + seq.replace(/N/, ref)  + "ACCTT";
      screening.process_read(read, eg.probes, this.callback);
    },
    'the callback correctly retuns the id of the probe and tells me is a ref hit': function(pid, ref_or_var) {
      assert.equal(pid, id);
      assert.equal(ref_or_var, "R");
    }
  },

  'When I screen a read that has a var hit in the middle': { // Context 2
    topic: function() {
      eg.hash_probe(line);
      var read = "ACCGGT" + seq.replace(/N/, _var)  + "ACCTT";
      screening.process_read(read, eg.probes, this.callback);
    },
    'the callback correctly retuns the id of the probe and tells me is a var hit': function(pid, ref_or_var) {
      assert.equal(pid, id);
      assert.equal(ref_or_var, "V");
    }
  },

  'When I screen a RC read that has a var hit in the middle': { // Context 3
    topic: function() {
      eg.hash_probe(line);
      var read =  "CCCCCC" + rc.replace(/N/, ref)  + "CCCCC";
      screening.process_read(read, eg.probes, this.callback);
    },
    'the callback correctly retuns the id of the probe and tells me is a ref hit': function(pid, ref_or_var) {
      assert.equal(pid, id);
      assert.equal(ref_or_var, "R");
    }
  },

  'When I screen a read that has a ref hit in the first window': { // Context
    topic: function() {
      eg.hash_probe(line);
      var read = seq.replace(/N/, ref)  + "ACCTTACACTTACTAT";
      screening.process_read(read, eg.probes, this.callback);
    },
    'the callback correctly retuns the id of the probe and tells me is a ref hit': function(pid, ref_or_var) {
      assert.equal(pid, id);
      assert.equal(ref_or_var, "R");
    }
  },

  'When I screen a RC read that has a ref hit in the first window': { // Context
    topic: function() {
      eg.hash_probe(line);
      var read = rc.replace(/N/, ref)  + "ACCTTACACTTACTAT";
      screening.process_read(read, eg.probes, this.callback);
    },
    'the callback correctly retuns the id of the probe and tells me is a ref hit': function(pid, ref_or_var) {
      assert.equal(pid, id);
      assert.equal(ref_or_var, "R");
    }
  },

  'When I screen a read that has a var hit in the last window': { // Context
    topic: function() {
      eg.hash_probe(line);
      var read = "AAAAAAAAAAA" + seq.replace(/N/, _var);
      screening.process_read(read, eg.probes, this.callback);
    },
    'the callback correctly retuns the id of the probe and tells me is a var hit': function(pid, ref_or_var) {
      assert.equal(pid, id);
      assert.equal(ref_or_var, "V");
    }
  },

  'When I screen a RC read that has a var hit in the first window': { // Context
    topic: function() {
      eg.hash_probe(line);
      var read = rc.replace(/N/, _var)  + "ACCTTACACTTACTAT";
      screening.process_read(read, eg.probes, this.callback);
    },
    'the callback correctly retuns the id of the probe and tells me is a ref hit': function(pid, ref_or_var) {
      assert.equal(pid, id);
      assert.equal(ref_or_var, "V");
    }
  }

}).export(module);
