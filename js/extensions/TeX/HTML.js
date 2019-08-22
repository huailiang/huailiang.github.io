MathJax.Extension["TeX/HTML"] = {version: "2.0"};
MathJax.Hub.Register.StartupHook("TeX Jax Ready", function () {
  var TEX = MathJax.InputJax.TeX;
  var TEXDEF = TEX.Definitions;
  TEXDEF.Add({
    macros: {
      href: 'HREF_attribute',
      "class": 'CLASS_attribute',
      style: 'STYLE_attribute',
      cssId: 'ID_attribute'
    }
  });
  TEX.Parse.Augment({
    HREF_attribute: function (name) {
      var url = this.GetArgument(name),
        arg = this.GetArgumentMML(name);
      this.Push(arg.With({ href: url }));
    },
    CLASS_attribute: function (name) {
      var CLASS = this.GetArgument(name),
        arg = this.GetArgumentMML(name);
      if (arg["class"] != null) { CLASS = arg["class"] + " " + CLASS }
      this.Push(arg.With({ "class": CLASS }));
    },
    STYLE_attribute: function (name) {
      var style = this.GetArgument(name),
        arg = this.GetArgumentMML(name);
      if (arg.style != null) {
        if (style.charAt(style.length - 1) !== ";") { style += ";" }
        style = arg.style + " " + style;
      }
      this.Push(arg.With({ style: style }));
    },
    ID_attribute: function (name) {
      var ID = this.GetArgument(name),
        arg = this.GetArgumentMML(name);
      this.Push(arg.With({ id: ID }));
    },
    GetArgumentMML: function (name) {
      var arg = this.ParseArg(name);
      if (arg.inferred && arg.data.length == 1) { arg = arg.data[0] } else { delete arg.inferred }
      return arg;
    }
  });
  MathJax.Hub.Startup.signal.Post("TeX HTML Ready");
});
MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/HTML.js");
