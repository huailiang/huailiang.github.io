(function (HUB, HTML, AJAX, CALLBACK, OUTPUT, INPUT) {
  var VERSION = "2.0";
  var EXTENSION = MathJax.Extension;
  var ME = EXTENSION.MathEvents = { version: VERSION };
  var SETTINGS = HUB.config.menuSettings;
  var CONFIG = {
    hover: 500,
    frame: {
      x: 3.5, y: 5,          
      bwidth: 1,
      bcolor: "#A6D",      
      hwidth: "15px",
      hcolor: "#83A"
    },
    button: { },
    fadeinInc: .2,
    fadeoutInc: .05,
    fadeDelay: 50,
    fadeoutStart: 400,
    fadeoutDelay: 15 * 1000,
    styles: {
      ".MathJax_Hover_Frame": {
        "border-radius": ".25em",                  
        "-webkit-border-radius": ".25em",         
        "-moz-border-radius": ".25em",
        "-khtml-border-radius": ".25em",       
        "box-shadow": "0px 0px 15px #83A",
        "-webkit-box-shadow": "0px 0px 15px #83A",
        "-moz-box-shadow": "0px 0px 15px #83A",
        "-khtml-box-shadow": "0px 0px 15px #83A",
        border: "1px solid #A6D ! important",
        display: "inline-block", position: "absolute"
      }
    }
  };
  var Event = ME.Event = {
    LEFTBUTTON: 0,
    RIGHTBUTTON: 2,
    MENUKEY: "altKey",
    Handler: function (event, type, math) {
      var jax = OUTPUT[math.jaxID];
      if (!event) { event = window.event }
      event.isContextMenu = (type === "ContextMenu");
      if (jax[type]) { return jax[type](event, math) }
      if (EXTENSION.MathZoom) { return EXTENSION.MathZoom.HandleEvent(event, type, math) }
    },
    False: function (event) {
      if (!event) { event = window.event }
      if (event) {
        if (event.preventDefault) { event.preventDefault() }
        if (event.stopPropagation) { event.stopPropagation() }
        event.cancelBubble = true;
        event.returnValue = false;
      }
      return false;
    },
    getBBox: function (span) {
      span.appendChild(ME.topImg);
      var h = ME.topImg.offsetTop, d = span.offsetHeight - h, w = span.offsetWidth;
      span.removeChild(ME.topImg);
      return { w: w, h: h, d: d };
    }
  };
  var Hover = ME.Hover = {
    ClearHoverTimer: function () { if (this.hoverTimer) { clearTimeout(this.hoverTimer); delete this.hoverTimer } },
    ReHover: function (jax) {
      if (jax.hover.remove) { clearTimeout(jax.hover.remove) }
      jax.hover.remove = setTimeout(CALLBACK(["UnHover", this, jax]), CONFIG.fadeoutDelay);
      this.HoverFadeTimer(jax, CONFIG.fadeinInc);
    },
    UnHover: function (jax) {
      if (!jax.hover.nofade) { this.HoverFadeTimer(jax, -CONFIG.fadeoutInc, CONFIG.fadeoutStart) }
    },
    HoverFade: function (jax) { },
    HoverFadeTimer: function (jax, inc, delay) { },
    HoverMenu: function (event) { },
    ClearHover: function (jax) {
      if (jax.hover.remove) { clearTimeout(jax.hover.remove) }
      if (jax.hover.timer) { clearTimeout(jax.hover.timer) }
      Hover.ClearHoverTimer();
      delete jax.hover;
    },
    Px: function (m) {
      if (Math.abs(m) < .006) { return "0px" }
      return m.toFixed(2).replace(/\.?0+$/, "") + "px";
    }
  };
  var TOUCH = ME.Touch = {
    last: 0,
    delay: 500,     
    start: function (event) {
      var now = new Date().getTime();
      var dblTap = (now - TOUCH.last < TOUCH.delay);
      TOUCH.last = now;
      if (dblTap) {
        TOUCH.timeout = setTimeout(TOUCH.menu, TOUCH.delay, event, this);
        event.preventDefault();
      }
    },
    end: function (event) {
      if (TOUCH.timeout) {
        clearTimeout(TOUCH.timeout);
        delete TOUCH.timeout; TOUCH.last = 0;
        event.preventDefault();
        return Event.Handler((event.touches[0] || event.touch), "DblClick", this);
      }
    },
  };
  if (HUB.Browser.isMobile) { CONFIG.button.x = -6; }
  HUB.Browser.Select({
    MSIE: function (browser) {
      var mode = (document.documentMode || 0);
      var isIE8 = browser.versionAtLeast("8.0");
      ME.msieBorderWidthBug = (document.compatMode === "BackCompat");
      ME.msieEventBug = browser.isIE9;          
      ME.msieAlignBug = (!isIE8 || mode < 8);
      if (mode < 9) { Event.LEFTBUTTON = 1 }
    },
    Safari: function (browser) {ME.safariContextMenuBug = true},
    Opera: function (browser) {ME.operaPositionBug = true},
    Konqueror: function (browser) {ME.noContextMenuBug = true}
  });
  ME.topImg = (ME.msieAlignBug ?
    HTML.Element("img", { style: { width: 0, height: 0, position: "relative" }, src: "about:blank" }) :
    HTML.Element("span", { style: { width: 0, height: 0, display: "inline-block" } })
  );
  if (ME.operaPositionBug) { ME.topImg.style.border = "1px solid" }
  ME.config = CONFIG = HUB.CombineConfig("MathEvents", CONFIG);
  var SETFRAME = function () {
    var haze = CONFIG.styles[".MathJax_Hover_Frame"];
    haze.border = CONFIG.frame.bwidth + "px solid " + CONFIG.frame.bcolor + " ! important";
    haze["box-shadow"] = haze["-webkit-box-shadow"] =
      haze["-moz-box-shadow"] = haze["-khtml-box-shadow"] =
      "0px 0px " + CONFIG.frame.hwidth + " " + CONFIG.frame.hcolor;
  };
  CALLBACK.Queue(
    HUB.Register.StartupHook("End Config", {}), 
    [SETFRAME],
    ["Styles", AJAX, CONFIG.styles],
    ["Post", HUB.Startup.signal, "MathEvents Ready"],
    ["loadComplete", AJAX, "[MathJax]/extensions/MathEvents.js"]
  );
})(MathJax.Hub, MathJax.HTML, MathJax.Ajax, MathJax.Callback, MathJax.OutputJax, MathJax.InputJax);