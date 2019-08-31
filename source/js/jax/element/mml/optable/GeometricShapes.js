(function (MML) {
  var MO = MML.mo.OPTYPES;
  var TEXCLASS = MML.TEXCLASS;
  MathJax.Hub.Insert(MML.mo.prototype, {
    OPTABLE: {
      infix: {
        '\u25A0': MO.BIN3,     
        '\u25A1': MO.BIN3,     
        '\u25AA': MO.BIN3,     
        '\u25AB': MO.BIN3,     
        '\u25AD': MO.BIN3,     
        '\u25AE': MO.BIN3,     
        '\u25AF': MO.BIN3,     
        '\u25B0': MO.BIN3,     
        '\u25B1': MO.BIN3,     
        '\u25B2': MO.BIN4,     
        '\u25B4': MO.BIN4,     
        '\u25B6': MO.BIN4,     
        '\u25B7': MO.BIN4,     
        '\u25B8': MO.BIN4,     
        '\u25BC': MO.BIN4,     
        '\u25BE': MO.BIN4,     
        '\u25C0': MO.BIN4,     
        '\u25C1': MO.BIN4,     
        '\u25C2': MO.BIN4,     
        '\u25C4': MO.BIN4,     
        '\u25C5': MO.BIN4,     
        '\u25C6': MO.BIN4,     
        '\u25C7': MO.BIN4,     
        '\u25C8': MO.BIN4,     
        '\u25C9': MO.BIN4,     
        '\u25CC': MO.BIN4,     
        '\u25CD': MO.BIN4,     
        '\u25CE': MO.BIN4,     
        '\u25CF': MO.BIN4,     
        '\u25D6': MO.BIN4,     
        '\u25D7': MO.BIN4,     
        '\u25E6': MO.BIN4      
      }
    }
  });
  MathJax.Ajax.loadComplete(MML.optableDir + "/GeometricShapes.js");
})(MathJax.ElementJax.mml);
