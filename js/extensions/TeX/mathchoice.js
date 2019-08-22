MathJax.Hub.Register.StartupHook("TeX Jax Ready", function () {
  var VERSION = "2.0";
  var MML = MathJax.ElementJax.mml;
  var TEX = MathJax.InputJax.TeX;
  var TEXDEF = TEX.Definitions;
  TEXDEF.macros.mathchoice = 'MathChoice';
  TEX.Parse.Augment({
    MathChoice: function (name) {
      var D = this.ParseArg(name),
        T = this.ParseArg(name),
        S = this.ParseArg(name),
        SS = this.ParseArg(name);
      this.Push(MML.TeXmathchoice(D, T, S, SS));
    }
  });
  MML.TeXmathchoice = MML.mbase.Subclass({
    type: "TeXmathchoice",
    choice: function () {
      var values = this.getValues("displaystyle", "scriptlevel");
      if (values.scriptlevel > 0) { return Math.min(3, values.scriptlevel + 1) }
      return (values.displaystyle ? 0 : 1);
    },
    setTeXclass: function (prev) { return this.Core().setTeXclass(prev) },
    isSpacelike: function () { return this.Core().isSpacelike() },
    isEmbellished: function () { return this.Core().isEmbellished() },
    Core: function () { return this.data[this.choice()] },
    toHTML: function (span) {
      span = this.HTMLcreateSpan(span);
      span.bbox = this.Core().toHTML(span).bbox;
      if (span.firstChild && span.firstChild.style.marginLeft) {
        span.style.marginLeft = span.firstChild.style.marginLeft;
        span.firstChild.style.marginLeft = "";
      }
      return span;
    },
    toSVG: function () { return this.Core().toSVG() }
  });
  MathJax.Hub.Startup.signal.Post("TeX mathchoice Ready");
});
MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/mathchoice.js");