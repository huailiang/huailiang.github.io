(function (MML) {
  var MO = MML.mo.OPTYPES;
  var TEXCLASS = MML.TEXCLASS;
  MathJax.Hub.Insert(MML.mo.prototype, {
    OPTABLE: {
      prefix: {
        '\u2016': [0, 0, TEXCLASS.ORD, { fence: true, stretchy: true }], 
        '\u2018': [0, 0, TEXCLASS.OPEN, { fence: true }], 
        '\u201C': [0, 0, TEXCLASS.OPEN, { fence: true }]  
      },
      postfix: {
        '\u2016': [0, 0, TEXCLASS.ORD, { fence: true, stretchy: true }], 
        '\u2019': [0, 0, TEXCLASS.CLOSE, { fence: true }], 
        '\u201D': [0, 0, TEXCLASS.CLOSE, { fence: true }]  
      }
    }
  });
  MathJax.Ajax.loadComplete(MML.optableDir + "/GeneralPunctuation.js");
})(MathJax.ElementJax.mml);
