(function (MML) {
  var MO = MML.mo.OPTYPES;
  var TEXCLASS = MML.TEXCLASS;
  MathJax.Hub.Insert(MML.mo.prototype, {
    OPTABLE: {
      infix: {
        '\u2900': MO.RELACCENT, 
        '\u2901': MO.RELACCENT, 
        '\u2902': MO.RELACCENT, 
        '\u2903': MO.RELACCENT, 
        '\u2904': MO.RELACCENT, 
        '\u2905': MO.RELACCENT, 
        '\u2906': MO.RELACCENT, 
        '\u2907': MO.RELACCENT, 
        '\u2908': MO.REL,      
        '\u2909': MO.REL,      
        '\u290A': MO.RELSTRETCH, 
        '\u290B': MO.RELSTRETCH, 
        '\u290C': MO.WIDEREL,  
        '\u290D': MO.WIDEREL,  
        '\u290E': MO.WIDEREL,  
        '\u290F': MO.WIDEREL,  
        '\u2910': MO.WIDEREL,  
        '\u2911': MO.RELACCENT, 
        '\u2912': MO.RELSTRETCH, 
        '\u2913': MO.RELSTRETCH, 
        '\u2914': MO.RELACCENT, 
        '\u2915': MO.RELACCENT, 
        '\u2916': MO.RELACCENT, 
        '\u2917': MO.RELACCENT, 
        '\u2918': MO.RELACCENT, 
        '\u2919': MO.RELACCENT, 
        '\u291A': MO.RELACCENT, 
        '\u291B': MO.RELACCENT, 
        '\u291C': MO.RELACCENT, 
        '\u291D': MO.RELACCENT, 
        '\u291E': MO.RELACCENT, 
        '\u291F': MO.RELACCENT, 
        '\u2920': MO.RELACCENT, 
        '\u2921': MO.RELSTRETCH, 
        '\u2922': MO.RELSTRETCH, 
        '\u2923': MO.REL,      
        '\u2924': MO.REL,      
        '\u2925': MO.REL,      
        '\u2926': MO.REL,      
        '\u2927': MO.REL,      
        '\u2928': MO.REL,      
        '\u2929': MO.REL,      
        '\u292A': MO.REL,      
        '\u292B': MO.REL,      
        '\u292C': MO.REL,      
        '\u292D': MO.REL,      
        '\u292E': MO.REL,      
        '\u292F': MO.REL,      
        '\u2930': MO.REL,      
        '\u2931': MO.REL,      
        '\u2932': MO.REL,      
        '\u2933': MO.RELACCENT, 
        '\u2934': MO.REL,      
        '\u2935': MO.REL,      
        '\u2936': MO.REL,      
        '\u2937': MO.REL,      
        '\u2938': MO.REL,      
        '\u2939': MO.REL,      
        '\u293A': MO.RELACCENT, 
        '\u293B': MO.RELACCENT, 
        '\u293C': MO.RELACCENT, 
        '\u293D': MO.RELACCENT, 
        '\u293E': MO.REL,      
        '\u293F': MO.REL,      
        '\u2940': MO.REL,      
        '\u2941': MO.REL,      
        '\u2942': MO.RELACCENT, 
        '\u2943': MO.RELACCENT, 
        '\u2944': MO.RELACCENT, 
        '\u2945': MO.RELACCENT, 
        '\u2946': MO.RELACCENT, 
        '\u2947': MO.RELACCENT, 
        '\u2948': MO.RELACCENT, 
        '\u2949': MO.REL,      
        '\u294A': MO.RELACCENT, 
        '\u294B': MO.RELACCENT, 
        '\u294C': MO.REL,      
        '\u294D': MO.REL,      
        '\u294E': MO.WIDEREL,  
        '\u294F': MO.RELSTRETCH, 
        '\u2950': MO.WIDEREL,  
        '\u2951': MO.RELSTRETCH, 
        '\u2952': MO.WIDEREL,  
        '\u2953': MO.WIDEREL,  
        '\u2954': MO.RELSTRETCH, 
        '\u2955': MO.RELSTRETCH, 
        '\u2956': MO.RELSTRETCH, 
        '\u2957': MO.RELSTRETCH, 
        '\u2958': MO.RELSTRETCH, 
        '\u2959': MO.RELSTRETCH, 
        '\u295A': MO.WIDEREL,  
        '\u295B': MO.WIDEREL,  
        '\u295C': MO.RELSTRETCH, 
        '\u295D': MO.RELSTRETCH, 
        '\u295E': MO.WIDEREL,  
        '\u295F': MO.WIDEREL,  
        '\u2960': MO.RELSTRETCH, 
        '\u2961': MO.RELSTRETCH, 
        '\u2962': MO.RELACCENT, 
        '\u2963': MO.REL,      
        '\u2964': MO.RELACCENT, 
        '\u2965': MO.REL,      
        '\u2966': MO.RELACCENT, 
        '\u2967': MO.RELACCENT, 
        '\u2968': MO.RELACCENT, 
        '\u2969': MO.RELACCENT, 
        '\u296A': MO.RELACCENT, 
        '\u296B': MO.RELACCENT, 
        '\u296C': MO.RELACCENT, 
        '\u296D': MO.RELACCENT, 
        '\u296E': MO.RELSTRETCH, 
        '\u296F': MO.RELSTRETCH, 
        '\u2970': MO.RELACCENT, 
        '\u2971': MO.RELACCENT, 
        '\u2972': MO.RELACCENT, 
        '\u2973': MO.RELACCENT, 
        '\u2974': MO.RELACCENT, 
        '\u2975': MO.RELACCENT, 
        '\u2976': MO.RELACCENT, 
        '\u2977': MO.RELACCENT, 
        '\u2978': MO.RELACCENT, 
        '\u2979': MO.RELACCENT, 
        '\u297A': MO.RELACCENT, 
        '\u297B': MO.RELACCENT, 
        '\u297C': MO.RELACCENT, 
        '\u297D': MO.RELACCENT, 
        '\u297E': MO.REL,      
        '\u297F': MO.REL       
      }
    }
  });
  MathJax.Ajax.loadComplete(MML.optableDir + "/SupplementalArrowsB.js");
})(MathJax.ElementJax.mml);