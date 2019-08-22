(function (MML) {
  var MO = MML.mo.OPTYPES;
  var TEXCLASS = MML.TEXCLASS;
  MathJax.Hub.Insert(MML.mo.prototype, {
    OPTABLE: {
      prefix: {
        '\u2145': MO.ORD21,    // double-struck italic capital d
        '\u2146': [2, 0, TEXCLASS.ORD]  // double-struck italic small d
      }
    }
  });
  MathJax.Ajax.loadComplete(MML.optableDir + "/LetterlikeSymbols.js");
})(MathJax.ElementJax.mml);
