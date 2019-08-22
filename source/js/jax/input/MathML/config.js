MathJax.InputJax.MathML = MathJax.InputJax({
  id: "MathML",
  version: "2.0",
  directory: MathJax.InputJax.directory + "/MathML",
  extensionDir: MathJax.InputJax.extensionDir + "/MathML",
  entityDir: MathJax.InputJax.directory + "/MathML/entities",
  config: {useMathMLspacing: false }
});
MathJax.InputJax.MathML.Register("math/mml");
MathJax.InputJax.MathML.loadComplete("config.js");
