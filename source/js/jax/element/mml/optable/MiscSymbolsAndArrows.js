(function (MML) {
  var MO = MML.mo.OPTYPES;
  var TEXCLASS = MML.TEXCLASS;
  MathJax.Hub.Insert(MML.mo.prototype, {
    OPTABLE: {
      infix: {
        '\u2B45': MO.RELSTRETCH, // leftwards quadruple arrow
        '\u2B46': MO.RELSTRETCH  // rightwards quadruple arrow
      }
    }
  });
  MathJax.Ajax.loadComplete(MML.optableDir + "/MiscSymbolsAndArrows.js");
})(MathJax.ElementJax.mml);
