MathJax.Extension["TeX/enclose"] = {
  version: "2.0",
  ALLOWED: {
    arrow: 1,
    color: 1, mathcolor: 1,
    background: 1, mathbackground: 1,
    padding: 1,
    thickness: 1
  }
};
MathJax.Hub.Register.StartupHook("TeX Jax Ready", function () {
  var TEX = MathJax.InputJax.TeX,
    MML = MathJax.ElementJax.mml,
    ALLOW = MathJax.Extension["TeX/enclose"].ALLOWED;
  TEX.Definitions.macros.enclose = 'Enclose';
  TEX.Parse.Augment({
    Enclose: function (name) {
      var notation = this.GetArgument(name),
        attr = this.GetBrackets(name),
        math = this.ParseArg(name);
      var def = { notation: notation.replace(/,/g, " ") };
      if (attr) {
        attr = attr.replace(/ /g, "").split(/,/);
        for (var i = 0, m = attr.length; i < m; i++) {
          var keyvalue = attr[i].split(/[:=]/);
          if (ALLOW[keyvalue[0]]) {
            keyvalue[1] = keyvalue[1].replace(/^"(.*)"$/, "$1");
            if (keyvalue[1] === "true") { keyvalue[1] = true }
            if (keyvalue[1] === "false") { keyvalue[1] = false }
            def[keyvalue[0]] = keyvalue[1];
          }
        }
      }
      this.Push(MML.menclose(math).With(def));
    }
  });
  MathJax.Hub.Startup.signal.Post("TeX enclose Ready");
});
MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/enclose.js");