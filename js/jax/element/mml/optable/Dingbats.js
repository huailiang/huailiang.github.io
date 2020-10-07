(function (MML) {
  var MO = MML.mo.OPTYPES;
  var TEXCLASS = MML.TEXCLASS;
  MathJax.Hub.Insert(MML.mo.prototype, {
    OPTABLE: {
      prefix: { '\u2772': MO.OPEN },
      postfix: { '\u2773': MO.CLOSE }
    }
  });
  MathJax.Ajax.loadComplete(MML.optableDir + "/Dingbats.js");
})(MathJax.ElementJax.mml);
