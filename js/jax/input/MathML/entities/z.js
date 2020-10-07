(function (MATHML) {
  MathJax.Hub.Insert(MATHML.Parse.Entity,{
    'ZHcy': '\u0416',
    'Zacute': '\u0179',
    'Zcaron': '\u017D',
    'Zcy': '\u0417',
    'Zdot': '\u017B',
    'ZeroWidthSpace': '\u200B',
    'Zeta': '\u0396',
    'zacute': '\u017A',
    'zcaron': '\u017E',
    'zcy': '\u0437',
    'zdot': '\u017C',
    'zeetrf': '\u2128',
    'zhcy': '\u0436',
    'zwj': '\u200D',
    'zwnj': '\u200C'
  });
  MathJax.Ajax.loadComplete(MATHML.entityDir+"/z.js");
})(MathJax.InputJax.MathML);
