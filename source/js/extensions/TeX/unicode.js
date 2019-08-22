MathJax.Extension["TeX/unicode"] = {
  version: "2.0",
  unicode: {},
  config: MathJax.Hub.CombineConfig("TeX.unicode", {
    fonts: "STIXGeneral,'Arial Unicode MS'"
  })
};
MathJax.Hub.Register.StartupHook("TeX Jax Ready", function () {
  var TEX = MathJax.InputJax.TeX;
  var MML = MathJax.ElementJax.mml;
  var UNICODE = MathJax.Extension["TeX/unicode"].unicode;
  TEX.Definitions.macros.unicode = 'Unicode';
  TEX.Parse.Augment({
    Unicode: function (name) {
      var HD = this.GetBrackets(name), font;
      if (HD) {
        if (HD.replace(/ /g, "").match(/^(\d+(\.\d*)?|\.\d+),(\d+(\.\d*)?|\.\d+)$/)) { HD = HD.replace(/ /g, "").split(/,/); font = this.GetBrackets(name) }
        else { font = HD; HD = null }
      }
      var n = this.trimSpaces(this.GetArgument(name)),
        N = parseInt(n.match(/^x/) ? "0" + n : n);
      if (!UNICODE[N]) { UNICODE[N] = [800, 200, font, N] }
      else if (!font) { font = UNICODE[N][2] }
      if (HD) {
        UNICODE[N][0] = Math.floor(HD[0] * 1000);
        UNICODE[N][1] = Math.floor(HD[1] * 1000);
      }
      var variant = this.stack.env.font, def = {};
      if (font) {
        UNICODE[N][2] = def.fontfamily = font.replace(/"/g, "'");
        if (variant) {
          if (variant.match(/bold/)) { def.fontweight = "bold" }
          if (variant.match(/italic|-mathit/)) { def.fontstyle = "italic" }
        }
      } else if (variant) { def.mathvariant = variant }
      def.unicode = [].concat(UNICODE[N]); 
      this.Push(MML.mtext(MML.entity("#" + n)).With(def));
    }
  });
  MathJax.Hub.Startup.signal.Post("TeX unicode Ready");
});
MathJax.Hub.Register.StartupHook("HTML-CSS Jax Ready", function () {
  var MML = MathJax.ElementJax.mml;
  var FONTS = MathJax.Extension["TeX/unicode"].config.fonts;
  var GETVARIANT = MML.mbase.prototype.HTMLgetVariant;
  MML.mbase.Augment({
    HTMLgetVariant: function () {
      var variant = GETVARIANT.call(this);
      if (variant.unicode) { delete variant.unicode; delete variant.FONTS } 
      if (!this.unicode) { return variant }
      variant.unicode = true;
      if (!variant.defaultFont) {
        variant = MathJax.Hub.Insert({}, variant); 
        variant.defaultFont = { family: FONTS };
      }
      var family = this.unicode[2]; if (family) { family += "," + FONTS } else { family = FONTS }
      variant.defaultFont[this.unicode[3]] = [
        this.unicode[0], this.unicode[1], 500, 0, 500,
        { isUnknown: true, isUnicode: true, font: family }
      ];
      return variant;
    }
  });
});
MathJax.Hub.Register.StartupHook("SVG Jax Ready", function () {
  var MML = MathJax.ElementJax.mml;
  var FONTS = MathJax.Extension["TeX/unicode"].config.fonts;
  var GETVARIANT = MML.mbase.prototype.SVGgetVariant;
  MML.mbase.Augment({
    SVGgetVariant: function () {
      var variant = GETVARIANT.call(this);
      if (variant.unicode) { delete variant.unicode; delete variant.FONTS } 
      if (!this.unicode) { return variant }
      variant.unicode = true;
      if (!variant.forceFamily) { variant = MathJax.Hub.Insert({}, variant) } 
      variant.defaultFamily = FONTS; variant.noRemap = true;
      variant.h = this.unicode[0]; variant.d = this.unicode[1];
      return variant;
    }
  });
});
MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/unicode.js");
