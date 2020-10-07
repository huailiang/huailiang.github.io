(function (MML) {
  var MO = MML.mo.OPTYPES;
  var TEXCLASS = MML.TEXCLASS;
  MathJax.Hub.Insert(MML.mo.prototype, {
    OPTABLE: {
      infix: {
        '\u27F0': MO.RELSTRETCH, 
        '\u27F1': MO.RELSTRETCH, 
        '\u27FB': MO.WIDEREL,  
        '\u27FD': MO.WIDEREL,  
        '\u27FE': MO.WIDEREL,  
        '\u27FF': MO.WIDEREL   
      }
    }
  });
  MathJax.Ajax.loadComplete(MML.optableDir + "/SupplementalArrowsA.js");
})(MathJax.ElementJax.mml);
