MathJax.Extension["TeX/verb"] = {version: "2.0"};
MathJax.Hub.Register.StartupHook("TeX Jax Ready", function () {
  var MML = MathJax.ElementJax.mml;
  var TEX = MathJax.InputJax.TeX;
  var TEXDEF = TEX.Definitions;
  TEXDEF.macros.verb = 'Verb';
  TEX.Parse.Augment({
    Verb: function (name) {
      var c = this.GetNext(); var start = ++this.i;
      if (c == "") { TEX.Error(name + " requires an argument") }
      while (this.i < this.string.length && this.string.charAt(this.i) != c) { this.i++ }
      if (this.i == this.string.length) { TEX.Error("Can't find closing delimiter for " + name) }
      var text = this.string.slice(start, this.i); this.i++;
      this.Push(MML.mtext(text).With({ mathvariant: MML.VARIANT.MONOSPACE }));
    }
  });
  MathJax.Hub.Startup.signal.Post("TeX verb Ready");
});
MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/verb.js");
