(function (MML) {
  var MO = MML.mo.OPTYPES;
  var TEXCLASS = MML.TEXCLASS;
  MathJax.Hub.Insert(MML.mo.prototype, {
    OPTABLE: {
      postfix: {
        '\u02CD': MO.WIDEACCENT, // modifier letter low macron
        '\u02DA': MO.ACCENT,   // ring above
        '\u02DD': MO.ACCENT,   // double acute accent
        '\u02F7': MO.WIDEACCENT  // modifier letter low tilde
      }
    }
  });
  MathJax.Ajax.loadComplete(MML.optableDir + "/SpacingModLetters.js");
})(MathJax.ElementJax.mml);
