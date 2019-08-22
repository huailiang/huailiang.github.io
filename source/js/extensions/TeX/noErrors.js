(function (HUB, HTML) {
  var VERSION = "2.0";
  var CONFIG = HUB.CombineConfig("TeX.noErrors", {
    disabled: false,
    multiLine: true,
    inlineDelimiters: ["", ""],   
    style: {
      "font-size": "90%",
      "text-align": "left",
      "color": "black",
      "padding": "1px 3px",
      "border": "1px solid"
    }
  });
  var NBSP = "\u00A0";
  MathJax.Extension["TeX/noErrors"] = {
    version: VERSION,
    config: CONFIG
  };
  HUB.Register.StartupHook("TeX Jax Ready", function () {
    var FORMAT = MathJax.InputJax.TeX.formatError;
    MathJax.InputJax.TeX.Augment({
      formatError: function (err, math, displaystyle, script) {
        if (CONFIG.disabled) { return FORMAT.apply(this, arguments) }
        var message = err.message.replace(/\n.*/, "");
        HUB.signal.Post(["TeX Jax - parse error", message, math, displaystyle, script]);
        var delim = CONFIG.inlineDelimiters;
        var multiLine = (displaystyle || CONFIG.multiLine);
        if (!displaystyle) { math = delim[0] + math + delim[1] }
        if (multiLine) { math = math.replace(/ /g, NBSP) } else { math = math.replace(/\n/g, " ") }
        return MathJax.ElementJax.mml.merror(math).With({ isError: true, multiLine: multiLine });
      }
    });
  });
  HUB.Register.StartupHook("HTML-CSS Jax Config", function () {
    HUB.Config({
      "HTML-CSS": {
        styles: {
          ".MathJax .noError": HUB.Insert({
            "vertical-align": (HUB.Browser.isMSIE && CONFIG.multiLine ? "-2px" : "")
          }, CONFIG.style)
        }
      }
    });
  });
  HUB.Register.StartupHook("HTML-CSS Jax Ready", function () {
    var MML = MathJax.ElementJax.mml;
    var HTMLCSS = MathJax.OutputJax["HTML-CSS"];
    var MATH = MML.math.prototype.toHTML,
      MERROR = MML.merror.prototype.toHTML;
    MML.math.Augment({
      toHTML: function (span, node) {
        var data = this.data[0];
        if (data && data.data[0] && data.data[0].isError) {
          span.style.fontSize = "";
          span = this.HTMLcreateSpan(span);
          span.bbox = data.data[0].toHTML(span).bbox;
        } else {
          span = MATH.call(this, span, node);
        }
        return span;
      }
    });
    MML.merror.Augment({
      toHTML: function (span) {
        if (!this.isError) { return MERROR.call(this, span) }
        span = this.HTMLcreateSpan(span); span.className = "noError"
        if (this.multiLine) { span.style.display = "inline-block" }
        var text = this.data[0].data[0].data.join("").split(/\n/);
        for (var i = 0, m = text.length; i < m; i++) {
          HTMLCSS.addText(span, text[i]);
          if (i !== m - 1) { HTMLCSS.addElement(span, "br", { isMathJax: true }) }
        }
        var HD = HTMLCSS.getHD(span.parentNode), W = HTMLCSS.getW(span.parentNode);
        if (m > 1) {
          var H = (HD.h + HD.d) / 2, x = HTMLCSS.TeX.x_height / 2;
          span.parentNode.style.verticalAlign = HTMLCSS.Em(HD.d + (x - H));
          HD.h = x + H; HD.d = H - x;
        }
        span.bbox = { h: HD.h, d: HD.d, w: W, lw: 0, rw: W };
        return span;
      }
    });
  });
  HUB.Register.StartupHook("SVG Jax Config", function () {
    HUB.Config({
      "SVG": {
        styles: {
          ".MathJax_SVG .noError": HUB.Insert({
            "vertical-align": (HUB.Browser.isMSIE && CONFIG.multiLine ? "-2px" : "")
          }, CONFIG.style)
        }
      }
    });
  });
  HUB.Register.StartupHook("SVG Jax Ready", function () {
    var MML = MathJax.ElementJax.mml;
    var MATH = MML.math.prototype.toSVG,
      MERROR = MML.merror.prototype.toSVG;
    MML.math.Augment({
      toSVG: function (span, node) {
        var data = this.data[0];
        if (data && data.data[0] && data.data[0].isError) { span = data.data[0].toSVG(span) } else { span = MATH.call(this, span, node) }
        return span;
      }
    });
    MML.merror.Augment({
      toSVG: function (span) {
        if (!this.isError || this.Parent().type !== "math") { return MERROR.call(this, span) }
        span = HTML.addElement(span, "span", { className: "noError", isMathJax: true });
        if (this.multiLine) { span.style.display = "inline-block" }
        var text = this.data[0].data[0].data.join("").split(/\n/);
        for (var i = 0, m = text.length; i < m; i++) {
          HTML.addText(span, text[i]);
          if (i !== m - 1) { HTML.addElement(span, "br", { isMathJax: true }) }
        }
        if (m > 1) {
          var H = span.offsetHeight / 2;
          span.style.verticalAlign = (-H + (H / m)) + "px";
        }
        return span;
      }
    });
  });
  HUB.Register.StartupHook("NativeMML Jax Ready", function () {
    var MML = MathJax.ElementJax.mml;
    var CONFIG = MathJax.Extension["TeX/noErrors"].config;
    var MATH = MML.math.prototype.toNativeMML,
      MERROR = MML.merror.prototype.toNativeMML;
    MML.math.Augment({
      toNativeMML: function (span) {
        var data = this.data[0];
        if (data && data.data[0] && data.data[0].isError) { span = data.data[0].toNativeMML(span) } else { span = MATH.call(this, span) }
        return span;
      }
    });
    MML.merror.Augment({
      toNativeMML: function (span) {
        if (!this.isError) { return MERROR.call(this, span) }
        span = span.appendChild(document.createElement("span"));
        var text = this.data[0].data[0].data.join("").split(/\n/);
        for (var i = 0, m = text.length; i < m; i++) {
          span.appendChild(document.createTextNode(text[i]));
          if (i !== m - 1) { span.appendChild(document.createElement("br")) }
        }
        if (this.multiLine) {
          span.style.display = "inline-block";
          if (m > 1) { span.style.verticalAlign = "middle" }
        }
        for (var id in CONFIG.style) {
          if (CONFIG.style.hasOwnProperty(id)) {
            var ID = id.replace(/-./g, function (c) { return c.charAt(1).toUpperCase() });
            span.style[ID] = CONFIG.style[id];
          }
        }
        return span;
      }
    });
  });
  HUB.Startup.signal.Post("TeX noErrors Ready");
})(MathJax.Hub, MathJax.HTML);
MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/noErrors.js");
