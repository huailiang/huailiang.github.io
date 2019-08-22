(function (MML) {
  var MO = MML.mo.OPTYPES;
  var TEXCLASS = MML.TEXCLASS;
  MathJax.Hub.Insert(MML.mo.prototype, {
    OPTABLE: {
      prefix: {
        '||': [0, 0, TEXCLASS.BIN, { fence: true, stretchy: true, symmetric: true }], // multiple character operator: ||
        '|||': [0, 0, TEXCLASS.ORD, { fence: true, stretchy: true, symmetric: true }]  // multiple character operator: |||
      },
      postfix: {
        '!!': [1, 0, TEXCLASS.BIN], // multiple character operator: !!
        '\'': MO.ACCENT,       // apostrophe
        '++': [0, 0, TEXCLASS.BIN], // multiple character operator: ++
        '--': [0, 0, TEXCLASS.BIN], // multiple character operator: --
        '..': [0, 0, TEXCLASS.BIN], // multiple character operator: ..
        '...': MO.ORD,         // multiple character operator: ...
        '||': [0, 0, TEXCLASS.BIN, { fence: true, stretchy: true, symmetric: true }], // multiple character operator: ||
        '|||': [0, 0, TEXCLASS.ORD, { fence: true, stretchy: true, symmetric: true }]  // multiple character operator: |||
      },
      infix: {
        '!=': MO.BIN4,         // multiple character operator: !=
        '&&': MO.BIN4,         // multiple character operator: &&
        '**': [1, 1, TEXCLASS.BIN], // multiple character operator: **
        '*=': MO.BIN4,         // multiple character operator: *=
        '+=': MO.BIN4,         // multiple character operator: +=
        '-=': MO.BIN4,         // multiple character operator: -=
        '->': MO.BIN5,         // multiple character operator: ->
        '//': [1, 1, TEXCLASS.BIN], // multiple character operator: //
        '/=': MO.BIN4,         // multiple character operator: /=
        ':=': MO.BIN4,         // multiple character operator: :=
        '<=': MO.BIN5,         // multiple character operator: <=
        '<>': [1, 1, TEXCLASS.BIN], // multiple character operator: <>
        '==': MO.BIN4,         // multiple character operator: ==
        '>=': MO.BIN5,         // multiple character operator: >=
        '@': MO.ORD11,         // commercial at
        '||': [2, 2, TEXCLASS.BIN, { fence: true, stretchy: true, symmetric: true }], // multiple character operator: ||
        '|||': [2, 2, TEXCLASS.ORD, { fence: true, stretchy: true, symmetric: true }]  // multiple character operator: |||
      }
    }
  });
  MathJax.Ajax.loadComplete(MML.optableDir + "/BasicLatin.js");
})(MathJax.ElementJax.mml);
