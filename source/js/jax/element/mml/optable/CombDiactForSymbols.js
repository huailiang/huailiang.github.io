(function (MML) {
  var MO = MML.mo.OPTYPES;
  var TEXCLASS = MML.TEXCLASS;
  MathJax.Hub.Insert(MML.mo.prototype, {
    OPTABLE: {
      postfix: {
        '\u20DB': MO.ACCENT,   
        '\u20DC': MO.ACCENT    
      }
    }
  });
  MathJax.Ajax.loadComplete(MML.optableDir + "/CombDiactForSymbols.js");
})(MathJax.ElementJax.mml);
