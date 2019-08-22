MathJax.Extension["TeX/bbox"] = {version: "2.0"};
MathJax.Hub.Register.StartupHook("TeX Jax Ready",function () {
  var TEX = MathJax.InputJax.TeX,
      MML = MathJax.ElementJax.mml;
  TEX.Definitions.macros.bbox = "BBox";
  TEX.Parse.Augment({
    BBox: function (name) {
      var bbox = this.GetBrackets(name,""),
          math = this.ParseArg(name);
      var parts = bbox.split(/,/), def, background, style;
      for (var i in parts) {
        var part = parts[i].replace(/^\s+/,'').replace(/\s+$/,'');
        var match = part.match(/^(\.\d+|\d+(\.\d*)?)(pt|em|ex|mu|px|in|cm|mm)$/);
        if (match) {
          var pad = match[1]+match[3];
          if (def) {TEX.Error("Padding specified twice in "+name)}
          def = {height:"+"+pad, depth:"+"+pad, lspace:pad, width:"+"+(2*match[1])+match[3]};
        } else if (part.match(/^([a-z0-9]+|\#[0-9a-f]{6}|\#[0-9a-f]{3})$/i)) {
          if (background) {TEX.Error("Background specified twice in "+name)}
          background = part;
        } else if (part.match(/^[-a-z]+:/i)) {
          if (style) {TEX.Error("Style specified twice in "+name)}
          style = part;
        } else if (part !== "") {
          TEX.Error("'"+part+"' doesn't look like a color, a padding dimension, or a style");
        }
      }
      if (def) {math = MML.mpadded(math).With(def)}
      if (background || style) {
        math = MML.mstyle(math).With({mathbackground:background, style:style});
      }
      this.Push(math);
    }
  });
  MathJax.Hub.Startup.signal.Post("TeX bbox Ready");
});
MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/bbox.js");
