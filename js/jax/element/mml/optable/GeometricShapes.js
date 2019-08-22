(function (MML) {
  var MO = MML.mo.OPTYPES;
  var TEXCLASS = MML.TEXCLASS;
  MathJax.Hub.Insert(MML.mo.prototype, {
    OPTABLE: {
      infix: {
        '\u25A0': MO.BIN3,     // black square
        '\u25A1': MO.BIN3,     // white square
        '\u25AA': MO.BIN3,     // black small square
        '\u25AB': MO.BIN3,     // white small square
        '\u25AD': MO.BIN3,     // white rectangle
        '\u25AE': MO.BIN3,     // black vertical rectangle
        '\u25AF': MO.BIN3,     // white vertical rectangle
        '\u25B0': MO.BIN3,     // black parallelogram
        '\u25B1': MO.BIN3,     // white parallelogram
        '\u25B2': MO.BIN4,     // black up-pointing triangle
        '\u25B4': MO.BIN4,     // black up-pointing small triangle
        '\u25B6': MO.BIN4,     // black right-pointing triangle
        '\u25B7': MO.BIN4,     // white right-pointing triangle
        '\u25B8': MO.BIN4,     // black right-pointing small triangle
        '\u25BC': MO.BIN4,     // black down-pointing triangle
        '\u25BE': MO.BIN4,     // black down-pointing small triangle
        '\u25C0': MO.BIN4,     // black left-pointing triangle
        '\u25C1': MO.BIN4,     // white left-pointing triangle
        '\u25C2': MO.BIN4,     // black left-pointing small triangle
        '\u25C4': MO.BIN4,     // black left-pointing pointer
        '\u25C5': MO.BIN4,     // white left-pointing pointer
        '\u25C6': MO.BIN4,     // black diamond
        '\u25C7': MO.BIN4,     // white diamond
        '\u25C8': MO.BIN4,     // white diamond containing black small diamond
        '\u25C9': MO.BIN4,     // fisheye
        '\u25CC': MO.BIN4,     // dotted circle
        '\u25CD': MO.BIN4,     // circle with vertical fill
        '\u25CE': MO.BIN4,     // bullseye
        '\u25CF': MO.BIN4,     // black circle
        '\u25D6': MO.BIN4,     // left half black circle
        '\u25D7': MO.BIN4,     // right half black circle
        '\u25E6': MO.BIN4      // white bullet
      }
    }
  });
  MathJax.Ajax.loadComplete(MML.optableDir + "/GeometricShapes.js");
})(MathJax.ElementJax.mml);
