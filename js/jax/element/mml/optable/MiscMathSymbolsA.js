(function (MML) {
  var MO = MML.mo.OPTYPES;
  var TEXCLASS = MML.TEXCLASS;
  MathJax.Hub.Insert(MML.mo.prototype, {
    OPTABLE: {
      prefix: {
        '\u27E6': MO.OPEN,     
        '\u27EA': MO.OPEN,     
        '\u27EC': MO.OPEN      
      },
      postfix: {
        '\u27E7': MO.CLOSE,    
        '\u27EB': MO.CLOSE,    
        '\u27ED': MO.CLOSE     
      }
    }
  });
  MathJax.Ajax.loadComplete(MML.optableDir + "/MiscMathSymbolsA.js");
})(MathJax.ElementJax.mml);
