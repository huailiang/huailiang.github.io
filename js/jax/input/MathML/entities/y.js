(function (MATHML) {
  MathJax.Hub.Insert(MATHML.Parse.Entity,{
    'YAcy': '\u042F',
    'YIcy': '\u0407',
    'YUcy': '\u042E',
    'Yacute': '\u00DD',
    'Ycirc': '\u0176',
    'Ycy': '\u042B',
    'Yuml': '\u0178',
    'yacute': '\u00FD',
    'yacy': '\u044F',
    'ycirc': '\u0177',
    'ycy': '\u044B',
    'yicy': '\u0457',
    'yucy': '\u044E',
    'yuml': '\u00FF'
  });
  MathJax.Ajax.loadComplete(MATHML.entityDir+"/y.js");
})(MathJax.InputJax.MathML);
