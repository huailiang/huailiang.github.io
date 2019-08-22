(function (nMML, HUB, AJAX, HTML) {
  var MML, isMSIE = HUB.Browser.isMSIE;
  var EVENT, TOUCH, HOVER, ZOOM; 
  HUB.Register.StartupHook("MathZoom Ready", function () { ZOOM = MathJax.Extension.MathZoom });
  nMML.Augment({
    config: {
      styles: {
        ".MathJax_mmlExBox": {
          display: "block", overflow: "hidden",
          height: "1px", width: "60ex",
          padding: 0, border: 0, margin: 0
        }
      }
    },
    settings: HUB.config.menuSettings,
    Config: function () {
      this.SUPER(arguments).Config.call(this);
      if (this.settings.scale) { this.config.scale = this.settings.scale }
      if (HUB.config.displayAlign !== "center") {
        var align = HUB.config.displayAlign, indent = HUB.config.displayIndent;
        var def = { "text-align": align + "!important" }; def["margin-" + align] = indent + "!important";
        MathJax.Hub.Insert(this.config.styles, {
          "div.MathJax_MathML": def,
          "div.MathJax_MathML math": { "text-align": align },
          "div.MathJax_MathContainer > span": { "text-align": align + "!important" }
        });
      }
      if (!this.require) { this.require = [] }
      this.require.push(MathJax.OutputJax.extensionDir + "/MathEvents.js");
    },
    Startup: function () {
      EVENT = MathJax.Extension.MathEvents.Event;
      TOUCH = MathJax.Extension.MathEvents.Touch;
      HOVER = MathJax.Extension.MathEvents.Hover;
      this.ContextMenu = EVENT.ContextMenu;
      this.Mousedown = EVENT.AltContextMenu;
      this.Mouseover = HOVER.Mouseover;
      this.Mouseout = HOVER.Mouseout;
      this.Mousemove = HOVER.Mousemove;
      if (!isMSIE) {
        this.EmExSpan = HTML.Element("span",
          { style: { position: "absolute", "font-size-adjust": "none" } },
          [
            ["div", { className: "MathJax_mmlExBox" }],
            ["span", { className: "MathJax_MathML" }]
          ]
        );
        MML.math(MML.mspace().With({ width: "60ex" })).toNativeMML(this.EmExSpan.lastChild);
      }
      return AJAX.Styles(this.config.styles);
    },
    InitializeMML: function () {
      this.initialized = true;
      if (isMSIE) {
        try {
          if (!HUB.Browser.hasMathPlayer) {
            var mathplayer = document.createElement("object");
            mathplayer.id = "mathplayer"; mathplayer.classid = "clsid:32F66A20-7614-11D4-BD11-00104BD3F987";
            document.getElementsByTagName("head")[0].appendChild(mathplayer);
            document.namespaces.add("m", "http://www.w3.org/1998/Math/MathML");
            HUB.Browser.hasMathPlayer = true;
          }
          if (!HUB.Browser.mpImported) {
            document.namespaces.m.doImport("#mathplayer");
            HUB.Browser.mpImported = true;
          }
        } catch (err) {
          alert("MathJax was not able to set up MathPlayer.\n\n" +
            "If MathPlayer is not installed, you need to install it first.\n" +
            "Otherwise, your security settings may be preventing ActiveX     \n" +
            "controls from running.  Use the Internet Options item under\n" +
            "the Tools menu and select the Security tab, then press the\n" +
            "Custom Level button. Check that the settings for\n" +
            "'Run ActiveX Controls', and 'Binary and script behaviors'\n" +
            "are enabled.\n\n" +
            "Currently you will see error messages rather than\n" +
            "typeset mathematics.");
        }
      } else {
        document.body.appendChild(this.EmExSpan);
        this.defaultEx = this.EmExSpan.firstChild.offsetWidth / 60;
        this.defaultMEx = this.EmExSpan.lastChild.offsetWidth / 60;
        document.body.removeChild(this.EmExSpan);
      }
    },
    preTranslate: function (state) {
      var scripts = state.jax[this.id], i, m = scripts.length,
        script, prev, span, test, math, jax, ex, mex, scale;
      for (i = 0; i < m; i++) {
        script = scripts[i]; if (!script.parentNode) continue;
        if (!this.initialized) { this.InitializeMML() }
        prev = script.previousSibling;
        if (prev && prev.className === "MathJax_MathML") { prev.parentNode.removeChild(prev) }
        jax = script.MathJax.elementJax; math = jax.root; jax.NativeMML = {};
        var type = (math.Get("display") === "block" ? "div" : "span");
        span = HTML.Element(type, {
          className: "MathJax_MathML", id: jax.inputID + "-Frame"
        }, [["span", {
          className: "MathJax_MathContainer", isMathJax: true, jaxID: this.id,
          style: { position: "relative", display: "inline-block", "white-space": "nowrap" }
        }, [["span", { isMathJax: true, style: { display: "inline-block" } }]] // for Firefox hover and zoom
        ]]);
        script.parentNode.insertBefore(span, script);
        if (!isMSIE) { script.parentNode.insertBefore(this.EmExSpan.cloneNode(true), script) }
      }
      for (i = 0; i < m; i++) {
        script = scripts[i]; if (!script.parentNode) continue;
        jax = script.MathJax.elementJax;
        if (!isMSIE) {
          test = script.previousSibling; span = test.previousSibling;
          ex = test.firstChild.offsetWidth / 60;
          mex = test.lastChild.offsetWidth / 60;
          if (ex === 0 || ex === "NaN") { ex = this.defaultEx; mex = this.defaultMEx }
          scale = (mex > 1 ? ex / mex : 1) * this.config.scale;
          scale = Math.floor(Math.max(this.config.minScaleAdjust / 100, scale));
        } else { scale = 100 }
        jax.NativeMML.fontSize = scale + "%";
      }
      if (!isMSIE) {
        for (i = 0; i < m; i++) {
          script = scripts[i]; if (!script.parentNode) continue;
          test = scripts[i].previousSibling;
          test.parentNode.removeChild(test);
        }
      }
    },
    Translate: function (script) {
      if (!script.parentNode) return;
      var jax = script.MathJax.elementJax, math = jax.root;
      var span = document.getElementById(jax.inputID + "-Frame"),
        container = span.firstChild, mspan = container.firstChild;
      span.style.fontSize = jax.NativeMML.fontSize;
      try { math.toNativeMML(mspan) } catch (err) {
        if (err.restart) { while (mspan.firstChild) { mspan.removeChild(mspan.firstChild) } }
        throw err;
      }
      if (isMSIE) {
        if (container.addEventListener) {
          for (var id in this.MSIE9events) {
            if (this.MSIE9events.hasOwnProperty(id)) container.addEventListener(id, this.MSIE9event, true);
          }
        } else {
          var config = (this.config.showMathMenuMSIE != null ? this : HUB).config;
          if (config.showMathMenuMSIE && !this.settings.mpContext && !this.settings.mpMouse) { this.MSIEoverlay(container) } else { container.style.position = ""; mspan.firstChild.onmousedown = this.MSIEaltMenu }
        }
      } else {
        container.oncontextmenu = EVENT.Menu;
        container.onmouseover = EVENT.Mouseover;
        container.onmouseout = EVENT.Mouseout;
        container.onmousedown = EVENT.Mousedown;
        container.onclick = EVENT.Click;
        container.ondblclick = EVENT.DblClick;
      }
    },
    postTranslate: function (state) {
      if (this.forceReflow) {
        var sheet = (document.styleSheets || [])[0] || {};
        sheet.disabled = true; sheet.disabled = false;
      }
    },
    Remove: function (jax) {
      var span = jax.SourceElement(); if (!span) return;
      span = span.previousSibling; if (!span) return;
      if (span.className.match(/MathJax_MathML/)) { span.parentNode.removeChild(span) }
    },
    MMLnamespace: "http://www.w3.org/1998/Math/MathML",
    MSIEoverlay: function (span) {
      var math = span.firstChild;
      if (math.nodeName.toLowerCase() === "span") { math = math.firstChild }
      var bbox = this.getHoverBBox(null, math, {});
      HTML.addElement(span, "span", {
        style: { display: "inline-block", width: 0, height: 0, position: "relative" }
      }, [["span", {
        isMathJax: true, className: "MathJax_MathPlayer_Overlay",
        style: {
          display: "inline-block", position: "absolute",
          left: HOVER.Px(-bbox.w), top: HOVER.Px(-bbox.h - (bbox.y || 0) - 1),
          width: HOVER.Px(bbox.w), height: HOVER.Px(bbox.h + bbox.d), cursor: "pointer",
          "background-color": "white", filter: "alpha(opacity=0)"
        }
      }]]);
      HUB.Insert(span, {msieMath: math});
    },
    getJaxFromMath: function (math) { return HUB.getJaxFor(math.parentNode.nextSibling) },
    getHoverSpan: function (jax, math) { return math.firstChild },
    getHoverBBox: function (jax, span, math) { return EVENT.getBBox(span.parentNode) },
    Zoom: function (jax, span, math, Mw, Mh) {
      jax.root.toNativeMML(span);
      if (this.msieIE8HeightBug) { span.style.position = "absolute" }
      var mW = math.offsetWidth || math.scrollWidth,
        mH = math.offsetHeight || math.scrollHeight;
      var zW = span.offsetWidth, zH = span.offsetHeight;
      if (this.msieIE8HeightBug) { span.style.position = "" }
      return { Y: -EVENT.getBBox(span.parentNode).h, mW: mW, mH: mH, zW: zW, zH: zH }
    },
    NAMEDSPACE: {
      negativeveryverythinmathspace: "-.0556em",
      negativeverythinmathspace: "-.1111em",
      negativethinmathspace: "-.1667em",
      negativemediummathspace: "-.2222em",
      negativethickmathspace: "-.2778em",
      negativeverythickmathspace: "-.3333em",
      negativeveryverythickmathspace: "-.3889em"
    }
  });
  HUB.Register.StartupHook("mml Jax Ready", function () {
    MML = MathJax.ElementJax.mml;
    MML.mbase.Augment({
      toNativeMML: function (parent) {
        var tag = this.NativeMMLelement(this.type);
        this.NativeMMLattributes(tag);
        for (var i = 0, m = this.data.length; i < m; i++) {
          if (this.data[i]) { this.data[i].toNativeMML(tag) }
          else { tag.appendChild(this.NativeMMLelement("mrow")) }
        }
        parent.appendChild(tag);
      },
      NativeMMLattributes: function (tag) {
        var defaults = this.defaults;
        var copy = (this.attrNames || MML.copyAttributeNames), skip = MML.skipAttributes;
        if (!this.attrNames) {
          if (this.type === "mstyle") { defaults = MML.math.prototype.defaults }
          for (var id in defaults) {
            if (!skip[id] && defaults.hasOwnProperty(id)) {
              if (this[id] != null) { tag.setAttribute(id, this.NativeMMLattribute(this[id])) }
            }
          }
        }
        for (var i = 0, m = copy.length; i < m; i++) {
          var value = (this.attr || {})[copy[i]]; if (value == null) { value = this[copy[i]] }
          if (value != null) { tag.setAttribute(copy[i], this.NativeMMLattribute(value)) }
        }
        this.NativeMMLclass(tag);
      },
      NativeMMLclass: function (tag) {
        var CLASS = []; if (this["class"]) { CLASS.push(this["class"]) }
        if (this.isa(MML.TeXAtom)) {
          var TEXCLASS = ["ORD", "OP", "BIN", "REL", "OPEN", "CLOSE", "PUNCT", "INNER", "VCENTER"][this.texClass];
          if (TEXCLASS) { CLASS.push("MJX-TeXAtom-" + TEXCLASS) }
        }
        if (this.mathvariant && this.NativeMMLvariants[this.mathvariant]) { CLASS.push("MJX" + this.mathvariant) }
        if (this.arrow) { CLASS.push("MJX-arrow") }
        if (this.variantForm) { CLASS.push("MJX-variant") }
        if (CLASS.length) { tag.setAttribute("class", CLASS.join(" ")) }
      },
      NativeMMLattribute: function (value) {
        value = String(value);
        if (nMML.NAMEDSPACE[value]) { value = nMML.NAMEDSPACE[value] } 
        else if (value.match(/^\s*(([-+])?(\d+(\.\d*)?|\.\d+))\s*mu\s*$/)) { value = ((1 / 18) * RegExp.$1).toFixed(3).replace(/\.?0+$/, "") + "em" } 
        else if (this.NativeMMLvariants[value]) { value = this.NativeMMLvariants[value] }
        return value;
      },
      NativeMMLvariants: {
        "-tex-caligraphic": MML.VARIANT.SCRIPT,
        "-tex-caligraphic-bold": MML.VARIANT.BOLDSCRIPT,
        "-tex-oldstyle": MML.VARIANT.NORMAL,
        "-tex-oldstyle-bold": MML.VARIANT.BOLD,
        "-tex-mathit": MML.VARIANT.ITALIC
      },
      NativeMMLelement: function (type) {
        var math = (isMSIE ? document.createElement("m:" + type) :
          document.createElementNS(nMML.MMLnamespace, type));
        math.isMathJax = true;
        return math;
      }
    });
    MML.mrow.Augment({
      toNativeMML: function (parent) {
        if (this.inferred && this.parent.inferRow) {
          for (var i = 0, m = this.data.length; i < m; i++) {
            if (this.data[i]) { this.data[i].toNativeMML(parent) }
            else { parent.appendChild(this.NativeMMLelement("mrow")) }
          }
        } else {
          this.SUPER(arguments).toNativeMML.call(this, parent);
        }
      }
    });
    MML.msubsup.Augment({
      toNativeMML: function (parent) {
        var type = this.type;
        if (this.data[this.sup] == null) { type = "msub" }
        if (this.data[this.sub] == null) { type = "msup" }
        var tag = this.NativeMMLelement(type);
        this.NativeMMLattributes(tag);
        delete this.data[0].inferred;
        for (var i = 0, m = this.data.length; i < m; i++) { if (this.data[i]) { this.data[i].toNativeMML(tag) } }
        parent.appendChild(tag);
      }
    });
    MML.munderover.Augment({
      toNativeMML: function (parent) {
        var type = this.type;
        if (this.data[this.under] == null) { type = "mover" }
        if (this.data[this.over] == null) { type = "munder" }
        var tag = this.NativeMMLelement(type);
        this.NativeMMLattributes(tag);
        delete this.data[0].inferred;
        for (var i = 0, m = this.data.length; i < m; i++) { if (this.data[i]) { this.data[i].toNativeMML(tag) } }
        parent.appendChild(tag);
      }
    });
    if (HUB.Browser.isFirefox) {
      MML.mtable.Augment({
        toNativeMML: function (parent) {
          if (this.width) {
            var styles = (this.style || "").replace(/;\s*$/, "").split(";");
            if (styles[0] === "") { styles.shift() }
            styles.push("width:" + this.width);
            this.style = styles.join(";");
          }
          this.SUPER(arguments).toNativeMML.call(this, parent);
        }
      });
      if (!HUB.Browser.versionAtLeast("9.0")) {
        MML.mlabeledtr.Augment({
          toNativeMML: function (parent) {
            var tag = this.NativeMMLelement("mtr");
            this.NativeMMLattributes(tag);
            for (var i = 1, m = this.data.length; i < m; i++) {
              if (this.data[i]) { this.data[i].toNativeMML(tag) }
              else { tag.appendChild(this.NativeMMLelement("mrow")) }
            }
            parent.appendChild(tag);
          }
        });
      }
      var fontDir = MathJax.OutputJax.fontDir + "/HTML-CSS/TeX/otf";
      nMML.Augment({
        config: {
          styles: {
            '[mathvariant="double-struck"]': { "font-family": "MathJax_AMS, MathJax_AMS-WEB" },
            '[mathvariant="script"]': { "font-family": "MathJax_Script, MathJax_Script-WEB" },
            '[mathvariant="fraktur"]': { "font-family": "MathJax_Fraktur, MathJax_Fraktur-WEB" },
            '[mathvariant="bold-script"]': { "font-family": "MathJax_Script, MathJax_Caligraphic-WEB", "font-weight": "bold" },
            '[mathvariant="bold-fraktur"]': { "font-family": "MathJax_Fraktur, MathJax_Fraktur-WEB", "font-weight": "bold" },
            '[mathvariant="monospace"]': { "font-family": "monospace" },
            '[mathvariant="sans-serif"]': { "font-family": "sans-serif" },
            '[mathvariant="bold-sans-serif"]': { "font-family": "sans-serif", "font-weight": "bold" },
            '[mathvariant="sans-serif-italic"]': { "font-family": "sans-serif", "font-style": "italic" },
            '[mathvariant="sans-serif-bold-italic"]': { "font-family": "sans-serif", "font-style": "italic", "font-weight": "bold" },
            '[class="MJX-tex-oldstyle"]': { "font-family": "MathJax_Caligraphic, MathJax_Caligraphic-WEB" },
            '[class="MJX-tex-oldstyle-bold"]': { "font-family": "MathJax_Caligraphic, MathJax_Caligraphic-WEB", "font-weight": "bold" },
            '[class="MJX-tex-caligraphic"]': { "font-family": "MathJax_Caligraphic, MathJax_Caligraphic-WEB" },
            '[class="MJX-tex-caligraphic-bold"]': { "font-family": "MathJax_Caligraphic, MathJax_Caligraphic-WEB", "font-weight": "bold" },
            '@font-face /*1*/': {
              "font-family": "MathJax_AMS-WEB",
              "src": "url('" + fontDir + "/MathJax_AMS-Regular.otf')"
            },
            '@font-face /*2*/': {
              "font-family": "MathJax_Script-WEB",
              "src": "url('" + fontDir + "/MathJax_Script-Regular.otf')"
            },
            '@font-face /*3*/': {
              "font-family": "MathJax_Fraktur-WEB",
              "src": "url('" + fontDir + "/MathJax_Fraktur-Regular.otf')"
            },
            '@font-face /*4*/': {
              "font-family": "MathJax_Caligraphic-WEB",
              "src": "url('" + fontDir + "/MathJax_Caligraphic-Regular.otf')"
            },
            '@font-face /*5*/': {
              "font-family": "MathJax_Fraktur-WEB", "font-weight": "bold",
              "src": "url('" + fontDir + "/MathJax_Fraktur-Bold.otf')"
            },
            '@font-face /*6*/': {
              "font-family": "MathJax_Caligraphic-WEB", "font-weight": "bold",
              "src": "url('" + fontDir + "/MathJax_Caligraphic-Bold.otf')"
            }
          }
        }
      });
    }
    MML.math.Augment({
      toNativeMML: function (parent) {
        var tag = this.NativeMMLelement(this.type), math = tag;
        tag.setAttribute("xmlns", nMML.MMLnamespace);
        this.NativeMMLattributes(tag);
        if (nMML.widthBug) { tag = tag.appendChild(this.NativeMMLelement("mrow")) }
        for (var i = 0, m = this.data.length; i < m; i++) {
          if (this.data[i]) { this.data[i].toNativeMML(tag) }
          else { tag.appendChild(this.NativeMMLelement("mrow")) }
        }
        parent.appendChild(math);
        if (nMML.widthBug) { parent.style.width = math.firstChild.scrollWidth + "px" }
      }
    });
    MML.TeXAtom.Augment({
      toNativeMML: function (parent) {
        var tag = this.NativeMMLelement("mrow");
        this.NativeMMLattributes(tag);
        this.data[0].toNativeMML(tag);
        parent.appendChild(tag);
      }
    });
    MML.chars.Augment({
      toNativeMML: function (parent) {parent.appendChild(document.createTextNode(this.toString()));}
    });
    MML.entity.Augment({
      toNativeMML: function (parent) {parent.appendChild(document.createTextNode(this.toString()));}
    });
    MML.xml.Augment({
      toNativeMML: function (parent) {
        for (var i = 0, m = this.data.length; i < m; i++) { parent.appendChild(this.data[i].cloneNode(true)) }
      }
    });
    HUB.Register.StartupHook("TeX mathchoice Ready", function () {
      MML.TeXmathchoice.Augment({
        toNativeMML: function (parent) { this.Core().toNativeMML(parent) }
      });
    });
    setTimeout(MathJax.Callback(["loadComplete", nMML, "jax.js"]), 0);
  });
  HUB.Browser.Select({
    MSIE: function (browser) {
      var mode = (document.documentMode || 0);
      nMML.msieIE8HeightBug = (mode === 8);
    },
    Opera: function (browser) {nMML.operaPositionBug = true;},
    Firefox: function (browser) {nMML.forceReflow = true;nMML.widthBug = true;}
  });
  HUB.Register.StartupHook("End Cookie", function () {
    if (HUB.config.menuSettings.zoom !== "None") { AJAX.Require("[MathJax]/extensions/MathZoom.js") }
  });
})(MathJax.OutputJax.NativeMML, MathJax.Hub, MathJax.Ajax, MathJax.HTML);
