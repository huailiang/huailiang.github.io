(function (MML) {
  var MO = MML.mo.OPTYPES;
  var TEXCLASS = MML.TEXCLASS;
  MathJax.Hub.Insert(MML.mo.prototype, {
    OPTABLE: {
      prefix: {
        '||': [0, 0, TEXCLASS.BIN, { fence: true, stretchy: true, symmetric: true }], 
        '|||': [0, 0, TEXCLASS.ORD, { fence: true, stretchy: true, symmetric: true }]  
      },
      postfix: {
        '!!': [1, 0, TEXCLASS.BIN], 
        '\'': MO.ACCENT,       
        '++': [0, 0, TEXCLASS.BIN], 
        '--': [0, 0, TEXCLASS.BIN], 
        '..': [0, 0, TEXCLASS.BIN], 
        '...': MO.ORD,         
        '||': [0, 0, TEXCLASS.BIN, { fence: true, stretchy: true, symmetric: true }], 
        '|||': [0, 0, TEXCLASS.ORD, { fence: true, stretchy: true, symmetric: true }]  
      },
      infix: {
        '!=': MO.BIN4,         
        '&&': MO.BIN4,         
        '**': [1, 1, TEXCLASS.BIN], 
        '*=': MO.BIN4,         
        '+=': MO.BIN4,         
        '-=': MO.BIN4,         
        '->': MO.BIN5,         
        '
        '/=': MO.BIN4,         
        ':=': MO.BIN4,         
        '<=': MO.BIN5,         
        '<>': [1, 1, TEXCLASS.BIN], 
        '==': MO.BIN4,         
        '>=': MO.BIN5,         
        '@': MO.ORD11,         
        '||': [2, 2, TEXCLASS.BIN, { fence: true, stretchy: true, symmetric: true }], 
        '|||': [2, 2, TEXCLASS.ORD, { fence: true, stretchy: true, symmetric: true }]  
      }
    }
  });
  MathJax.Ajax.loadComplete(MML.optableDir + "/BasicLatin.js");
})(MathJax.ElementJax.mml);
