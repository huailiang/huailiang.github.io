(function (MML) {
  var MO = MML.mo.OPTYPES;
  var TEXCLASS = MML.TEXCLASS;
  MathJax.Hub.Insert(MML.mo.prototype, {
    OPTABLE: {
      prefix: {
        '\u2016': [0, 0, TEXCLASS.ORD, { fence: true, stretchy: true }], // double vertical line
        '\u2018': [0, 0, TEXCLASS.OPEN, { fence: true }], // left single quotation mark
        '\u201C': [0, 0, TEXCLASS.OPEN, { fence: true }]  // left double quotation mark
      },
      postfix: {
        '\u2016': [0, 0, TEXCLASS.ORD, { fence: true, stretchy: true }], // double vertical line
        '\u2019': [0, 0, TEXCLASS.CLOSE, { fence: true }], // right single quotation mark
        '\u201D': [0, 0, TEXCLASS.CLOSE, { fence: true }]  // right double quotation mark
      }
    }
  });
  MathJax.Ajax.loadComplete(MML.optableDir + "/GeneralPunctuation.js");
})(MathJax.ElementJax.mml);
