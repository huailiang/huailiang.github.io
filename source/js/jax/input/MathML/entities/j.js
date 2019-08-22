(function (MATHML) {
  MathJax.Hub.Insert(MATHML.Parse.Entity,{
    'Jcirc': '\u0134',
    'Jcy': '\u0419',
    'Jsercy': '\u0408',
    'Jukcy': '\u0404',
    'jcirc': '\u0135',
    'jcy': '\u0439',
    'jsercy': '\u0458',
    'jukcy': '\u0454'
  });
  MathJax.Ajax.loadComplete(MATHML.entityDir+"/j.js");
})(MathJax.InputJax.MathML);
