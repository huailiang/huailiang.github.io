(function (MML) {
  var MO = MML.mo.OPTYPES;
  var TEXCLASS = MML.TEXCLASS;
  MathJax.Hub.Insert(MML.mo.prototype, {
    OPTABLE: {
      postfix: {
        '\u23B4': MO.WIDEACCENT, // top square bracket
        '\u23B5': MO.WIDEACCENT, // bottom square bracket
        '\u23DC': MO.WIDEACCENT, // top parenthesis
        '\u23DD': MO.WIDEACCENT, // bottom parenthesis
        '\u23E0': MO.WIDEACCENT, // top tortoise shell bracket
        '\u23E1': MO.WIDEACCENT  // bottom tortoise shell bracket
      }
    }
  });
  MathJax.Ajax.loadComplete(MML.optableDir + "/MiscTechnical.js");
})(MathJax.ElementJax.mml);
