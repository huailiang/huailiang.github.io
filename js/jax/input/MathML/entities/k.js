(function (MATHML) {
  MathJax.Hub.Insert(MATHML.Parse.Entity,{
    'KHcy': '\u0425',
    'KJcy': '\u040C',
    'Kappa': '\u039A',
    'Kcedil': '\u0136',
    'Kcy': '\u041A',
    'kcedil': '\u0137',
    'kcy': '\u043A',
    'kgreen': '\u0138',
    'khcy': '\u0445',
    'kjcy': '\u045C'
  });
  MathJax.Ajax.loadComplete(MATHML.entityDir+"/k.js");
})(MathJax.InputJax.MathML);
