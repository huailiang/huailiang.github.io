MathJax.Extension["TeX/extpfeil"] = {version: "2.0"};
MathJax.Hub.Register.StartupHook("TeX Jax Ready", function () {
  var TEX = MathJax.InputJax.TeX,
    TEXDEF = TEX.Definitions;
  MathJax.Hub.Insert(TEXDEF, {
    macros: {
      xtwoheadrightarrow: ['Extension', 'AMSmath'],
      xtwoheadleftarrow: ['Extension', 'AMSmath'],
      xmapsto: ['Extension', 'AMSmath'],
      xlongequal: ['Extension', 'AMSmath'],
      xtofrom: ['Extension', 'AMSmath'],
      Newextarrow: ['Extension', 'AMSmath']
    }
  });
  MathJax.Hub.Register.StartupHook("TeX AMSmath Ready", function () {
    MathJax.Hub.Insert(TEXDEF, {
      macros: {
        xtwoheadrightarrow: ['xArrow', 0x21A0, 12, 16],
        xtwoheadleftarrow: ['xArrow', 0x219E, 17, 13],
        xmapsto: ['xArrow', 0x21A6, 6, 7],
        xlongequal: ['xArrow', 0x003D, 7, 7],
        xtofrom: ['xArrow', 0x21C4, 12, 12],
        Newextarrow: 'NewExtArrow'
      }
    });
  });
  TEX.Parse.Augment({
    NewExtArrow: function (name) {
      var cs = this.GetArgument(name),
        space = this.GetArgument(name),
        chr = this.GetArgument(name);
      if (!cs.match(/^\\([a-z]+|.)$/i)) { TEX.Error("First argument to " + name + " must be a control sequence name") }
      if (!space.match(/^(\d+),(\d+)$/)) { TEX.Error("Second argument to " + name + " must be two integers separated by a comma") }
      if (!chr.match(/^(\d+|0x[0-9A-F]+)$/i)) { TEX.Error("Third argument to " + name + " must be a unicode character number") }
      cs = cs.substr(1); space = space.split(","); chr = parseInt(chr);
      TEXDEF.macros[cs] = ['xArrow', chr, parseInt(space[0]), parseInt(space[1])];
    }
  });
  MathJax.Hub.Startup.signal.Post("TeX extpfeil Ready");
});
MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/extpfeil.js");
