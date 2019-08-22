MathJax.OutputJax.NativeMML = MathJax.OutputJax({
  id: "NativeMML",
  version: "2.0",
  directory: MathJax.OutputJax.directory + "/NativeMML",
  extensionDir: MathJax.OutputJax.extensionDir + "/NativeMML",
  config: {
    scale: 100,
    minScaleAdjust: 50,
    styles: {
      "DIV.MathJax_MathML": {
        "text-align": "center",
        margin: ".75em 0px"
      }
    }
  }
});
if (!MathJax.Hub.config.delayJaxRegistration)
  MathJax.OutputJax.NativeMML.Register("jax/mml");
MathJax.OutputJax.NativeMML.loadComplete("config.js");
