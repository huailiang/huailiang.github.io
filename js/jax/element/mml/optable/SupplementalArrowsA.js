(function (MML) {
  var MO = MML.mo.OPTYPES;
  var TEXCLASS = MML.TEXCLASS;
  MathJax.Hub.Insert(MML.mo.prototype, {
    OPTABLE: {
      infix: {
        '\u27F0': MO.RELSTRETCH, // upwards quadruple arrow
        '\u27F1': MO.RELSTRETCH, // downwards quadruple arrow
        '\u27FB': MO.WIDEREL,  // long leftwards arrow from bar
        '\u27FD': MO.WIDEREL,  // long leftwards double arrow from bar
        '\u27FE': MO.WIDEREL,  // long rightwards double arrow from bar
        '\u27FF': MO.WIDEREL   // long rightwards squiggle arrow
      }
    }
  });
  MathJax.Ajax.loadComplete(MML.optableDir + "/SupplementalArrowsA.js");
})(MathJax.ElementJax.mml);
