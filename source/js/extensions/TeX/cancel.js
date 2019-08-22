MathJax.Extension["TeX/cancel"] = {
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
    MACROS = TEX.Definitions.macros,
    MML = MathJax.ElementJax.mml,
    CANCEL = MathJax.Extension["TeX/cancel"];
  CANCEL.setAttributes = function (def, attr) {
    if (attr !== "") {
      attr = attr.replace(/ /g, "").split(/,/);
      for (var i = 0, m = attr.length; i < m; i++) {
        var keyvalue = attr[i].split(/[:=]/);
        if (CANCEL.ALLOWED[keyvalue[0]]) {
          if (keyvalue[1] === "true") { keyvalue[1] = true }
          if (keyvalue[1] === "false") { keyvalue[1] = false }
          def[keyvalue[0]] = keyvalue[1];
        }
      }
    }
    return def;
  };
  MACROS.cancel = ['Cancel', MML.NOTATION.UPDIAGONALSTRIKE];
  MACROS.bcancel = ['Cancel', MML.NOTATION.DOWNDIAGONALSTRIKE];
  MACROS.xcancel = ['Cancel', MML.NOTATION.UPDIAGONALSTRIKE + " " + MML.NOTATION.DOWNDIAGONALSTRIKE];
  MACROS.cancelto = 'CancelTo';
  TEX.Parse.Augment({
    Cancel: function (name, notation) {
      var attr = this.GetBrackets(name, ""), math = this.ParseArg(name);
      var def = CANCEL.setAttributes({ notation: notation }, attr);
      this.Push(MML.menclose(math).With(def));
    },
    CancelTo: function (name, notation) {
      var value = this.ParseArg(name),
        attr = this.GetBrackets(name, ""),
        math = this.ParseArg(name);
      var def = CANCEL.setAttributes({ notation: MML.NOTATION.UPDIAGONALSTRIKE, arrow: true }, attr);
      value = MML.mpadded(value).With({ depth: "-.1em", height: "+.1em", voffset: ".1em" });
      this.Push(MML.msup(MML.menclose(math).With(def), value));
    }
  });
  MathJax.Hub.Startup.signal.Post("TeX cancel Ready");
});
MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/cancel.js");
