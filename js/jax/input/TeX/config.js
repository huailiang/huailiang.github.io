MathJax.InputJax.TeX = MathJax.InputJax({
  id: "TeX",
  version: "2.0",
  directory: MathJax.InputJax.directory + "/TeX",
  extensionDir: MathJax.InputJax.extensionDir + "/TeX",
  config: {
    TagSide:       "right",
    TagIndent:     "0.8em",
    MultLineWidth: "85%",
    equationNumbers: {
      autoNumber: "none",  
      formatNumber: function (n) {return n},
      formatTag:    function (n) {return '('+n+')'},
      formatID:     function (n) {return 'mjx-eqn-'+String(n).replace(/[:"'<>&]/g,"")},
      formatURL:    function (id) {return '#'+escape(id)},
      useLabelIds:  true
    }
  }
});
MathJax.InputJax.TeX.Register("math/tex");
MathJax.InputJax.TeX.loadComplete("config.js");
