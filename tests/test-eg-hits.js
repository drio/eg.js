var vows    = require('vows'),
    assert  = require('assert'),
    _       = require('underscore'),
    eg_hits = require('../src/server/eg-hits');

var max_ref_var = 30, i,j;

var suite = vows.describe('test-eg-hits');

suite.addBatch({
  'When no hits': {
    topic: function() {
      eg_hits.create_square_matrix(max_ref_var);
      return eg_hits.matrix;
    },
    'The matrix has the proper size': function(m) {
      assert.equal(m[0].length, max_ref_var);
      assert.equal(m[max_ref_var-1].length, max_ref_var);
      assert.equal(m[max_ref_var], undefined);
    },
    'And it is all zeros': function(m) {
      for(i=0; i<max_ref_var; i++)
        for(j=0; j<max_ref_var; j++)
          assert.equal(m[i][j], 0);
    }
  }
});

suite.addBatch({
  'When adding a ref hit and a var hit': {
    topic: function() {
      eg_hits.create_square_matrix(max_ref_var);
      eg_hits.add("id1", "R");
      eg_hits.add("id1", "V");
      return eg_hits.matrix;
    },

    'the number of probes with 1 ref 1 var is 1' : function(m) {
      assert.equal(m[1][1], 1);
    },

    'and all the other cells are zero' : function(m) {
      for(i=0; i<max_ref_var; i++)
        for(j=0; j<max_ref_var; j++) {
          if (i!==1 && j!==1) assert.equal(m[i][j], 0);
        }
    },

    'and if now I get a new ref hit to that probe ' : {
      topic: function() {
        eg_hits.add("id1", "R");
        return eg_hits.matrix;
      },
      'The previous cell is zero': function(m) {
        assert.equal(m[1][1], 0);
      },
      'and the new one (# of probes 2 ref 1 var) is 1': function(m) {
        assert.equal(m[2][1], 1);
      }
    }
  }
});

suite.export(module);
