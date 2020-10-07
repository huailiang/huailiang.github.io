MathJax.Extension.jsMath2jax = {
  version: "2.0",
  config: { preview: "TeX" },
  PreProcess: function (element) {
    if (!this.configured) {
      this.config = MathJax.Hub.CombineConfig("jsMath2jax", this.config);
      if (this.config.Augment) { MathJax.Hub.Insert(this, this.config.Augment) }
      if (typeof (this.config.previewTeX) !== "undefined" && !this.config.previewTeX) { this.config.preview = "none" }
      this.previewClass = MathJax.Hub.config.preRemoveClass;
      this.configured = true;
    }
    if (typeof (element) === "string") { element = document.getElementById(element) }
    if (!element) { element = document.body }
    var span = element.getElementsByTagName("span"), i;
    for (i = span.length - 1; i >= 0; i--) { if (String(span[i].className).match(/(^| )math( |$)/)) { this.ConvertMath(span[i], "") } }
    var div = element.getElementsByTagName("div");
    for (i = div.length - 1; i >= 0; i--) { if (String(div[i].className).match(/(^| )math( |$)/)) { this.ConvertMath(div[i], "; mode=display") } }
  },
  ConvertMath: function (node, mode) {
    if (node.getElementsByTagName("script").length === 0) {
      var parent = node.parentNode,
        script = this.createMathTag(mode, node.innerHTML);
      if (node.nextSibling) { parent.insertBefore(script, node.nextSibling) }
      else { parent.appendChild(script) }
      if (this.config.preview !== "none") { this.createPreview(node) }
      parent.removeChild(node);
    }
  },
  createPreview: function (node) {
    var preview;
    if (this.config.preview === "TeX") { preview = [this.filterPreview(node.innerHTML)] }
    else if (this.config.preview instanceof Array) { preview = this.config.preview }
    if (preview) {
      preview = MathJax.HTML.Element("span", { className: MathJax.Hub.config.preRemoveClass }, preview);
      node.parentNode.insertBefore(preview, node);
    }
  },
  createMathTag: function (mode, tex) {
    tex = tex.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
    var script = document.createElement("script");
    script.type = "math/tex" + mode;
    MathJax.HTML.setScript(script, tex);
    return script;
  },
  filterPreview: function (tex) { return tex }
};
MathJax.Hub.Register.PreProcessor(["PreProcess", MathJax.Extension.jsMath2jax]);
MathJax.Ajax.loadComplete("[MathJax]/extensions/jsMath2jax.js");
