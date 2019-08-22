(function (HUB, HTML) {
  var VERSION = "2.0";
  var CONFIG = {
    style: {
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
    }
  };
  if (HUB.Browser.isIE9 && document.documentMode >= 9) { delete CONFIG.style.filter }
  var DIV;
  HUB.Register.StartupHook("onLoad", function () {
    var frame = document.body;
    if (HUB.Browser.isMSIE) {
      MathJax.Message.Init();
      frame = document.getElementById("MathJax_MSIE_frame") || frame;
      CONFIG.style.position = "absolute";
    } else { delete CONFIG.style.filter }
    CONFIG.style.maxWidth = (document.body.clientWidth - 75) + "px";
    DIV = HTML.addElement(frame, "div", { id: "MathJax_ConfigWarning", style: CONFIG.style }, [
      [
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
          onclick: function () { DIV.style.display = "none" }
        },
        [["span", { style: { position: "relative", bottom: ".2em" } }, ["x"]]]
      ],
      "MathJax no longer loads a default configuration file; " +
      "you must specify such files explicitly. " +
      "This page seems to use the older default ", ["code", {}, ["config/MathJax.js"]],
      " file, and so needs to be updated.  This is explained further at",
      ["p", { style: { "text-align": "center" } }, [
        ["a",
          { href: "http://www.mathjax.org/help/configuration" },
          ["http://www.mathjax.org/help/configuration"]
        ]
      ]]
    ]);
  });
})(MathJax.Hub, MathJax.HTML);
MathJax.Ajax.loadComplete("[MathJax]/extensions/v1.0-warning.js");
