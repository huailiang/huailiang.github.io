(function (MML) {
  var MO = MML.mo.OPTYPES;
  var TEXCLASS = MML.TEXCLASS;
  MathJax.Hub.Insert(MML.mo.prototype, {
    OPTABLE: {
      postfix: {
        '\u02CD': MO.WIDEACCENT, 
        '\u02DA': MO.ACCENT,   
        '\u02DD': MO.ACCENT,   
        '\u02F7': MO.WIDEACCENT  
      }
    }
  });
  MathJax.Ajax.loadComplete(MML.optableDir + "/SpacingModLetters.js");
})(MathJax.ElementJax.mml);
