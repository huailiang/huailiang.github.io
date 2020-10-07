MathJax.OutputJax["HTML-CSS"] = MathJax.OutputJax({
  id: "HTML-CSS",
  version: "2.0",
  directory: MathJax.OutputJax.directory + "/HTML-CSS",
  extensionDir: MathJax.OutputJax.extensionDir + "/HTML-CSS",
  autoloadDir: MathJax.OutputJax.directory + "/HTML-CSS/autoload",
  fontDir: MathJax.OutputJax.directory + "/HTML-CSS/fonts",
  webfontDir: MathJax.OutputJax.fontDir + "/HTML-CSS",     
  config: {
    scale: 100, minScaleAdjust: 50, 
    availableFonts: ["STIX", "TeX"], 
    preferredFont: "TeX",        
    webFont: "TeX",        
    imageFont: "TeX",           
    undefinedFamily: "STIXGeneral,'Arial Unicode MS',serif",
    mtextFontInherit: false,
    EqnChunk: (MathJax.Hub.Browser.isMobile ? 10 : 50),
    EqnChunkFactor: 1.5,        
    EqnChunkDelay: 100,
    linebreaks: {
      automatic: false,
      width: "container"
    },
    styles: {
      ".MathJax_Display": {
        "text-align": "center",
        margin: "1em 0em"
      },
      ".MathJax .merror": {
        "background-color": "#FFFF88",
        color: "#CC0000",
        border: "1px solid #CC0000",
        padding: "1px 3px",
        "font-style": "normal",
        "font-size": "90%"
      },
      "#MathJax_Tooltip": {
        "background-color": "InfoBackground", color: "InfoText",
        border: "1px solid black",
        "box-shadow": "2px 2px 5px #AAAAAA",     
        "-webkit-box-shadow": "2px 2px 5px #AAAAAA", 
        "-moz-box-shadow": "2px 2px 5px #AAAAAA",  
        "-khtml-box-shadow": "2px 2px 5px #AAAAAA",  
        filter: "progid:DXImageTransform.Microsoft.dropshadow(OffX=2, OffY=2, Color='gray', Positive='true')", // IE
        padding: "3px 4px"
      }
    }
  }
});
if (MathJax.Hub.Browser.isMSIE && document.documentMode >= 9) { delete MathJax.OutputJax["HTML-CSS"].config.styles["#MathJax_Tooltip"].filter }
if (!MathJax.Hub.config.delayJaxRegistration) { MathJax.OutputJax["HTML-CSS"].Register("jax/mml") }
MathJax.Hub.Register.StartupHook("End Config", [function (HUB, HTMLCSS) {
  var CONFIG = HUB.Insert({
    minBrowserVersion: {
      Firefox: 3.0,
      Opera: 9.52,
      MSIE: 6.0,
      Chrome: 0.3,
      Safari: 2.0,
      Konqueror: 4.0
    },
    inlineMathDelimiters: ['$', '$'],
    displayMathDelimiters: ['$$', '$$'],
    multilineDisplay: true,
    minBrowserTranslate: function (script) {
      var MJ = HUB.getJaxFor(script), text = ["[Math]"], delim;
      var span = document.createElement("span", { className: "MathJax_Preview" });
      if (MJ.inputJax === "TeX") {
        if (MJ.root.Get("displaystyle")) {
          delim = CONFIG.displayMathDelimiters;
          text = [delim[0] + MJ.originalText + delim[1]];
          if (CONFIG.multilineDisplay) text = text[0].split(/\n/);
        } else {
          delim = CONFIG.inlineMathDelimiters;
          text = [delim[0] + MJ.originalText.replace(/^\s+/, "").replace(/\s+$/, "") + delim[1]];
        }
      }
      for (var i = 0, m = text.length; i < m; i++) {
        span.appendChild(document.createTextNode(text[i]));
        if (i < m - 1) { span.appendChild(document.createElement("br")) }
      }
      script.parentNode.insertBefore(span, script);
    }
  }, (HUB.config["HTML-CSS"] || {}));
  if (HUB.Browser.version !== "0.0" &&
    !HUB.Browser.versionAtLeast(CONFIG.minBrowserVersion[HUB.Browser] || 0.0)) {
    HTMLCSS.Translate = CONFIG.minBrowserTranslate;
    HUB.Config({ showProcessingMessages: false });
    MathJax.Message.Set("Your browser does not support MathJax", null, 4000);
    HUB.Startup.signal.Post("MathJax not supported");
  }
}, MathJax.Hub, MathJax.OutputJax["HTML-CSS"]]);
MathJax.OutputJax["HTML-CSS"].loadComplete("config.js");
