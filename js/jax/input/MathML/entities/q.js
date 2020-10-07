(function (MATHML) {
  MathJax.Hub.Insert(MATHML.Parse.Entity,{
    'QUOT': '\u0022',
    'qint': '\u2A0C',
    'qprime': '\u2057',
    'quaternions': '\u210D',
    'quatint': '\u2A16',
    'quest': '\u003F',
    'questeq': '\u225F',
    'quot': '\u0022'
  });
  MathJax.Ajax.loadComplete(MATHML.entityDir+"/q.js");
})(MathJax.InputJax.MathML);
