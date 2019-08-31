(function (MML) {
  var MO = MML.mo.OPTYPES;
  var TEXCLASS = MML.TEXCLASS;
  MathJax.Hub.Insert(MML.mo.prototype, {
    OPTABLE: {
      postfix: {
        '\u0311': MO.ACCENT    
      }
    }
  });
  MathJax.Ajax.loadComplete(MML.optableDir + "/CombDiacritMarks.js");
})(MathJax.ElementJax.mml);
