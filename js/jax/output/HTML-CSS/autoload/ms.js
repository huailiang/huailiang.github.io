MathJax.Hub.Register.StartupHook("HTML-CSS Jax Ready", function () {
  var VERSION = "2.0";
  var MML = MathJax.ElementJax.mml,
    HTMLCSS = MathJax.OutputJax["HTML-CSS"];
  MML.ms.Augment({
    toHTML: function (span) {
      span = this.HTMLhandleSize(this.HTMLcreateSpan(span));
      var values = this.getValues("lquote", "rquote");
      var text = this.data.join("");  // FIXME:  handle mglyph?
      var pattern = [];
      if (values.lquote.length === 1) { pattern.push(this.HTMLquoteRegExp(values.lquote)) }
      if (values.rquote.length === 1) { pattern.push(this.HTMLquoteRegExp(values.rquote)) }
      if (pattern.length) { text = text.replace(RegExp("(" + pattern.join("|") + ")", "g"), "\\$1") }
      this.HTMLhandleVariant(span, this.HTMLgetVariant(), values.lquote + text + values.rquote);
      this.HTMLhandleSpace(span);
      this.HTMLhandleColor(span);
      return span;
    },
    HTMLquoteRegExp: function (string) {
      return string.replace(/([.*+?|{}()\[\]\\])/g, "\\$1");
    }
  });
  MML.ms.prototype.defaults.mathvariant = 'monospace';
  MathJax.Hub.Startup.signal.Post("HTML-CSS ms Ready");
  MathJax.Ajax.loadComplete(HTMLCSS.autoloadDir + "/ms.js");
});
