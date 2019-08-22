MathJax.Extension["TeX/begingroup"] = { version: "2.0" };
MathJax.Hub.Register.StartupHook("TeX Jax Ready", function () {
  var TEX = MathJax.InputJax.TeX,
    TEXDEF = TEX.Definitions;
  var NSFRAME = MathJax.Object.Subclass({
    macros: null,
    environments: null,   
    Init: function (macros, environments) {
      this.macros = (macros || {});
      this.environments = (environments || {});
    },
    Find: function (name, type) { if (this[type][name]) { return this[type][name] } },
    Def: function (name, value, type) { this[type][name] = value },
    Undef: function (name, type) { delete this[type][name] },
    Merge: function (frame) {
      MathJax.Hub.Insert(this.macros, frame.macros);
      MathJax.Hub.Insert(this.environments, frame.environments);
    },
    MergeGlobals: function (stack) {
      var macros = this.macros;
      for (var cs in macros) {
        if (macros.hasOwnProperty(cs) && macros[cs].global) {
          stack.Def(cs, macros[cs], "macros", true);
          delete macros[cs].global; delete macros[cs];
        }
      }
    },
    Clear: function (all) {
      this.environments = {};
      if (all) { this.macros = {} } else {
        var macros = this.macros;
        for (var cs in macros) {
          if (macros.hasOwnProperty(cs) && !macros[cs].global) { delete macros[cs] }
        }
      }
      return this;
    }
  });
  var NSSTACK = TEX.nsStack = MathJax.Object.Subclass({
    stack: null, 
    top: 0,
    isEqn: false,
    Init: function (eqn) {
      this.isEqn = eqn; this.stack = [];
      if (!eqn) { this.Push(NSFRAME(TEXDEF.macros, TEXDEF.environments)) }
      else { this.Push(NSFRAME()) }
    },
    Def: function (name, value, type, global) {
      var n = this.top - 1;
      if (global) {
        while (n > 0) { this.stack[n].Undef(name, type); n-- }
        if (!(value instanceof Array)) { value = [value] }
        if (this.isEqn) { value.global = true }
      }
      this.stack[n].Def(name, value, type);
    },
    Push: function (frame) {
      this.stack.push(frame);
      this.top = this.stack.length;
    },
    Pop: function () {
      var top;
      if (this.top > 1) {
        top = this.stack[--this.top];
        if (this.isEqn) { this.stack.pop() }
      } else if (this.isEqn) {
        this.Clear();
      }
      return top;
    },
    Find: function (name, type) {
      for (var i = this.top - 1; i >= 0; i--) {
        var def = this.stack[i].Find(name, type);
        if (def) { return def }
      }
      return null;
    },
    Merge: function (stack) {
      stack.stack[0].MergeGlobals(this);
      this.stack[this.top - 1].Merge(stack.stack[0]);
      var data = [this.top, this.stack.length - this.top].concat(stack.stack.slice(1));
      this.stack.splice.apply(this.stack, data);
      this.top = this.stack.length;
    },
    Reset: function () { this.top = this.stack.length },
    Clear: function (all) {
      this.stack = [this.stack[0].Clear()];
      this.top = this.stack.length;
    }
  }, {
      nsFrame: NSFRAME
    });
  TEXDEF.macros.begingroup = "BeginGroup";
  TEXDEF.macros.endgroup = "EndGroup";
  TEXDEF.macros.global = ["Extension", "newcommand"];
  TEXDEF.macros.gdef = ["Extension", "newcommand"];
  TEX.Parse.Augment({
    BeginGroup: function (name) {
      TEX.eqnStack.Push(NSFRAME());
    },
    EndGroup: function (name) {
      if (TEX.eqnStack.top > 1) {
        TEX.eqnStack.Pop();
      } else if (TEX.rootStack.top === 1) {
        TEX.Error("Extra " + name + " or missing \\begingroup");
      } else {
        TEX.eqnStack.Clear();
        TEX.rootStack.Pop();
      }
    },
    csFindMacro: function (name) {
      return (TEX.eqnStack.Find(name, "macros") || TEX.rootStack.Find(name, "macros"));
    },
    envFindName: function (name) {
      return (TEX.eqnStack.Find(name, "environments") || TEX.rootStack.Find(name, "environments"));
    }
  });
  TEX.rootStack = NSSTACK();      
  TEX.eqnStack = NSSTACK(true);
  TEX.prefilterHooks.Add(function () { TEX.rootStack.Reset(); TEX.eqnStack.Clear(true) });
  TEX.postfilterHooks.Add(function () { TEX.rootStack.Merge(TEX.eqnStack) });
  MathJax.Hub.Register.StartupHook("TeX newcommand Ready", function () {
    TEXDEF.macros.global = "Global";
    TEXDEF.macros.gdef = ["Macro", "\\global\\def"];
    TEX.Parse.Augment({
      setDef: function (name, value) {
        value.isUser = true;
        TEX.eqnStack.Def(name, value, "macros", this.stack.env.isGlobal);
        delete this.stack.env.isGlobal;
      },
      setEnv: function (name, value) {
        value.isUser = true;
        TEX.eqnStack.Def(name, value, "environments")
      },
      Global: function (name) {
        var i = this.i; var cs = this.GetCSname(name); this.i = i;
        if (cs !== "let" && cs !== "def" && cs !== "newcommand") { TEX.Error(name + " not followed by \\let, \\def, or \\newcommand") }
        this.stack.env.isGlobal = true;
      }
    });
  });
  MathJax.Hub.Startup.signal.Post("TeX begingroup Ready");
});
MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/begingroup.js");
