(function (HUB, HTML) {
  var VERSION = "2.0";
  var CONFIG = HUB.CombineConfig("FontWarnings", {
    messageStyle: {
      position: "fixed", bottom: "4em", left: "3em", width: "40em",
      border: "3px solid #880000", "background-color": "#E0E0E0", color: "black",
      padding: "1em", "font-size": "small", "white-space": "normal",
      "border-radius": ".75em",
      "-webkit-border-radius": ".75em",
      "-moz-border-radius": ".75em",
      "-khtml-border-radius": ".75em",
      "box-shadow": "4px 4px 10px #AAAAAA",
      "-webkit-box-shadow": "4px 4px 10px #AAAAAA",
      "-moz-box-shadow": "4px 4px 10px #AAAAAA",
      "-khtml-box-shadow": "4px 4px 10px #AAAAAA",
      filter: "progid:DXImageTransform.Microsoft.dropshadow(OffX=3, OffY=3, Color='gray', Positive='true')" // IE
    },
    Message: {
      webFont: [
        ["closeBox"],
        "MathJax is using web-based fonts to display the mathematics ",
        "on this page.  These take time to download, so the page would ",
        "render faster if you installed math fonts directly in your ",
        "system's font folder.",
        ["fonts"]
      ],
      imageFonts: [
        ["closeBox"],
        "MathJax is using its image fonts rather than local or web-based fonts. ",
        "This will render slower than usual, and the mathematics may not print ",
        "at the full resolution of your printer.",
        ["fonts"],
        ["webfonts"]
      ],
      noFonts: [
        ["closeBox"],
        "MathJax is unable to locate a font to use to display ",
        "its mathematics, and image fonts are not available, so it ",
        "is falling back on generic unicode characters in hopes that ",
        "your browser will be able to display them.  Some characters ",
        "may not show up properly, or possibly not at all.",
        ["fonts"],
        ["webfonts"]
      ]
    },
    HTML: {
      closeBox: [[
        "div", {
          style: {
            position: "absolute", overflow: "hidden", top: ".1em", right: ".1em",
            border: "1px outset", width: "1em", height: "1em",
            "text-align": "center", cursor: "pointer",
            "background-color": "#EEEEEE", color: "#606060",
            "border-radius": ".5em",    
            "-webkit-border-radius": ".5em",
            "-moz-border-radius": ".5em",
            "-khtml-border-radius": ".5em"
          },
          onclick: function () {
            if (DATA.div && DATA.fade === 0) { if (DATA.timer) { clearTimeout(DATA.timer) }; DATA.div.style.display = "none" }
          }
        },
        [["span", { style: { position: "relative", bottom: ".2em" } }, ["x"]]]
      ]],
      webfonts: [
        ["p"],
        "Most modern browsers allow for fonts to be downloaded over the web. ",
        "Updating to a more recent version of your browser (or changing browsers) ",
        "could improve the quality of the mathematics on this page."
      ],
      fonts: [
        ["p"],
        "MathJax can use either the ",
        ["a", { href: "http://www.stixfonts.org/", target: "_blank" }, "STIX fonts"],
        " or the ",
        ["a", { href: "http://www.mathjax.org/help-v2/fonts/", target: "_blank" }, ["MathJax TeX fonts"]],
        ".  Download and install either one to improve your MathJax experience."
      ],
      STIXfonts: [
        ["p"],
        "This page is designed to use the ",
        ["a", { href: "http://www.stixfonts.org/", target: "_blank" }, "STIX fonts"],
        ".  Download and install those fonts to improve your MathJax experience."
      ],
      TeXfonts: [
        ["p"],
        "This page is designed to use the ",
        ["a", { href: "http://www.mathjax.org/help-v2/fonts/", target: "_blank" }, ["MathJax TeX fonts"]],
        ".  Download and install those fonts to improve your MathJax experience."
      ]
    },
    removeAfter: 12 * 1000,  
    fadeoutSteps: 10,     
    fadeoutTime: 1.5 * 1000
  });
  if (MathJax.Hub.Browser.isIE9 && document.documentMode >= 9) { delete CONFIG.messageStyle.filter }
  var DATA = { div: null, fade: 0};
  var CREATEMESSAGE = function (data) {
    if (DATA.div) return;
    var HTMLCSS = MathJax.OutputJax["HTML-CSS"], frame = document.body;
    if (HUB.Browser.isMSIE) {
      if (CONFIG.messageStyle.position === "fixed") {
        MathJax.Message.Init();
        frame = document.getElementById("MathJax_MSIE_Frame");
        CONFIG.messageStyle.position = "absolute";
      }
    } else { delete CONFIG.messageStyle.filter }
    CONFIG.messageStyle.maxWidth = (document.body.clientWidth - 75) + "px";
    var i = 0; while (i < data.length) {
      if (data[i] instanceof Array && CONFIG.HTML[data[i][0]]) { data.splice.apply(data, [i, 1].concat(CONFIG.HTML[data[i][0]])) } else { i++ }
    }
    DATA.div = HTMLCSS.addElement(frame, "div", { id: "MathJax_FontWarning", style: CONFIG.messageStyle }, data);
    if (CONFIG.removeAfter) HUB.Register.StartupHook("End", function () { DATA.timer = setTimeout(FADEOUT, CONFIG.removeAfter) });
    HTML.Cookie.Set("fontWarn", { warned: true });
  };
  var FADEOUT = function () {
    DATA.fade++; if (DATA.timer) { delete DATA.timer }
    if (DATA.fade < CONFIG.fadeoutSteps) {
      var opacity = 1 - DATA.fade / CONFIG.fadeoutSteps;
      DATA.div.style.opacity = opacity;
      DATA.div.style.filter = "alpha(opacity=" + Math.floor(100 * opacity) + ")";
      setTimeout(FADEOUT, CONFIG.fadeoutTime / CONFIG.fadeoutSteps);
    } else DATA.div.style.display = "none";
  };
  if (!HTML.Cookie.Get("fontWarn").warned) {
    HUB.Startup.signal.Interest(function (message) {
      if (message.match(/HTML-CSS Jax - /) && !DATA.div) {
        var HTMLCSS = MathJax.OutputJax["HTML-CSS"], FONTS = HTMLCSS.config.availableFonts, MSG;
        var localFonts = (FONTS && FONTS.length);
        if (!localFonts) { CONFIG.HTML.fonts = [""] }
        else if (FONTS.length === 1) { CONFIG.HTML.fonts = CONFIG.HTML[FONTS[0] + "fonts"] }
        if (HTMLCSS.allowWebFonts) { CONFIG.HTML.webfonts = [""] }
        if (message.match(/- Web-Font/)) { if (localFonts) { MSG = "webFont" } }
        else if (message.match(/- using image fonts/)) { MSG = "imageFonts" }
        else if (message.match(/- no valid font/)) { MSG = "noFonts" }
        if (MSG && CONFIG.Message[MSG]) { CREATEMESSAGE(CONFIG.Message[MSG]) }
      }
    });
  }
})(MathJax.Hub, MathJax.HTML);
MathJax.Ajax.loadComplete("[MathJax]/extensions/FontWarnings.js");
