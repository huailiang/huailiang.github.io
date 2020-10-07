(function (MML) {
  var MO = MML.mo.OPTYPES;
  var TEXCLASS = MML.TEXCLASS;
  MathJax.Hub.Insert(MML.mo.prototype, {
    OPTABLE: {
      prefix: {
        '\u2980': [0, 0, TEXCLASS.ORD, { fence: true, stretchy: true }], 
        '\u2983': MO.OPEN,     
        '\u2985': MO.OPEN,     
        '\u2987': MO.OPEN,     
        '\u2989': MO.OPEN,     
        '\u298B': MO.OPEN,     
        '\u298D': MO.OPEN,     
        '\u298F': MO.OPEN,     
        '\u2991': MO.OPEN,     
        '\u2993': MO.OPEN,     
        '\u2995': MO.OPEN,     
        '\u2997': MO.OPEN,     
        '\u29FC': MO.OPEN      
      },
      postfix: {
        '\u2980': [0, 0, TEXCLASS.ORD, { fence: true, stretchy: true }], 
        '\u2984': MO.CLOSE,    
        '\u2986': MO.CLOSE,    
        '\u2988': MO.CLOSE,    
        '\u298A': MO.CLOSE,    
        '\u298C': MO.CLOSE,    
        '\u298E': MO.CLOSE,    
        '\u2990': MO.CLOSE,    
        '\u2992': MO.CLOSE,    
        '\u2994': MO.CLOSE,    
        '\u2996': MO.CLOSE,    
        '\u2998': MO.CLOSE,    
        '\u29FD': MO.CLOSE     
      },
      infix: {
        '\u2981': MO.BIN3,     
        '\u2982': MO.BIN3,     
        '\u2999': MO.BIN3,     
        '\u299A': MO.BIN3,     
        '\u299B': MO.BIN3,     
        '\u299C': MO.BIN3,     
        '\u299D': MO.BIN3,     
        '\u299E': MO.BIN3,     
        '\u299F': MO.BIN3,     
        '\u29A0': MO.BIN3,     
        '\u29A1': MO.BIN3,     
        '\u29A2': MO.BIN3,     
        '\u29A3': MO.BIN3,     
        '\u29A4': MO.BIN3,     
        '\u29A5': MO.BIN3,     
        '\u29A6': MO.BIN3,     
        '\u29A7': MO.BIN3,     
        '\u29A8': MO.BIN3,     
        '\u29A9': MO.BIN3,     
        '\u29AA': MO.BIN3,     
        '\u29AB': MO.BIN3,     
        '\u29AC': MO.BIN3,     
        '\u29AD': MO.BIN3,     
        '\u29AE': MO.BIN3,     
        '\u29AF': MO.BIN3,     
        '\u29B0': MO.BIN3,     
        '\u29B1': MO.BIN3,     
        '\u29B2': MO.BIN3,     
        '\u29B3': MO.BIN3,     
        '\u29B4': MO.BIN3,     
        '\u29B5': MO.BIN3,     
        '\u29B6': MO.BIN4,     
        '\u29B7': MO.BIN4,     
        '\u29B8': MO.BIN4,     
        '\u29B9': MO.BIN4,     
        '\u29BA': MO.BIN4,     
        '\u29BB': MO.BIN4,     
        '\u29BC': MO.BIN4,     
        '\u29BD': MO.BIN4,     
        '\u29BE': MO.BIN4,     
        '\u29BF': MO.BIN4,     
        '\u29C0': MO.REL,      
        '\u29C1': MO.REL,      
        '\u29C2': MO.BIN3,     
        '\u29C3': MO.BIN3,     
        '\u29C4': MO.BIN4,     
        '\u29C5': MO.BIN4,     
        '\u29C6': MO.BIN4,     
        '\u29C7': MO.BIN4,     
        '\u29C8': MO.BIN4,     
        '\u29C9': MO.BIN3,     
        '\u29CA': MO.BIN3,     
        '\u29CB': MO.BIN3,     
        '\u29CC': MO.BIN3,     
        '\u29CD': MO.BIN3,     
        '\u29CE': MO.REL,      
        '\u29CF': MO.REL,      
        '\u29CF\u0338': MO.REL, 
        '\u29D0': MO.REL,      
        '\u29D0\u0338': MO.REL, 
        '\u29D1': MO.REL,      
        '\u29D2': MO.REL,      
        '\u29D3': MO.REL,      
        '\u29D4': MO.REL,      
        '\u29D5': MO.REL,      
        '\u29D6': MO.BIN4,     
        '\u29D7': MO.BIN4,     
        '\u29D8': MO.BIN3,     
        '\u29D9': MO.BIN3,     
        '\u29DB': MO.BIN3,     
        '\u29DC': MO.BIN3,     
        '\u29DD': MO.BIN3,     
        '\u29DE': MO.REL,      
        '\u29DF': MO.BIN3,     
        '\u29E0': MO.BIN3,     
        '\u29E1': MO.REL,      
        '\u29E2': MO.BIN4,     
        '\u29E3': MO.REL,      
        '\u29E4': MO.REL,      
        '\u29E5': MO.REL,      
        '\u29E6': MO.REL,      
        '\u29E7': MO.BIN3,     
        '\u29E8': MO.BIN3,     
        '\u29E9': MO.BIN3,     
        '\u29EA': MO.BIN3,     
        '\u29EB': MO.BIN3,     
        '\u29EC': MO.BIN3,     
        '\u29ED': MO.BIN3,     
        '\u29EE': MO.BIN3,     
        '\u29EF': MO.BIN3,     
        '\u29F0': MO.BIN3,     
        '\u29F1': MO.BIN3,     
        '\u29F2': MO.BIN3,     
        '\u29F3': MO.BIN3,     
        '\u29F4': MO.REL,      
        '\u29F5': MO.BIN4,     
        '\u29F6': MO.BIN4,     
        '\u29F7': MO.BIN4,     
        '\u29F8': MO.BIN3,     
        '\u29F9': MO.BIN3,     
        '\u29FA': MO.BIN3,     
        '\u29FB': MO.BIN3,     
        '\u29FE': MO.BIN4,     
        '\u29FF': MO.BIN4      
      }
    }
  });
  MathJax.Ajax.loadComplete(MML.optableDir + "/MiscMathSymbolsB.js");
})(MathJax.ElementJax.mml);
