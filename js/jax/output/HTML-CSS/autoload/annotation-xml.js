MathJax.Hub.Register.StartupHook("HTML-CSS Jax Ready", function () {
  var VERSION = "2.0";
  var MML = MathJax.ElementJax.mml,
    HTMLCSS = MathJax.OutputJax["HTML-CSS"];
  MML["annotation-xml"].Augment({
    toHTML: function (span) {
      span = this.HTMLhandleSize(this.HTMLcreateSpan(span));
      var encoding = this.Get("encoding");
      for (var i = 0, m = this.data.length; i < m; i++) { this.data[i].toHTML(span, encoding) }
      this.HTMLhandleSpace(span);
      this.HTMLhandleColor(span);
      return span;
    },
    HTMLgetScale: function () {
      return this.SUPER(arguments).HTMLgetScale.call(this) / HTMLCSS.scale;
    }
  });
  MML.xml.Augment({
    toHTML: function (span, encoding) {
      for (var i = 0, m = this.data.length; i < m; i++) { span.appendChild(this.data[i].cloneNode(true)) }
      span.bbox.w = HTMLCSS.getW(span); span.bbox.rw = span.bbox.w;
      var HD = HTMLCSS.getHD(span);
      span.bbox.h = HD.h; span.bbox.d = HD.d;
    }
  });
  MathJax.Hub.Startup.signal.Post("HTML-CSS annotation-xml Ready");
  MathJax.Ajax.loadComplete(HTMLCSS.autoloadDir + "/annotation-xml.js");
});
