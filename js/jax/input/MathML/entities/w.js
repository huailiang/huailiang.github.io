(function (MATHML) {
  MathJax.Hub.Insert(MATHML.Parse.Entity,{
    'Wcirc': '\u0174',
    'wcirc': '\u0175',
    'wedbar': '\u2A5F',
    'wedge': '\u2227',
    'wedgeq': '\u2259',
    'wp': '\u2118',
    'wr': '\u2240',
    'wreath': '\u2240'
  });
  MathJax.Ajax.loadComplete(MATHML.entityDir+"/w.js");
})(MathJax.InputJax.MathML);
