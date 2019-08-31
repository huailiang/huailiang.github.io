(function (MML) {
  var MO = MML.mo.OPTYPES;
  var TEXCLASS = MML.TEXCLASS;
  MathJax.Hub.Insert(MML.mo.prototype, {
    OPTABLE: {
      postfix: {
        '\u23B4': MO.WIDEACCENT, 
        '\u23B5': MO.WIDEACCENT, 
        '\u23DC': MO.WIDEACCENT, 
        '\u23DD': MO.WIDEACCENT, 
        '\u23E0': MO.WIDEACCENT, 
        '\u23E1': MO.WIDEACCENT  
      }
    }
  });
  MathJax.Ajax.loadComplete(MML.optableDir + "/MiscTechnical.js");
})(MathJax.ElementJax.mml);
