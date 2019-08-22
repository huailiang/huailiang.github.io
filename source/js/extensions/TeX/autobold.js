MathJax.Extension["TeX/autobold"] = {version: "2.0"};
MathJax.Hub.Register.StartupHook("TeX Jax Ready", function () {
  var TEX = MathJax.InputJax.TeX;
  TEX.prefilterHooks.Add(function (data) {
    var span = data.script.parentNode.insertBefore(document.createElement("span"), data.script);
    span.visibility = "hidden";
    span.style.fontFamily = "Times, serif";
    span.appendChild(document.createTextNode("ABCXYZabcxyz"));
    var W = span.offsetWidth;
    span.style.fontWeight = "bold";
    if (W && span.offsetWidth === W) { data.math = "\\boldsymbol{" + data.math + "}" }
    span.parentNode.removeChild(span);
  });
  MathJax.Hub.Startup.signal.Post("TeX autobold Ready");
});
MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/autobold.js");
