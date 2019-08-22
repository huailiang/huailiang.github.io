(function (MML) {
  var MO = MML.mo.OPTYPES;
  var TEXCLASS = MML.TEXCLASS;
  MathJax.Hub.Insert(MML.mo.prototype, {
    OPTABLE: {
      prefix: {
        '\u27E6': MO.OPEN,     // mathematical left white square bracket
        '\u27EA': MO.OPEN,     // mathematical left double angle bracket
        '\u27EC': MO.OPEN      // mathematical left white tortoise shell bracket
      },
      postfix: {
        '\u27E7': MO.CLOSE,    // mathematical right white square bracket
        '\u27EB': MO.CLOSE,    // mathematical right double angle bracket
        '\u27ED': MO.CLOSE     // mathematical right white tortoise shell bracket
      }
    }
  });
  MathJax.Ajax.loadComplete(MML.optableDir + "/MiscMathSymbolsA.js");
})(MathJax.ElementJax.mml);
