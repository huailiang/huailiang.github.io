(function (MML) {
  var MO = MML.mo.OPTYPES;
  var TEXCLASS = MML.TEXCLASS;
  MathJax.Hub.Insert(MML.mo.prototype, {
    OPTABLE: {
      postfix: {
        '\u00B0': MO.ORD,      
        '\u00B4': MO.ACCENT,   
        '\u00B8': MO.ACCENT    
      }
    }
  });
  MathJax.Ajax.loadComplete(MML.optableDir + "/Latin1Supplement.js");
})(MathJax.ElementJax.mml);
