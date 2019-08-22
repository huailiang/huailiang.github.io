(function (HTMLCSS,MML,AJAX) {
  var VERSION = "2.0";
  var MAIN   = "MathJax_Main",
      BOLD   = "MathJax_Main-bold",
      ITALIC = "MathJax_Math-italic",
      AMS    = "MathJax_AMS",
      SIZE1  = "MathJax_Size1",
      SIZE2  = "MathJax_Size2",
      SIZE3  = "MathJax_Size3",
      SIZE4  = "MathJax_Size4";
  var H = "H", V = "V", EXTRAH = {load:"extra", dir:H}, EXTRAV = {load:"extra", dir:V};
  HTMLCSS.Augment({
    FONTDATA: {
      version: VERSION,
      TeX_factor: 1,    
      baselineskip: 1.2,
      lineH: .8, lineD: .2,
      hasStyleChar: true,  
      FONTS: {
        "MathJax_Main":             "Main/Regular/Main.js",
        "MathJax_Main-bold":        "Main/Bold/Main.js",
        "MathJax_Main-italic":      "Main/Italic/Main.js",
        "MathJax_Math-italic":      "Math/Italic/Main.js",
        "MathJax_Math-bold-italic": "Math/BoldItalic/Main.js",
        "MathJax_Caligraphic":      "Caligraphic/Regular/Main.js",
        "MathJax_Size1":            "Size1/Regular/Main.js",
        "MathJax_Size2":            "Size2/Regular/Main.js",
        "MathJax_Size3":            "Size3/Regular/Main.js",
        "MathJax_Size4":            "Size4/Regular/Main.js",
        "MathJax_AMS":              "AMS/Regular/Main.js",
        "MathJax_Fraktur":          "Fraktur/Regular/Main.js",
        "MathJax_Fraktur-bold":     "Fraktur/Bold/Main.js",
        "MathJax_SansSerif":        "SansSerif/Regular/Main.js",
        "MathJax_SansSerif-bold":   "SansSerif/Bold/Main.js",
        "MathJax_SansSerif-italic": "SansSerif/Italic/Main.js",
        "MathJax_Script":           "Script/Regular/Main.js",
        "MathJax_Typewriter":       "Typewriter/Regular/Main.js"
      },
      VARIANT: {
        "normal": {fonts:[MAIN,SIZE1,AMS],
                   offsetG: 0x03B1, variantG: "italic",
                   remap: {0x391:0x41, 0x392:0x42, 0x395:0x45, 0x396:0x5A, 0x397:0x48,
                           0x399:0x49, 0x39A:0x4B, 0x39C:0x4D, 0x39D:0x4E, 0x39F:0x4F,
                           0x3A1:0x50, 0x3A4:0x54, 0x3A7:0x58, 0x29F8:[0x002F,"italic"]}},
        "bold":   {fonts:[BOLD,SIZE1,AMS], bold:true,
                   offsetG: 0x03B1, variantG: "bold-italic",
                   remap: {0x391:0x41, 0x392:0x42, 0x395:0x45, 0x396:0x5A, 0x397:0x48,
                           0x399:0x49, 0x39A:0x4B, 0x39C:0x4D, 0x39D:0x4E, 0x39F:0x4F,
                           0x3A1:0x50, 0x3A4:0x54, 0x3A7:0x58, 0x29F8:[0x002F,"bold-italic"],
                           0x2204:"\u2203\u0338", 0x2224:"\u2223\u0338", 0x2226:"\u2225\u0338",
                           0x2241:"\u223C\u0338", 0x2247:"\u2245\u0338", 
                           0x226E:"<\u0338", 0x226F:">\u0338",
                           0x2270:"\u2264\u0338", 0x2271:"\u2265\u0338",
                           0x2280:"\u227A\u0338", 0x2281:"\u227B\u0338",
                           0x2288:"\u2286\u0338", 0x2289:"\u2287\u0338",
                           0x22AC:"\u22A2\u0338", 0x22AD:"\u22A8\u0338",
//                         0x22AE:"\u22A9\u0338", 0x22AF:"\u22AB\u0338",
                           0x22E0:"\u227C\u0338", 0x22E1:"\u227D\u0338"
//                         0x22EA:"\u22B2\u0338", 0x22EB:"\u22B3\u0338",
//                         0x22EC:"\u22B4\u0338", 0x22ED:"\u22B5\u0338"
                  }},
        "italic": {fonts:[ITALIC,"MathJax_Main-italic",MAIN,SIZE1,AMS], italic:true,
                   remap: {0x391:0x41, 0x392:0x42, 0x395:0x45, 0x396:0x5A, 0x397:0x48,
                           0x399:0x49, 0x39A:0x4B, 0x39C:0x4D, 0x39D:0x4E, 0x39F:0x4F,
                           0x3A1:0x50, 0x3A4:0x54, 0x3A7:0x58}},
        "bold-italic": {fonts:["MathJax_Math-bold-italic",BOLD,SIZE1,AMS], bold:true, italic:true,
                   remap: {0x391:0x41, 0x392:0x42, 0x395:0x45, 0x396:0x5A, 0x397:0x48,
                           0x399:0x49, 0x39A:0x4B, 0x39C:0x4D, 0x39D:0x4E, 0x39F:0x4F,
                           0x3A1:0x50, 0x3A4:0x54, 0x3A7:0x58}},
        "double-struck": {fonts:[AMS, MAIN]},
        "fraktur": {fonts:["MathJax_Fraktur",MAIN,SIZE1,AMS]},
        "bold-fraktur": {fonts:["MathJax_Fraktur-bold",BOLD,SIZE1,AMS], bold:true},
        "script": {fonts:["MathJax_Script",MAIN,SIZE1,AMS]},
        "bold-script": {fonts:["MathJax_Script",BOLD,SIZE1,AMS], bold:true},
        "sans-serif": {fonts:["MathJax_SansSerif",MAIN,SIZE1,AMS]},
        "bold-sans-serif": {fonts:["MathJax_SansSerif-bold",BOLD,SIZE1,AMS], bold:true},
        "sans-serif-italic": {fonts:["MathJax_SansSerif-italic","MathJax_Main-italic",SIZE1,AMS], italic:true},
        "sans-serif-bold-italic": {fonts:["MathJax_SansSerif-italic","MathJax_Main-italic",SIZE1,AMS], bold:true, italic:true},
        "monospace": {fonts:["MathJax_Typewriter",MAIN,SIZE1,AMS]},
        "-tex-caligraphic": {fonts:["MathJax_Caligraphic",MAIN], offsetA: 0x41, variantA: "italic"},
        "-tex-oldstyle": {fonts:["MathJax_Caligraphic",MAIN]},
        "-tex-mathit": {fonts:["MathJax_Main-italic",ITALIC,MAIN,SIZE1,AMS], italic:true, noIC: true,
                   remap: {0x391:0x41, 0x392:0x42, 0x395:0x45, 0x396:0x5A, 0x397:0x48,
                           0x399:0x49, 0x39A:0x4B, 0x39C:0x4D, 0x39D:0x4E, 0x39F:0x4F,
                           0x3A1:0x50, 0x3A4:0x54, 0x3A7:0x58}},
        "-largeOp": {fonts:[SIZE2,SIZE1,MAIN]},
        "-smallOp": {fonts:[SIZE1,MAIN]}
      },
      RANGES: [
        {name: "alpha", low: 0x61, high: 0x7A, offset: "A", add: 32},
        {name: "number", low: 0x30, high: 0x39, offset: "N"},
        {name: "greek", low: 0x03B1, high: 0x03F6, offset: "G"}
      ],
      RULECHAR: 0x2212,
      REMAP: {
        0x203E: 0x2C9,                  
        0x20D0: 0x21BC, 0x20D1: 0x21C0, 
        0x20D6: 0x2190, 0x20E1: 0x2194, 
        0x20EC: 0x21C1, 0x20ED: 0x21BD, 
        0x20EE: 0x2190, 0x20EF: 0x2192, 
        0x20F0: 0x2A,                   
        0xFE37: 0x23DE, 0xFE38: 0x23DF, 
        0xB7: 0x22C5,                   
        0x2B9: 0x2032,                  
        0x3D2: 0x3A5,                   
        0x2015: 0x2014, 0x2017: 0x5F,   
        0x2022: 0x2219, 0x2044: 0x2F,   
        0x2305: 0x22BC, 0x2306: 0x2A5E, 
        0x25AA: 0x25A0, 0x25B4: 0x25B2, 
        0x25B5: 0x25B3, 0x25BE: 0x25BC, 
        0x25BF: 0x25BD, 0x25C2: 0x25C0, 
        0x2329: 0x27E8, 0x232A: 0x27E9, 
        0x3008: 0x27E8, 0x3009: 0x27E9, 
        0x2758: 0x2223,                 
        0x2A2F: 0xD7,                   
        0x2102: [0x0043,MML.VARIANT.DOUBLESTRUCK],
//      0x210A: [0x0067,MML.VARIANT.SCRIPT],
        0x210B: [0x0048,MML.VARIANT.SCRIPT],
        0x210C: [0x0048,MML.VARIANT.FRAKTUR],
        0x210D: [0x0048,MML.VARIANT.DOUBLESTRUCK],
        0x210E: [0x0068,MML.VARIANT.ITALIC],
        0x2110: [0x004A,MML.VARIANT.SCRIPT],
        0x2111: [0x004A,MML.VARIANT.FRAKTUR],
        0x2112: [0x004C,MML.VARIANT.SCRIPT],
        0x2115: [0x004E,MML.VARIANT.DOUBLESTRUCK],
        0x2119: [0x0050,MML.VARIANT.DOUBLESTRUCK],
        0x211A: [0x0051,MML.VARIANT.DOUBLESTRUCK],
        0x211B: [0x0052,MML.VARIANT.SCRIPT],
        0x211C: [0x0052,MML.VARIANT.FRAKTUR],
        0x211D: [0x0052,MML.VARIANT.DOUBLESTRUCK],
        0x2124: [0x005A,MML.VARIANT.DOUBLESTRUCK],
        0x2126: [0x03A9,MML.VARIANT.NORMAL],
        0x2128: [0x005A,MML.VARIANT.FRAKTUR],
        0x212C: [0x0042,MML.VARIANT.SCRIPT],
        0x212D: [0x0043,MML.VARIANT.FRAKTUR],
//      0x212F: [0x0065,MML.VARIANT.SCRIPT],
        0x2130: [0x0045,MML.VARIANT.SCRIPT],
        0x2131: [0x0046,MML.VARIANT.SCRIPT],
        0x2133: [0x004D,MML.VARIANT.SCRIPT],
//      0x2134: [0x006F,MML.VARIANT.SCRIPT],
        0x2247: 0x2246,                 
        0x231C: 0x250C, 0x231D:0x2510,  
        0x231E: 0x2514, 0x231F:0x2518,  
        0x2204: "\u2203\u0338",    
        0x220C: "\u220B\u0338",    
        0x2244: "\u2243\u0338",    
        0x2249: "\u2248\u0338",    
        0x2262: "\u2261\u0338",    
        0x2274: "\u2272\u0338",    
        0x2275: "\u2273\u0338",    
        0x2278: "\u2276\u0338",    
        0x2279: "\u2277\u0338",    
        0x2284: "\u2282\u0338",    
        0x2285: "\u2283\u0338",    
        0x22E2: "\u2291\u0338",    
        0x22E3: "\u2292\u0338",    
        0x2033: "\u2032\u2032",        
        0x2034: "\u2032\u2032\u2032",  
        0x2036: "\u2035\u2035",        
        0x2037: "\u2035\u2035\u2035",  
        0x2057: "\u2032\u2032\u2032\u2032"  
      },
      REMAPACCENT: {
        "\u2192":"\u20D7"
      },
      REMAPACCENTUNDER: {
      },
      PLANE1MAP: [
        [0x1D400,0x1D419, 0x41, MML.VARIANT.BOLD],
        [0x1D41A,0x1D433, 0x61, MML.VARIANT.BOLD],
        [0x1D434,0x1D44D, 0x41, MML.VARIANT.ITALIC],
        [0x1D44E,0x1D467, 0x61, MML.VARIANT.ITALIC],
        [0x1D468,0x1D481, 0x41, MML.VARIANT.BOLDITALIC],
        [0x1D482,0x1D49B, 0x61, MML.VARIANT.BOLDITALIC],
        [0x1D49C,0x1D4B5, 0x41, MML.VARIANT.SCRIPT],
//      [0x1D4B6,0x1D4CF, 0x61, MML.VARIANT.SCRIPT],
//      [0x1D4D0,0x1D4E9, 0x41, MML.VARIANT.BOLDSCRIPT],
//      [0x1D4EA,0x1D503, 0x61, MML.VARIANT.BOLDSCRIPT],
        [0x1D504,0x1D51D, 0x41, MML.VARIANT.FRAKTUR],
        [0x1D51E,0x1D537, 0x61, MML.VARIANT.FRAKTUR],
        [0x1D538,0x1D551, 0x41, MML.VARIANT.DOUBLESTRUCK],
//      [0x1D552,0x1D56B, 0x61, MML.VARIANT.DOUBLESTRUCK],
        [0x1D56C,0x1D585, 0x41, MML.VARIANT.BOLDFRAKTUR],
        [0x1D586,0x1D59F, 0x61, MML.VARIANT.BOLDFRAKTUR],
        [0x1D5A0,0x1D5B9, 0x41, MML.VARIANT.SANSSERIF],
        [0x1D5BA,0x1D5D3, 0x61, MML.VARIANT.SANSSERIF],
        [0x1D5D4,0x1D5ED, 0x41, MML.VARIANT.BOLDSANSSERIF],
        [0x1D5EE,0x1D607, 0x61, MML.VARIANT.BOLDSANSSERIF],
        [0x1D608,0x1D621, 0x41, MML.VARIANT.SANSSERIFITALIC],
        [0x1D622,0x1D63B, 0x61, MML.VARIANT.SANSSERIFITALIC],
//      [0x1D63C,0x1D655, 0x41, MML.VARIANT.SANSSERIFBOLDITALIC],
//      [0x1D656,0x1D66F, 0x61, MML.VARIANT.SANSSERIFBOLDITALIC],
        [0x1D670,0x1D689, 0x41, MML.VARIANT.MONOSPACE],
        [0x1D68A,0x1D6A3, 0x61, MML.VARIANT.MONOSPACE],
        [0x1D6A8,0x1D6C1, 0x391, MML.VARIANT.BOLD],
//      [0x1D6C2,0x1D6E1, 0x3B1, MML.VARIANT.BOLD],
        [0x1D6E2,0x1D6FA, 0x391, MML.VARIANT.ITALIC],
        [0x1D6FC,0x1D71B, 0x3B1, MML.VARIANT.ITALIC],
        [0x1D71C,0x1D734, 0x391, MML.VARIANT.BOLDITALIC],
        [0x1D736,0x1D755, 0x3B1, MML.VARIANT.BOLDITALIC],
        [0x1D756,0x1D76E, 0x391, MML.VARIANT.BOLDSANSSERIF],
//      [0x1D770,0x1D78F, 0x3B1, MML.VARIANT.BOLDSANSSERIF],
        [0x1D790,0x1D7A8, 0x391, MML.VARIANT.SANSSERIFBOLDITALIC],
//      [0x1D7AA,0x1D7C9, 0x3B1, MML.VARIANT.SANSSERIFBOLDITALIC],
        [0x1D7CE,0x1D7D7, 0x30, MML.VARIANT.BOLD],
//      [0x1D7D8,0x1D7E1, 0x30, MML.VARIANT.DOUBLESTRUCK],
        [0x1D7E2,0x1D7EB, 0x30, MML.VARIANT.SANSSERIF],
        [0x1D7EC,0x1D7F5, 0x30, MML.VARIANT.BOLDSANSSERIF],
        [0x1D7F6,0x1D7FF, 0x30, MML.VARIANT.MONOSPACE]
      ],
      REMAPGREEK: {
        0x391: 0x41, 0x392: 0x42, 0x395: 0x45, 0x396: 0x5A,
        0x397: 0x48, 0x399: 0x49, 0x39A: 0x4B, 0x39C: 0x4D,
        0x39D: 0x4E, 0x39F: 0x4F, 0x3A1: 0x50, 0x3A2: 0x398,
        0x3A4: 0x54, 0x3A7: 0x58, 0x3AA: 0x2207,
        0x3CA: 0x2202, 0x3CB: 0x3F5, 0x3CC: 0x3D1, 0x3CD: 0x3F0,
        0x3CE: 0x3D5, 0x3CF: 0x3F1, 0x3D0: 0x3D6
      },
      RemapPlane1: function (n,variant) {
        for (var i = 0, m = this.PLANE1MAP.length; i < m; i++) {
          if (n < this.PLANE1MAP[i][0]) break;
          if (n <= this.PLANE1MAP[i][1]) {
            n = n - this.PLANE1MAP[i][0] + this.PLANE1MAP[i][2];
            if (this.REMAPGREEK[n]) {n = this.REMAPGREEK[n]}
            variant = this.VARIANT[this.PLANE1MAP[i][3]];
            break;
          }
        }
        return {n: n, variant: variant};
      },
      DELIMITERS: {
        0x0028: 
        {
          dir: V, HW: [[1,MAIN],[1.2,SIZE1],[1.8,SIZE2],[2.4,SIZE3],[3.0,SIZE4]],
          stretch: {top: [0x239B,SIZE4], ext: [0x239C,SIZE4], bot: [0x239D,SIZE4]}
        },
        0x0029: 
        {
          dir: V, HW: [[1,MAIN],[1.2,SIZE1],[1.8,SIZE2],[2.4,SIZE3],[3.0,SIZE4]],
          stretch: {top:[0x239E,SIZE4], ext:[0x239F,SIZE4], bot:[0x23A0,SIZE4]}
        },
        0x002F: 
        {
          dir: V, HW: [[1,MAIN],[1.2,SIZE1],[1.8,SIZE2],[2.4,SIZE3],[3.0,SIZE4]]
        },
        0x005B: 
        {
          dir: V, HW: [[1,MAIN],[1.2,SIZE1],[1.8,SIZE2],[2.4,SIZE3],[3.0,SIZE4]],
          stretch: {top:[0x23A1,SIZE4], ext:[0x23A2,SIZE4], bot:[0x23A3,SIZE4]}
        },
        0x005C: 
        {
          dir: V, HW: [[1,MAIN],[1.2,SIZE1],[1.8,SIZE2],[2.4,SIZE3],[3.0,SIZE4]]
        },
        0x005D: 
        {
          dir: V, HW: [[1,MAIN],[1.2,SIZE1],[1.8,SIZE2],[2.4,SIZE3],[3.0,SIZE4]],
          stretch: {top:[0x23A4,SIZE4], ext:[0x23A5,SIZE4], bot:[0x23A6,SIZE4]}
        },
        0x007B: 
        {
          dir: V, HW: [[1,MAIN],[1.2,SIZE1],[1.8,SIZE2],[2.4,SIZE3],[3.0,SIZE4]],
          stretch: {top:[0x23A7,SIZE4], mid:[0x23A8,SIZE4], bot:[0x23A9,SIZE4], ext:[0x23AA,SIZE4]}
        },
        0x007C: 
        {
          dir: V, HW: [[1,MAIN]], stretch: {ext:[0x2223,MAIN]}
        },
        0x007D: 
        {
          dir: V, HW: [[1,MAIN],[1.2,SIZE1],[1.8,SIZE2],[2.4,SIZE3],[3.0,SIZE4]],
          stretch: {top: [0x23AB,SIZE4], mid:[0x23AC,SIZE4], bot: [0x23AD,SIZE4], ext: [0x23AA,SIZE4]}
        },
        0x00AF: 
        {
          dir: H, HW: [[.59,MAIN]], stretch: {rep:[0xAF,MAIN]}
        },
        0x02C6: 
        {
          dir: H, HW: [[.267+.25,MAIN],[.567+.25,SIZE1],[1.005+.33,SIZE2],[1.447+.33,SIZE3],[1.909,SIZE4]]
        },
        0x02DC: 
        {
          dir: H, HW: [[.333+.25,MAIN],[.555+.25,SIZE1],[1+.33,SIZE2],[1.443+.33,SIZE3],[1.887,SIZE4]]
        },
        0x2016: 
        {
          dir: V, HW: [[.602,SIZE1],[1,MAIN,null,0x2225]], stretch: {ext:[0x2225,MAIN]}
        },
        0x2190: 
        {
          dir: H, HW: [[1,MAIN]], stretch: {left:[0x2190,MAIN],rep:[0x2212,MAIN]}
        },
        0x2191: 
        {
          dir: V, HW: [[.888,MAIN]], stretch: {top:[0x2191,SIZE1], ext:[0x23D0,SIZE1]}
        },
        0x2192: 
        {
          dir: H, HW: [[1,MAIN]], stretch: {rep:[0x2212,MAIN], right:[0x2192,MAIN]}
        },
        0x2193: 
        {
          dir: V, HW: [[.888,MAIN]], stretch: {ext:[0x23D0,SIZE1], bot:[0x2193,SIZE1]}
        },
        0x2194: 
        {
          dir: H, HW: [[1,MAIN]],
          stretch: {left:[0x2190,MAIN],rep:[0x2212,MAIN], right:[0x2192,MAIN]}
        },
        0x2195: 
        {
          dir: V, HW: [[1.044,MAIN]],
          stretch: {top:[0x2191,SIZE1], ext:[0x23D0,SIZE1], bot:[0x2193,SIZE1]}
        },
        0x21D0: 
        {
          dir: H, HW: [[1,MAIN]], stretch: {left:[0x21D0,MAIN],rep:[0x3D,MAIN]}
        },
        0x21D1: 
        {
          dir: V, HW: [[.888,MAIN]], stretch: {top:[0x21D1,SIZE1], ext:[0x2016,SIZE1]}
        },
        0x21D2: 
        {
          dir: H, HW: [[1,MAIN]], stretch: {rep:[0x3D,MAIN], right:[0x21D2,MAIN]}
        },
        0x21D3: 
        {
          dir: V, HW: [[.888,MAIN]], stretch: {ext:[0x2016,SIZE1], bot:[0x21D3,SIZE1]}
        },
        0x21D4: 
        {
          dir: H, HW: [[1,MAIN]],
          stretch: {left:[0x21D0,MAIN],rep:[0x3D,MAIN], right:[0x21D2,MAIN]}
        },
        0x21D5: 
        {
          dir: V, HW: [[1.044,MAIN]],
          stretch: {top:[0x21D1,SIZE1], ext:[0x2016,SIZE1], bot:[0x21D3,SIZE1]}
        },
        0x2212: 
        {
          dir: H, HW: [[.611,MAIN]], stretch: {rep:[0x2212,MAIN]}
        },
        0x221A: 
        {
          dir: V, HW: [[1,MAIN],[1.2,SIZE1],[1.8,SIZE2],[2.4,SIZE3],[3,SIZE4]],
          stretch: {top:[0xE001,SIZE4], ext:[0xE000,SIZE4], bot:[0x23B7,SIZE4], fullExtenders:true}
        },
        0x2223: 
        {
          dir: V, HW: [[1,MAIN]], stretch: {ext:[0x2223,MAIN]}
        },
        0x2225: 
        {
          dir: V, HW: [[1,MAIN]], stretch: {ext:[0x2225,MAIN]}
        },
        0x2308: 
        {
          dir: V, HW: [[1,MAIN],[1.2,SIZE1],[1.8,SIZE2],[2.4,SIZE3],[3.0,SIZE4]],
          stretch: {top:[0x23A1,SIZE4], ext:[0x23A2,SIZE4]}
        },
        0x2309: 
        {
          dir: V, HW: [[1,MAIN],[1.2,SIZE1],[1.8,SIZE2],[2.4,SIZE3],[3.0,SIZE4]],
          stretch: {top:[0x23A4,SIZE4], ext:[0x23A5,SIZE4]}
        },
        0x230A: 
        {
          dir: V, HW: [[1,MAIN],[1.2,SIZE1],[1.8,SIZE2],[2.4,SIZE3],[3.0,SIZE4]],
          stretch: {ext:[0x23A2,SIZE4], bot:[0x23A3,SIZE4]}
        },
        0x230B: 
        {
          dir: V, HW: [[1,MAIN],[1.2,SIZE1],[1.8,SIZE2],[2.4,SIZE3],[3.0,SIZE4]],
          stretch: {ext:[0x23A5,SIZE4], bot:[0x23A6,SIZE4]}
        },
        0x23AA: 
        {
          dir: V, HW: [[.32,SIZE4]],
          stretch: {top:[0x23AA,SIZE4], ext:[0x23AA,SIZE4], bot:[0x23AA,SIZE4]}
        },
        0x23B0: 
        {
          dir: V, HW: [[.989,MAIN]],
          stretch: {top:[0x23A7,SIZE4], ext:[0x23AA,SIZE4], bot:[0x23AD,SIZE4]}
        },
        0x23B1: 
        {
          dir: V, HW: [[.989,MAIN]],
          stretch: {top:[0x23AB,SIZE4], ext:[0x23AA,SIZE4], bot:[0x23A9,SIZE4]}
        },
        0x23D0: 
        {
          dir: V, HW: [[.602,SIZE1],[1,MAIN,null,0x2223]], stretch: {ext:[0x2223,MAIN]}
        },
        0x23DE: 
        {
          dir: H, HW: [],
          stretch: {left:[0xE150,SIZE4], mid:[[0xE153,0xE152],SIZE4], right:[0xE151,SIZE4], rep:[0xE154,SIZE4]}
        },
        0x23DF: 
        {
          dir: H, HW: [],
          stretch: {left:[0xE152,SIZE4], mid:[[0xE151,0xE150],SIZE4], right:[0xE153,SIZE4], rep:[0xE154,SIZE4]}
        },
        0x27E8: 
        {
          dir: V, HW: [[1,MAIN],[1.2,SIZE1],[1.8,SIZE2],[2.4,SIZE3],[3.0,SIZE4]]
        },
        0x27E9: 
        {
          dir: V, HW: [[1,MAIN],[1.2,SIZE1],[1.8,SIZE2],[2.4,SIZE3],[3.0,SIZE4]]
        },
        0x27EE: 
        {
          dir: V, HW: [[.989,MAIN]],
          stretch: {top:[0x23A7,SIZE4], ext:[0x23AA,SIZE4], bot:[0x23A9,SIZE4]}
        },
        0x27EF: 
        {
          dir: V, HW: [[.989,MAIN]],
          stretch: {top:[0x23AB,SIZE4], ext:[0x23AA,SIZE4], bot:[0x23AD,SIZE4]}
        },
        0x002D: {alias: 0x2212, dir:H}, 
        0x005E: {alias: 0x02C6, dir:H}, 
        0x005F: {alias: 0x2212, dir:H}, 
        0x007E: {alias: 0x02DC, dir:H}, 
        0x02C9: {alias: 0x00AF, dir:H}, 
        0x0302: {alias: 0x02C6, dir:H}, 
        0x0303: {alias: 0x02DC, dir:H}, 
        0x030C: {alias: 0x02C7, dir:H}, 
        0x0332: {alias: 0x2212, dir:H}, 
        0x2015: {alias: 0x2212, dir:H}, 
        0x2017: {alias: 0x2212, dir:H}, 
        0x203E: {alias: 0x00AF, dir:H}, 
        0x2215: {alias: 0x002F, dir:V}, 
        0x2329: {alias: 0x27E8, dir:V}, 
        0x232A: {alias: 0x27E9, dir:V}, 
        0x23AF: {alias: 0x2212, dir:H}, 
        0x2500: {alias: 0x2212, dir:H}, 
        0x2758: {alias: 0x2223, dir:V}, 
        0x3008: {alias: 0x27E8, dir:V}, 
        0x3009: {alias: 0x27E9, dir:V}, 
        0xFE37: {alias: 0x23DE, dir:H}, 
        0xFE38: {alias: 0x23DF, dir:H}, 
        0x003D: EXTRAH, 
        0x219E: EXTRAH, 
        0x21A0: EXTRAH, 
        0x21A4: EXTRAH, 
        0x21A5: EXTRAV, 
        0x21A6: EXTRAH, 
        0x21A7: EXTRAV, 
        0x21B0: EXTRAV, 
        0x21B1: EXTRAV, 
        0x21BC: EXTRAH, 
        0x21BD: EXTRAH, 
        0x21BE: EXTRAV, 
        0x21BF: EXTRAV, 
        0x21C0: EXTRAH, 
        0x21C1: EXTRAH, 
        0x21C2: EXTRAV, 
        0x21C3: EXTRAV, 
        0x21DA: EXTRAH, 
        0x21DB: EXTRAH, 
        0x23B4: EXTRAH, 
        0x23B5: EXTRAH, 
        0x23DC: EXTRAH, 
        0x23DD: EXTRAH, 
        0x23E0: EXTRAH, 
        0x23E1: EXTRAH, 
        0x2906: EXTRAH, 
        0x2907: EXTRAH, 
        0x294E: EXTRAH, 
        0x294F: EXTRAV, 
        0x2950: EXTRAH, 
        0x2951: EXTRAV, 
        0x295A: EXTRAH, 
        0x295B: EXTRAH, 
        0x295C: EXTRAV, 
        0x295D: EXTRAV, 
        0x295E: EXTRAH, 
        0x295F: EXTRAH, 
        0x2960: EXTRAV, 
        0x2961: EXTRAV, 
        0x27F5: {alias: 0x2190, dir:H}, 
        0x27F6: {alias: 0x2192, dir:H}, 
        0x27F7: {alias: 0x2194, dir:H}, 
        0x27F8: {alias: 0x21D0, dir:H}, 
        0x27F9: {alias: 0x21D2, dir:H}, 
        0x27FA: {alias: 0x21D4, dir:H}, 
        0x27FB: {alias: 0x21A4, dir:H}, 
        0x27FC: {alias: 0x21A6, dir:H}, 
        0x27FD: {alias: 0x2906, dir:H}, 
        0x27FE: {alias: 0x2907, dir:H}  
      }
    }
  });
  HTMLCSS.Font.oldLoadComplete = HTMLCSS.Font.loadComplete;
  HTMLCSS.Font.loadComplete = function (font,n,done,status) {
    if (n != null) {this.oldLoadComplete(font,n,done,status)}
    if (font.family === SIZE1 || font.family === SIZE2) {
      if (font.version === 1) {
        HTMLCSS.FONTDATA.VARIANT["-largeOp"].remap = {0x22C2: 0x22C3, 0x22C3: 0x22C2};
        HTMLCSS.FONTDATA.VARIANT["-smallOp"].remap = {0x22C2: 0x22C3, 0x22C3: 0x22C2};
      }
    }
  };
  MathJax.Hub.Register.StartupHook("TeX Jax Ready", function () {
    var TEX = MathJax.InputJax.TeX;
    TEX.Definitions.mathchar0mi.ell  = ['2113',{mathvariant: MML.VARIANT.NORMAL}];
    TEX.Definitions.mathchar0mi.hbar = ['210F',{mathvariant: MML.VARIANT.NORMAL}];
    TEX.Definitions.mathchar0mi.S    = ['00A7',{mathvariant: MML.VARIANT.SCRIPT}];
  });
  HTMLCSS.FONTDATA.FONTS['MathJax_Caligraphic'] = {
    directory: 'Caligraphic/Regular',
    family: 'MathJax_Caligraphic',
    testString: "MATHJAX CALIGRAPHIC",
    skew: {
      0x41: 0.194,
      0x42: 0.139,
      0x43: 0.139,
      0x44: 0.0833,
      0x45: 0.111,
      0x46: 0.111,
      0x47: 0.111,
      0x48: 0.111,
      0x49: 0.0278,
      0x4A: 0.167,
      0x4B: 0.0556,
      0x4C: 0.139,
      0x4D: 0.139,
      0x4E: 0.0833,
      0x4F: 0.111,
      0x50: 0.0833,
      0x51: 0.111,
      0x52: 0.0833,
      0x53: 0.139,
      0x54: 0.0278,
      0x55: 0.0833,
      0x56: 0.0278,
      0x57: 0.0833,
      0x58: 0.139,
      0x59: 0.0833,
      0x5A: 0.139
    },
    0x20: [0,0,250,0,0],               
    0x30: [452,22,500,39,460],         
    0x31: [453,0,500,86,426],          
    0x32: [453,0,500,44,449],          
    0x33: [452,216,500,42,456],        
    0x34: [464,194,500,28,471],        
    0x35: [453,216,500,50,448],        
    0x36: [665,22,500,42,456],         
    0x37: [463,216,500,55,485],        
    0x38: [666,21,500,43,456],         
    0x39: [453,216,500,42,457],        
    0x41: [728,50,798,30,819],         
    0x42: [705,22,657,32,664],         
    0x43: [705,25,527,12,533],         
    0x44: [683,0,771,19,766],          
    0x45: [705,22,528,30,564],         
    0x46: [683,32,719,18,829],         
    0x47: [704,119,595,44,599],        
    0x48: [683,48,845,18,803],         
    0x49: [683,0,545,-30,642],         
    0x4A: [683,119,678,47,839],        
    0x4B: [705,22,762,32,732],         
    0x4C: [705,22,690,32,656],         
    0x4D: [705,50,1201,28,1137],       
    0x4E: [789,50,820,-27,979],        
    0x4F: [705,22,796,58,777],         
    0x50: [683,57,696,19,733],         
    0x51: [705,131,817,114,787],       
    0x52: [682,22,848,19,837],         
    0x53: [705,22,606,18,642],         
    0x54: [717,68,545,34,833],         
    0x55: [683,28,626,-17,687],        
    0x56: [683,52,613,25,658],         
    0x57: [683,53,988,25,1034],        
    0x58: [683,0,713,52,807],          
    0x59: [683,143,668,31,714],        
    0x5A: [683,0,725,37,767],          
    0xA0: [0,0,250,0,0]                
  };
  HTMLCSS.FONTDATA.FONTS['MathJax_Main-bold'] = {
    directory: 'Main/Bold',
    family: 'MathJax_Main',
    weight: 'bold',
    testString: "MathJax Main ^ \u210F \u2223",
    skew: {
      0x131: 0.0319,
      0x237: 0.0958,
      0x210F: -0.0319,
      0x2113: 0.128,
      0x2202: 0.0958
    },
    Ranges: [
      [0xA0,0xFF,"Latin1Supplement"],
      [0x100,0x17F,"LatinExtendedA"],
      [0x180,0x24F,"LatinExtendedB"],
      [0x2B0,0x2FF,"SpacingModLetters"],
      [0x300,0x36F,"CombDiacritMarks"],
      [0x2000,0x206F,"GeneralPunctuation"],
      [0x20D0,0x20FF,"CombDiactForSymbols"],
      [0x2100,0x214F,"LetterlikeSymbols"],
      [0x2190,0x21FF,"Arrows"],
      [0x2200,0x22FF,"MathOperators"],
      [0x2300,0x23FF,"MiscTechnical"],
      [0x25A0,0x25FF,"GeometricShapes"],
      [0x2600,0x26FF,"MiscSymbols"],
      [0x27C0,0x27EF,"MiscMathSymbolsA"],
      [0x27F0,0x27FF,"SupplementalArrowsA"],
      [0x2A00,0x2AFF,"SuppMathOperators"]
    ],
    0x20: [0,0,250,0,0],               
    0x21: [705,-1,350,89,260],         
    0x22: [694,-329,603,38,492],       
    0x23: [694,193,958,64,893],        
    0x24: [750,56,575,64,510],         
    0x25: [750,56,958,65,893],         
    0x26: [705,11,894,48,836],         
    0x27: [694,-329,319,74,261],       
    0x28: [750,249,447,103,382],       
    0x29: [750,249,447,64,343],        
    0x2A: [750,-306,575,73,501],       
    0x2B: [633,131,894,64,829],        
    0x2C: [171,194,319,74,258],        
    0x2D: [278,-166,383,13,318],       
    0x2E: [171,-1,319,74,245],         
    0x2F: [750,250,575,63,511],        
    0x30: [654,10,575,45,529],         
    0x31: [655,0,575,80,494],          
    0x32: [654,0,575,57,517],          
    0x33: [655,11,575,47,526],         
    0x34: [656,0,575,32,542],          
    0x35: [655,11,575,57,517],         
    0x36: [655,11,575,48,526],         
    0x37: [676,11,575,64,558],         
    0x38: [654,11,575,48,526],         
    0x39: [654,11,575,48,526],         
    0x3A: [444,-1,319,74,245],         
    0x3B: [444,194,319,74,248],        
    0x3C: [587,85,894,96,797],         
    0x3D: [393,-109,894,64,829],       
    0x3E: [587,85,894,96,797],         
    0x3F: [700,-1,543,65,478],         
    0x40: [699,6,894,64,829],          
    0x41: [698,0,869,40,828],          
    0x42: [686,0,818,39,752],          
    0x43: [697,11,831,64,766],         
    0x44: [686,0,882,39,817],          
    0x45: [680,0,756,39,723],          
    0x46: [680,0,724,39,675],          
    0x47: [697,10,904,64,845],         
    0x48: [686,0,900,39,860],          
    0x49: [686,0,436,25,410],          
    0x4A: [686,11,594,8,527],          
    0x4B: [686,0,901,39,852],          
    0x4C: [686,0,692,39,643],          
    0x4D: [686,0,1092,39,1052],        
    0x4E: [686,0,900,39,860],          
    0x4F: [696,10,864,64,798],         
    0x50: [686,0,786,39,721],          
    0x51: [696,193,864,64,805],        
    0x52: [686,11,862,39,858],         
    0x53: [697,11,639,64,574],         
    0x54: [675,0,800,41,758],          
    0x55: [686,11,885,39,845],         
    0x56: [686,7,869,25,843],          
    0x57: [686,7,1189,24,1164],        
    0x58: [686,0,869,33,835],          
    0x59: [686,0,869,19,849],          
    0x5A: [686,0,703,64,645],          
    0x5B: [750,250,319,128,293],       
    0x5C: [750,250,575,63,511],        
    0x5D: [750,250,319,25,190],        
    0x5E: [694,-520,575,126,448],      
    0x5F: [-10,61,575,0,574],          
    0x60: [706,-503,575,114,338],      
    0x61: [453,6,559,32,558],          
    0x62: [694,6,639,29,600],          
    0x63: [453,6,511,39,478],          
    0x64: [694,6,639,38,609],          
    0x65: [452,6,527,32,494],          
    0x66: [700,0,351,40,452],          
    0x67: [455,201,575,30,558],        
    0x68: [694,0,639,37,623],          
    0x69: [695,0,319,40,294],          
    0x6A: [695,200,351,-71,274],       
    0x6B: [694,0,607,29,587],          
    0x6C: [694,0,319,40,301],          
    0x6D: [450,0,958,37,942],          
    0x6E: [450,0,639,37,623],          
    0x6F: [452,5,575,32,542],          
    0x70: [450,194,639,29,600],        
    0x71: [450,194,607,38,609],        
    0x72: [450,0,474,29,442],          
    0x73: [453,6,454,38,414],          
    0x74: [635,5,447,21,382],          
    0x75: [450,6,639,37,623],          
    0x76: [444,3,607,26,580],          
    0x77: [444,4,831,25,805],          
    0x78: [444,0,607,21,586],          
    0x79: [444,200,607,23,580],        
    0x7A: [444,0,511,32,462],          
    0x7B: [750,250,575,70,504],        
    0x7C: [750,249,319,129,190],       
    0x7D: [750,250,575,70,504],        
    0x7E: [344,-202,575,96,478],       
    0x393: [680,0,692,39,643],         
    0x394: [698,0,958,56,901],         
    0x398: [696,10,894,64,829],        
    0x39B: [698,0,806,40,765],         
    0x39E: [675,0,767,48,718],         
    0x3A0: [680,0,900,39,860],         
    0x3A3: [686,0,831,63,766],         
    0x3A5: [697,0,894,64,829],         
    0x3A6: [686,0,831,64,766],         
    0x3A8: [686,0,894,64,829],         
    0x3A9: [696,0,831,51,779]          
  };
  HTMLCSS.FONTDATA.FONTS['MathJax_Main-italic'] = {
    directory: 'Main/Italic',
    family: 'MathJax_Main',
    style: 'italic',
    testString: "MathJax Main ^ \u210F \u2223",
    Ranges: [
      [0xA0,0xFF,"Latin1Supplement"],
      [0x300,0x36F,"CombDiacritMarks"],
      [0x2000,0x206F,"GeneralPunctuation"],
      [0x2100,0x214F,"LetterlikeSymbols"]
    ],
    0x20: [0,0,250,0,0],               
    0x21: [716,0,307,107,380],         
    0x22: [694,-379,514,176,538],      
    0x23: [694,194,818,115,828],       
    0x25: [750,56,818,145,847],        
    0x26: [716,22,767,127,802],        
    0x27: [694,-379,307,213,377],      
    0x28: [750,250,409,144,517],       
    0x29: [750,250,409,17,390],        
    0x2A: [750,-320,511,195,584],      
    0x2B: [557,57,767,139,753],        
    0x2C: [121,194,307,69,232],        
    0x2D: [251,-180,358,84,341],       
    0x2E: [121,0,307,107,231],         
    0x2F: [750,250,511,19,617],        
    0x30: [665,21,511,110,562],        
    0x31: [666,0,511,110,468],         
    0x32: [666,22,511,76,551],         
    0x33: [666,22,511,96,562],         
    0x34: [666,194,511,46,478],        
    0x35: [666,22,511,106,567],        
    0x36: [665,22,511,120,565],        
    0x37: [666,22,511,136,634],        
    0x38: [666,21,511,99,553],         
    0x39: [666,22,511,107,553],        
    0x3A: [431,0,307,107,308],         
    0x3B: [431,194,307,70,308],        
    0x3D: [367,-133,767,116,776],      
    0x3F: [716,0,511,195,551],         
    0x40: [705,11,767,152,789],        
    0x41: [716,0,743,58,696],          
    0x42: [683,0,704,57,732],          
    0x43: [705,21,716,150,812],        
    0x44: [683,0,755,56,775],          
    0x45: [680,0,678,54,743],          
    0x46: [680,-1,653,54,731],         
    0x47: [705,22,774,150,812],        
    0x48: [683,0,743,54,860],          
    0x49: [683,0,386,49,508],          
    0x4A: [683,21,525,78,622],         
    0x4B: [683,0,769,54,859],          
    0x4C: [683,0,627,54,628],          
    0x4D: [683,0,897,58,1010],         
    0x4E: [683,0,743,54,860],          
    0x4F: [704,22,767,149,788],        
    0x50: [683,0,678,55,729],          
    0x51: [704,194,767,149,788],       
    0x52: [683,22,729,55,723],         
    0x53: [705,22,562,74,633],         
    0x54: [677,0,716,171,806],         
    0x55: [683,22,743,194,860],        
    0x56: [683,22,743,205,868],        
    0x57: [683,22,999,205,1124],       
    0x58: [683,0,743,50,825],          
    0x59: [683,0,743,198,875],         
    0x5A: [683,0,613,80,704],          
    0x5B: [750,250,307,73,446],        
    0x5D: [750,250,307,-14,359],       
    0x5E: [694,-527,511,260,528],      
    0x5F: [-25,62,511,91,554],         
    0x61: [442,11,511,101,543],        
    0x62: [694,11,460,108,467],        
    0x63: [441,10,460,103,469],        
    0x64: [694,11,511,101,567],        
    0x65: [442,10,460,107,470],        
    0x66: [705,204,307,-23,450],       
    0x67: [442,205,460,46,494],        
    0x68: [694,11,511,69,544],         
    0x69: [656,10,307,75,340],         
    0x6A: [656,204,307,-32,364],       
    0x6B: [694,11,460,69,498],         
    0x6C: [694,11,256,87,312],         
    0x6D: [442,11,818,75,851],         
    0x6E: [442,11,562,75,595],         
    0x6F: [442,11,511,103,517],        
    0x70: [442,194,511,6,518],         
    0x71: [442,194,460,101,504],       
    0x72: [442,11,422,75,484],         
    0x73: [442,11,409,76,418],         
    0x74: [626,11,332,87,373],         
    0x75: [441,11,537,75,570],         
    0x76: [443,10,460,75,492],         
    0x77: [443,11,664,75,696],         
    0x78: [442,11,464,58,513],         
    0x79: [441,205,486,75,522],        
    0x7A: [442,11,409,54,466],         
    0x7E: [318,-208,511,246,571],      
    0xA3: [714,11,769,88,699],         
    0x131: [441,10,307,75,340],        
    0x237: [442,204,332,-32,327],      
    0x393: [680,0,627,54,705],         
    0x394: [716,0,818,70,751],         
    0x398: [704,22,767,149,788],       
    0x39B: [716,0,692,58,646],         
    0x39E: [677,0,664,74,754],         
    0x3A0: [680,0,743,54,859],         
    0x3A3: [683,0,716,80,782],         
    0x3A5: [705,0,767,213,832],        
    0x3A6: [683,0,716,159,728],        
    0x3A8: [683,0,767,207,824],        
    0x3A9: [705,0,716,100,759]         
  };
  HTMLCSS.FONTDATA.FONTS['MathJax_Main'] = {
    directory: 'Main/Regular',
    family: 'MathJax_Main',
    testString: "MathJax Main ^ \u210F \u2223",
    skew: {
      0x131: 0.0278,
      0x237: 0.0833,
      0x2113: 0.111,
      0x2118: 0.111,
      0x2202: 0.0833
    },
    Ranges: [
      [0x2B0,0x2FF,"SpacingModLetters"],
      [0x300,0x36F,"CombDiacritMarks"],
      [0x25A0,0x25FF,"GeometricShapes"],
      [0x2600,0x26FF,"MiscSymbols"]
    ],
    0x20: [0,0,250,0,0],               
    0x21: [716,-1,278,78,199],         
    0x22: [694,-379,500,34,372],       
    0x23: [694,194,833,56,777],        
    0x24: [750,56,500,55,444],         
    0x25: [750,56,833,56,776],         
    0x26: [716,22,778,42,727],         
    0x27: [694,-379,278,78,212],       
    0x28: [750,250,389,94,333],        
    0x29: [750,250,389,55,294],        
    0x2A: [750,-320,500,64,435],       
    0x2B: [583,82,778,56,722],         
    0x2C: [121,194,278,78,210],        
    0x2D: [252,-179,333,11,277],       
    0x2E: [120,0,278,78,199],          
    0x2F: [750,250,500,56,445],        
    0x30: [666,22,500,39,460],         
    0x31: [666,0,500,83,427],          
    0x32: [666,0,500,50,449],          
    0x33: [665,22,500,42,457],         
    0x34: [677,0,500,28,471],          
    0x35: [666,22,500,50,449],         
    0x36: [666,22,500,42,456],         
    0x37: [676,22,500,55,485],         
    0x38: [666,22,500,43,457],         
    0x39: [666,22,500,42,456],         
    0x3A: [430,0,278,78,199],          
    0x3B: [430,194,278,78,202],        
    0x3C: [540,40,778,83,694],         
    0x3D: [367,-133,778,56,722],       
    0x3E: [540,40,778,83,694],         
    0x3F: [705,-1,472,55,416],         
    0x40: [705,11,778,56,722],         
    0x41: [716,0,750,32,717],          
    0x42: [683,0,708,28,651],          
    0x43: [705,21,722,56,666],         
    0x44: [683,0,764,27,708],          
    0x45: [680,0,681,25,652],          
    0x46: [680,0,653,25,610],          
    0x47: [705,22,785,56,735],         
    0x48: [683,0,750,25,724],          
    0x49: [683,0,361,21,339],          
    0x4A: [683,22,514,25,465],         
    0x4B: [683,0,778,25,736],          
    0x4C: [683,0,625,25,582],          
    0x4D: [683,0,917,29,887],          
    0x4E: [683,0,750,25,724],          
    0x4F: [705,22,778,56,722],         
    0x50: [683,0,681,27,624],          
    0x51: [705,193,778,56,728],        
    0x52: [683,22,736,27,732],         
    0x53: [705,22,556,55,500],         
    0x54: [677,0,722,36,685],          
    0x55: [683,22,750,25,724],         
    0x56: [683,22,750,19,730],         
    0x57: [683,22,1028,18,1009],       
    0x58: [683,0,750,23,726],          
    0x59: [683,0,750,11,738],          
    0x5A: [683,0,611,55,560],          
    0x5B: [750,250,278,118,255],       
    0x5C: [750,250,500,56,444],        
    0x5D: [750,250,278,22,159],        
    0x5E: [694,-531,500,112,387],      
    0x5F: [-25,62,500,0,499],          
    0x60: [699,-505,500,106,295],      
    0x61: [448,11,500,34,493],         
    0x62: [694,11,556,20,522],         
    0x63: [448,11,444,34,415],         
    0x64: [694,11,556,34,535],         
    0x65: [448,11,444,28,415],         
    0x66: [705,0,306,26,372],          
    0x67: [453,206,500,29,485],        
    0x68: [694,0,556,25,542],          
    0x69: [669,0,278,26,255],          
    0x6A: [669,205,306,-55,218],       
    0x6B: [694,0,528,20,511],          
    0x6C: [694,0,278,26,263],          
    0x6D: [442,0,833,25,819],          
    0x6E: [442,0,556,25,542],          
    0x6F: [448,10,500,28,471],         
    0x70: [442,194,556,20,522],        
    0x71: [442,194,528,33,535],        
    0x72: [442,0,392,20,364],          
    0x73: [448,11,394,33,359],         
    0x74: [615,10,389,18,333],         
    0x75: [442,11,556,25,542],         
    0x76: [431,11,528,19,508],         
    0x77: [431,11,722,18,703],         
    0x78: [431,0,528,11,516],          
    0x79: [431,204,528,19,508],        
    0x7A: [431,0,444,28,401],          
    0x7B: [750,250,500,65,434],        
    0x7C: [750,249,278,119,159],       
    0x7D: [750,250,500,65,434],        
    0x7E: [318,-215,500,83,416],       
    0xA0: [0,0,250,0,0],               
    0xA8: [669,-554,500,95,404],       
    0xAC: [356,-89,667,56,611],        
    0xAF: [590,-544,500,69,430],       
    0xB0: [715,-542,500,147,352],      
    0xB1: [666,0,778,56,722],          
    0xB4: [699,-505,500,203,393],      
    0xD7: [491,-9,778,147,630],        
    0xF7: [537,36,778,56,721],         
    0x131: [442,0,278,26,255],         
    0x237: [442,205,306,-55,218],      
    0x2C6: [694,-531,500,112,387],     
    0x2C7: [644,-513,500,114,385],     
    0x2C9: [590,-544,500,69,430],      
    0x2CA: [699,-505,500,203,393],     
    0x2CB: [699,-505,500,106,295],     
    0x2D8: [694,-515,500,92,407],      
    0x2D9: [669,-549,500,190,309],     
    0x2DC: [668,-565,500,83,416],      
    0x393: [680,0,625,25,582],         
    0x394: [716,0,833,46,786],         
    0x398: [705,22,778,56,722],        
    0x39B: [716,0,694,32,661],         
    0x39E: [677,0,667,42,624],         
    0x3A0: [680,0,750,25,724],         
    0x3A3: [683,0,722,55,666],         
    0x3A5: [705,0,778,55,722],         
    0x3A6: [683,0,722,56,665],         
    0x3A8: [683,0,778,55,722],         
    0x3A9: [704,0,722,44,677],         
    0x2002: [0,0,500,0,0],             
    0x2003: [0,0,999,0,0],             
    0x2004: [0,0,333,0,0],             
    0x2005: [0,0,250,0,0],             
    0x2006: [0,0,167,0,0],             
    0x2009: [0,0,167,0,0],             
    0x200A: [0,0,83,0,0],              
    0x2013: [285,-248,500,0,499],      
    0x2014: [285,-248,1000,0,999],     
    0x2018: [694,-379,278,64,198],     
    0x2019: [694,-379,278,78,212],     
    0x201C: [694,-379,500,128,466],    
    0x201D: [694,-379,500,34,372],     
    0x2020: [705,216,444,55,389],      
    0x2021: [705,205,444,55,389],      
    0x2026: [120,0,1172,78,1093],      
    0x2032: [560,-43,275,30,262],      
    0x20D7: [714,-516,0,-471,-29],     
    0x210F: [695,13,540,42,562],       
    0x2111: [705,10,722,55,693],       
    0x2113: [705,20,417,6,397],        
    0x2118: [453,216,636,67,625],      
    0x211C: [716,22,722,40,715],       
    0x2135: [694,0,611,55,555],        
    0x2190: [511,11,1000,55,944],      
    0x2191: [694,193,500,17,483],      
    0x2192: [511,11,1000,56,944],      
    0x2193: [694,194,500,17,483],      
    0x2194: [511,11,1000,55,944],      
    0x2195: [772,272,500,17,483],      
    0x2196: [720,195,1000,29,944],     
    0x2197: [720,195,1000,55,970],     
    0x2198: [695,220,1000,55,970],     
    0x2199: [695,220,1000,29,944],     
    0x21A6: [511,11,1000,55,944],      
    0x21A9: [511,11,1126,55,1070],     
    0x21AA: [511,11,1126,55,1070],     
    0x21BC: [511,-230,1000,55,944],    
    0x21BD: [270,11,1000,55,944],      
    0x21C0: [511,-230,1000,56,944],    
    0x21C1: [270,11,1000,56,944],      
    0x21CC: [671,11,1000,55,944],      
    0x21D0: [525,24,1000,56,944],      
    0x21D1: [694,194,611,31,579],      
    0x21D2: [525,24,1000,56,944],      
    0x21D3: [694,194,611,31,579],      
    0x21D4: [526,25,1000,34,966],      
    0x21D5: [772,272,611,31,579],      
    0x2200: [694,22,556,0,556],        
    0x2202: [715,22,531,42,566],       
    0x2203: [694,0,556,56,500],        
    0x2205: [772,78,500,39,460],       
    0x2207: [683,33,833,46,786],       
    0x2208: [540,40,667,84,583],       
    0x2209: [716,215,667,84,583],      
    0x220B: [540,40,667,83,582],       
    0x2212: [270,-230,778,84,694],     
    0x2213: [500,166,778,56,722],      
    0x2215: [750,250,500,56,445],      
    0x2216: [750,250,500,56,444],      
    0x2217: [465,-35,500,64,435],      
    0x2218: [444,-55,500,55,444],      
    0x2219: [444,-55,500,55,444],      
    0x221A: [800,200,833,72,853],      
    0x221D: [442,11,778,56,722],       
    0x221E: [442,11,1000,55,944],      
    0x2220: [694,0,722,55,666],        
    0x2223: [750,249,278,119,159],     
    0x2225: [750,250,500,132,367],     
    0x2227: [598,22,667,55,611],       
    0x2228: [598,22,667,55,611],       
    0x2229: [598,22,667,55,611],       
    0x222A: [598,22,667,55,611],       
    0x222B: [716,216,417,55,472],      
    0x223C: [367,-133,778,55,722],     
    0x2240: [583,83,278,55,222],       
    0x2243: [464,-36,778,55,722],      
    0x2245: [589,-22,1000,55,722],     
    0x2248: [483,-55,778,55,722],      
    0x224D: [484,-16,778,55,722],      
    0x2250: [670,-133,778,56,722],     
    0x2260: [716,215,778,56,722],      
    0x2261: [464,-36,778,56,722],      
    0x2264: [636,138,778,83,694],      
    0x2265: [636,138,778,83,694],      
    0x226A: [568,67,1000,56,944],      
    0x226B: [567,67,1000,55,944],      
    0x227A: [539,41,778,84,694],       
    0x227B: [539,41,778,83,694],       
    0x2282: [540,40,778,84,694],       
    0x2283: [540,40,778,83,693],       
    0x2286: [636,138,778,84,694],      
    0x2287: [636,138,778,83,693],      
    0x228E: [598,22,667,55,611],       
    0x2291: [636,138,778,84,714],      
    0x2292: [636,138,778,64,694],      
    0x2293: [598,0,667,61,605],        
    0x2294: [598,0,667,61,605],        
    0x2295: [583,83,778,56,722],       
    0x2296: [583,83,778,56,722],       
    0x2297: [583,83,778,56,722],       
    0x2298: [583,83,778,56,722],       
    0x2299: [583,83,778,56,722],       
    0x22A2: [694,0,611,55,555],        
    0x22A3: [694,0,611,55,555],        
    0x22A4: [668,0,778,55,723],        
    0x22A5: [668,0,778,55,723],        
    0x22A8: [750,249,867,119,811],     
    0x22C4: [488,-12,500,12,488],      
    0x22C5: [310,-190,278,78,199],     
    0x22C6: [486,-16,500,3,497],       
    0x22C8: [505,5,900,26,873],        
    0x22EE: [900,30,278,78,199],       
    0x22EF: [310,-190,1172,78,1093],   
    0x22F1: [820,-100,1282,133,1148],  
    0x2308: [750,250,444,174,422],     
    0x2309: [750,250,444,21,269],      
    0x230A: [750,250,444,174,422],     
    0x230B: [750,250,444,21,269],      
    0x2322: [388,-122,1000,55,944],    
    0x2323: [378,-134,1000,55,944],    
    0x23B0: [744,244,412,55,357],      
    0x23B1: [744,244,412,56,357],      
    0x27E8: [750,250,389,110,333],     
    0x27E9: [750,250,389,55,278],      
    0x27EE: [744,244,412,173,357],     
    0x27EF: [744,244,412,56,240],      
    0x27F5: [511,11,1609,55,1525],     
    0x27F6: [511,11,1638,84,1553],     
    0x27F7: [511,11,1859,55,1803],     
    0x27F8: [525,24,1609,56,1553],     
    0x27F9: [525,24,1638,56,1582],     
    0x27FA: [525,24,1858,56,1802],     
    0x27FC: [511,11,1638,55,1553],     
    0x2A3F: [683,0,750,28,721],        
    0x2AAF: [636,138,778,84,694],      
    0x2AB0: [636,138,778,83,694]       
  };
  HTMLCSS.FONTDATA.FONTS['MathJax_Math-italic'] = {
    directory: 'Math/Italic',
    family: 'MathJax_Math',
    style: 'italic',
    testString: "MathJax Math \u03A5",
    skew: {
      0x41: 0.139,
      0x42: 0.0833,
      0x43: 0.0833,
      0x44: 0.0556,
      0x45: 0.0833,
      0x46: 0.0833,
      0x47: 0.0833,
      0x48: 0.0556,
      0x49: 0.111,
      0x4A: 0.167,
      0x4B: 0.0556,
      0x4C: 0.0278,
      0x4D: 0.0833,
      0x4E: 0.0833,
      0x4F: 0.0833,
      0x50: 0.0833,
      0x51: 0.0833,
      0x52: 0.0833,
      0x53: 0.0833,
      0x54: 0.0833,
      0x55: 0.0278,
      0x58: 0.0833,
      0x5A: 0.0833,
      0x63: 0.0556,
      0x64: 0.167,
      0x65: 0.0556,
      0x66: 0.167,
      0x67: 0.0278,
      0x68: -0.0278,
      0x6C: 0.0833,
      0x6F: 0.0556,
      0x70: 0.0833,
      0x71: 0.0833,
      0x72: 0.0556,
      0x73: 0.0556,
      0x74: 0.0833,
      0x75: 0.0278,
      0x76: 0.0278,
      0x77: 0.0833,
      0x78: 0.0278,
      0x79: 0.0556,
      0x7A: 0.0556,
      0x393: 0.0833,
      0x394: 0.167,
      0x398: 0.0833,
      0x39B: 0.167,
      0x39E: 0.0833,
      0x3A0: 0.0556,
      0x3A3: 0.0833,
      0x3A5: 0.0556,
      0x3A6: 0.0833,
      0x3A8: 0.0556,
      0x3A9: 0.0833,
      0x3B1: 0.0278,
      0x3B2: 0.0833,
      0x3B4: 0.0556,
      0x3B5: 0.0833,
      0x3B6: 0.0833,
      0x3B7: 0.0556,
      0x3B8: 0.0833,
      0x3B9: 0.0556,
      0x3BC: 0.0278,
      0x3BD: 0.0278,
      0x3BE: 0.111,
      0x3BF: 0.0556,
      0x3C1: 0.0833,
      0x3C2: 0.0833,
      0x3C4: 0.0278,
      0x3C5: 0.0278,
      0x3C6: 0.0833,
      0x3C7: 0.0556,
      0x3C8: 0.111,
      0x3D1: 0.0833,
      0x3D5: 0.0833,
      0x3F1: 0.0833,
      0x3F5: 0.0556
    },
    0x20: [0,0,250,0,0],               
    0x2F: [716,215,778,139,638],       
    0x41: [716,0,750,35,726],          
    0x42: [683,0,759,35,756],          
    0x43: [705,22,715,50,760],         
    0x44: [683,0,828,33,803],          
    0x45: [680,0,738,31,764],          
    0x46: [680,0,643,31,749],          
    0x47: [705,22,786,50,760],         
    0x48: [683,0,831,31,888],          
    0x49: [683,0,440,26,504],          
    0x4A: [683,22,555,57,633],         
    0x4B: [683,0,849,31,889],          
    0x4C: [683,0,681,32,647],          
    0x4D: [683,0,970,35,1051],         
    0x4E: [683,0,803,31,888],          
    0x4F: [704,22,763,50,740],         
    0x50: [683,0,642,33,751],          
    0x51: [704,194,791,50,740],        
    0x52: [683,21,759,33,755],         
    0x53: [705,22,613,52,645],         
    0x54: [677,0,584,21,704],          
    0x55: [683,22,683,60,767],         
    0x56: [683,22,583,52,769],         
    0x57: [683,22,944,51,1048],        
    0x58: [683,0,828,26,852],          
    0x59: [683,-1,581,30,763],         
    0x5A: [683,0,683,58,723],          
    0x61: [441,10,529,33,506],         
    0x62: [694,11,429,40,422],         
    0x63: [442,11,433,34,429],         
    0x64: [694,10,520,33,523],         
    0x65: [442,11,466,39,429],         
    0x66: [705,205,490,55,550],        
    0x67: [442,205,477,10,480],        
    0x68: [694,11,576,48,555],         
    0x69: [661,11,345,21,302],         
    0x6A: [661,204,412,-12,403],       
    0x6B: [694,11,521,48,503],         
    0x6C: [694,11,298,38,266],         
    0x6D: [442,11,878,21,857],         
    0x6E: [442,11,600,21,580],         
    0x6F: [441,11,485,34,476],         
    0x70: [442,194,503,-39,497],       
    0x71: [442,194,446,33,460],        
    0x72: [442,11,451,21,430],         
    0x73: [442,10,469,53,419],         
    0x74: [626,11,361,19,330],         
    0x75: [442,11,572,21,551],         
    0x76: [443,11,485,21,467],         
    0x77: [443,11,716,21,690],         
    0x78: [442,11,572,35,522],         
    0x79: [442,205,490,21,496],        
    0x7A: [442,11,465,35,468],         
    0xA0: [0,0,250,0,0],               
    0x393: [680,-1,615,31,721],        
    0x394: [716,0,833,48,788],         
    0x398: [704,22,763,50,740],        
    0x39B: [716,0,694,35,670],         
    0x39E: [677,0,742,53,777],         
    0x3A0: [680,0,831,31,887],         
    0x3A3: [683,0,780,58,806],         
    0x3A5: [705,0,583,28,700],         
    0x3A6: [683,0,667,24,642],         
    0x3A8: [683,0,612,21,692],         
    0x3A9: [704,0,772,80,786],         
    0x3B1: [442,11,640,34,603],        
    0x3B2: [705,194,566,23,573],       
    0x3B3: [441,216,518,11,543],       
    0x3B4: [717,10,444,36,451],        
    0x3B5: [452,22,466,27,428],        
    0x3B6: [704,204,438,44,471],       
    0x3B7: [442,216,497,21,503],       
    0x3B8: [705,10,469,35,462],        
    0x3B9: [442,10,354,48,332],        
    0x3BA: [442,11,576,49,554],        
    0x3BB: [694,12,583,47,556],        
    0x3BC: [442,216,603,23,580],       
    0x3BD: [442,2,494,45,530],         
    0x3BE: [704,205,438,21,443],       
    0x3BF: [441,11,485,34,476],        
    0x3C0: [431,11,570,19,573],        
    0x3C1: [442,216,517,23,510],       
    0x3C2: [442,107,363,31,405],       
    0x3C3: [431,11,571,31,572],        
    0x3C4: [431,13,437,18,517],        
    0x3C5: [443,10,540,21,523],        
    0x3C6: [442,218,654,50,618],       
    0x3C7: [442,204,626,25,600],       
    0x3C8: [694,205,651,21,634],       
    0x3C9: [443,11,622,15,604],        
    0x3D1: [705,11,591,21,563],        
    0x3D5: [694,205,596,43,579],       
    0x3D6: [431,10,828,19,823],        
    0x3F1: [442,194,517,67,510],       
    0x3F5: [431,11,406,40,382]         
  };
  HTMLCSS.FONTDATA.FONTS['MathJax_Size1'] = {
    directory: 'Size1/Regular',
    family: 'MathJax_Size1',
    testString: "() [] {}",
    0x20: [0,0,250,0,0],               
    0x28: [850,349,458,152,422],       
    0x29: [850,349,458,35,305],        
    0x2F: [850,349,578,55,522],        
    0x5B: [850,349,417,202,394],       
    0x5C: [850,349,578,54,522],        
    0x5D: [850,349,417,22,214],        
    0x7B: [850,349,583,105,477],       
    0x7D: [850,349,583,105,477],       
    0xA0: [0,0,250,0,0],               
    0x2C6: [744,-551,556,-8,564],      
    0x2DC: [722,-597,556,1,554],       
    0x302: [744,-551,0,-564,8],        
    0x303: [722,-597,0,-555,-2],       
    0x2016: [602,0,778,257,521],       
    0x2191: [600,0,667,112,555],       
    0x2193: [600,0,667,112,555],       
    0x21D1: [599,0,778,57,721],        
    0x21D3: [600,-1,778,57,721],       
    0x220F: [750,250,944,55,888],      
    0x2210: [750,250,944,55,888],      
    0x2211: [750,250,1056,56,999],     
    0x221A: [850,350,1000,111,1020],   
    0x2223: [627,15,333,145,188],      
    0x2225: [627,15,556,145,410],      
    0x222B: [805,306,472,55,610],      
    0x222C: [805,306,819,55,957],      
    0x222D: [805,306,1166,55,1304],    
    0x222E: [805,306,472,55,610],      
    0x22C0: [750,249,833,55,777],      
    0x22C1: [750,249,833,55,777],      
    0x22C2: [750,249,833,55,777],      
    0x22C3: [750,249,833,55,777],      
    0x2308: [850,349,472,202,449],     
    0x2309: [850,349,472,22,269],      
    0x230A: [850,349,472,202,449],     
    0x230B: [850,349,472,22,269],      
    0x23D0: [602,0,667,312,355],       
    0x27E8: [850,350,472,97,394],      
    0x27E9: [850,350,472,77,374],      
    0x2A00: [750,250,1111,56,1054],    
    0x2A01: [750,250,1111,56,1054],    
    0x2A02: [750,250,1111,56,1054],    
    0x2A04: [750,249,833,55,777],      
    0x2A06: [750,249,833,55,777]       
  };
  HTMLCSS.FONTDATA.FONTS['MathJax_Size2'] = {
    directory: 'Size2/Regular',
    family: 'MathJax_Size2',
    testString: "() [] {}",
    0x20: [0,0,250,0,0],               
    0x28: [1150,649,597,180,561],      
    0x29: [1150,649,597,35,416],       
    0x2F: [1150,649,811,56,754],       
    0x5B: [1150,649,472,224,455],      
    0x5C: [1150,649,811,54,754],       
    0x5D: [1150,649,472,16,247],       
    0x7B: [1150,649,667,119,547],      
    0x7D: [1150,649,667,119,547],      
    0xA0: [0,0,250,0,0],               
    0x2C6: [772,-565,1000,-5,1004],    
    0x2DC: [750,-611,1000,0,999],      
    0x302: [772,-565,0,-1005,4],       
    0x303: [750,-611,0,-1000,-1],      
    0x220F: [950,450,1278,56,1221],    
    0x2210: [950,450,1278,56,1221],    
    0x2211: [950,450,1444,55,1388],    
    0x221A: [1150,650,1000,111,1020],  
    0x222B: [1360,862,556,55,944],     
    0x222C: [1360,862,1084,55,1472],   
    0x222D: [1360,862,1592,55,1980],   
    0x222E: [1360,862,556,55,944],     
    0x22C0: [950,450,1111,55,1055],    
    0x22C1: [950,450,1111,55,1055],    
    0x22C2: [949,450,1111,55,1055],    
    0x22C3: [950,449,1111,55,1055],    
    0x2308: [1150,649,528,224,511],    
    0x2309: [1150,649,528,16,303],     
    0x230A: [1150,649,528,224,511],    
    0x230B: [1150,649,528,16,303],     
    0x27E8: [1150,649,611,112,524],    
    0x27E9: [1150,649,611,85,498],     
    0x2A00: [949,449,1511,56,1454],    
    0x2A01: [949,449,1511,56,1454],    
    0x2A02: [949,449,1511,56,1454],    
    0x2A04: [950,449,1111,55,1055],    
    0x2A06: [950,450,1111,55,1055]     
  };
  HTMLCSS.FONTDATA.FONTS['MathJax_Size3'] = {
    directory: 'Size3/Regular',
    family: 'MathJax_Size3',
    testString: "() [] {}",
    0x20: [0,0,250,0,0],               
    0x28: [1450,949,736,209,701],      
    0x29: [1450,949,736,34,526],       
    0x2F: [1450,949,1044,55,989],      
    0x5B: [1450,949,528,247,516],      
    0x5C: [1450,949,1044,56,988],      
    0x5D: [1450,949,528,11,280],       
    0x7B: [1450,949,750,130,618],      
    0x7D: [1450,949,750,131,618],      
    0xA0: [0,0,250,0,0],               
    0x2C6: [772,-564,1444,-4,1447],    
    0x2DC: [749,-610,1444,1,1442],     
    0x302: [772,-564,0,-1448,3],       
    0x303: [749,-610,0,-1443,-2],      
    0x221A: [1450,950,1000,111,1020],  
    0x2308: [1450,949,583,246,571],    
    0x2309: [1450,949,583,11,336],     
    0x230A: [1450,949,583,246,571],    
    0x230B: [1450,949,583,11,336],     
    0x27E8: [1450,950,750,126,654],    
    0x27E9: [1450,949,750,94,623]      
  };
  HTMLCSS.FONTDATA.FONTS['MathJax_Size4'] = {
    directory: 'Size4/Regular',
    family: 'MathJax_Size4',
    testString: "() [] {}",
    0x20: [0,0,250,0,0],               
    0x28: [1750,1249,792,237,758],     
    0x29: [1750,1249,792,33,554],      
    0x2F: [1750,1249,1278,56,1221],    
    0x5B: [1750,1249,583,269,577],     
    0x5C: [1750,1249,1278,56,1221],    
    0x5D: [1750,1249,583,5,313],       
    0x7B: [1750,1249,806,144,661],     
    0x7D: [1750,1249,806,144,661],     
    0xA0: [0,0,250,0,0],               
    0x2C6: [845,-561,1889,-14,1902],   
    0x2DC: [823,-583,1889,1,1885],     
    0x302: [845,-561,0,-1903,13],      
    0x303: [823,-583,0,-1888,-4],      
    0x221A: [1750,1250,1000,111,1020], 
    0x2308: [1750,1249,639,269,633],   
    0x2309: [1750,1249,639,5,369],     
    0x230A: [1750,1249,639,269,633],   
    0x230B: [1750,1249,639,5,369],     
    0x239B: [1154,655,875,291,843],    
    0x239C: [610,10,875,291,417],      
    0x239D: [1165,644,875,291,843],    
    0x239E: [1154,655,875,31,583],     
    0x239F: [610,10,875,457,583],      
    0x23A0: [1165,644,875,31,583],     
    0x23A1: [1154,645,667,319,666],    
    0x23A2: [602,0,667,319,403],       
    0x23A3: [1155,644,667,319,666],    
    0x23A4: [1154,645,667,0,347],      
    0x23A5: [602,0,667,263,347],       
    0x23A6: [1155,644,667,0,347],      
    0x23A7: [899,10,889,384,718],      
    0x23A8: [1160,660,889,170,504],    
    0x23A9: [10,899,889,384,718],      
    0x23AA: [310,10,889,384,504],      
    0x23AB: [899,10,889,170,504],      
    0x23AC: [1160,660,889,384,718],    
    0x23AD: [10,899,889,170,504],      
    0x23B7: [935,885,1056,111,742],    
    0x27E8: [1750,1248,806,140,703],   
    0x27E9: [1750,1248,806,103,665],   
    0xE000: [625,14,1056,702,742],     
    0xE001: [605,14,1056,702,1076],    
    0xE150: [120,213,450,-24,460],     
    0xE151: [120,213,450,-10,474],     
    0xE152: [333,0,450,-24,460],       
    0xE153: [333,0,450,-10,474],       
    0xE154: [120,0,400,-10,410]        
  };
  HTMLCSS.FONTDATA.FONTS['MathJax_Main'][0x22EE][0] += 400;  
  HTMLCSS.FONTDATA.FONTS['MathJax_Main'][0x22F1][0] += 700;  
  HTMLCSS.FONTDATA.FONTS['MathJax_Size4'][0xE154][0] += 200;  
  HTMLCSS.FONTDATA.FONTS['MathJax_Size4'][0xE154][1] += 200;  
  HTMLCSS.FONTDATA.FONTS['MathJax_Main'][0x2212][1] += 100; 
  HTMLCSS.FONTDATA.FONTS['MathJax_Main'][0x003D][1] += 100; 
  HTMLCSS.FONTDATA.FONTS['MathJax_Main'][0x2245][2] -= 222; 
  HTMLCSS.FONTDATA.FONTS['MathJax_Main'][0x2245][5] = {rfix:-222}; 
  MathJax.Hub.Register.LoadHook(HTMLCSS.fontDir+"/Main/Bold/MathOperators.js",function () {
    HTMLCSS.FONTDATA.FONTS['MathJax_Main-bold'][0x2245][2] -= 106; 
    HTMLCSS.FONTDATA.FONTS['MathJax_Main-bold'][0x2245][5] = {rfix:-106}; 
  });
  if (!HTMLCSS.imgFonts) {
    MathJax.Hub.Browser.Select({
      MSIE: function (browser) {
        if (HTMLCSS.config.availableFonts && HTMLCSS.config.availableFonts.length) {
          HTMLCSS.FONTDATA.REMAP[0x2C9] = 0xAF; 
          HTMLCSS.FONTDATA.REMAP[0x2CA] = 0xB4; 
          HTMLCSS.FONTDATA.REMAP[0x2CB] = 0x60; 
          HTMLCSS.FONTDATA.REMAP[0x2DA] = 0xB0; 
          var testString = HTMLCSS.msieCheckGreek =
            String.fromCharCode(0x393)+" "+String.fromCharCode(0x3A5)+" "+String.fromCharCode(0x39B);
          HTMLCSS.FONTDATA.RANGES.push({name: "IEgreek", low: 0x03B1, high: 0x03C9, offset: "IEG", add: 32});
          HTMLCSS.FONTDATA.RANGES.push({name: "IEGreek", low: 0x0391, high: 0x03F6, offset: "IEG"});
          if (HTMLCSS.Font.testFont({family:"MathJax_Greek", testString: testString})) {
            HTMLCSS.Augment({
              FONTDATA: {
                VARIANT: {
                  normal:             {offsetIEG: 0x391, variantIEG: "-Greek"},
                  "fraktur":          {offsetIEG: 0x391, variantIEG: "-Greek"},
                  "script":           {offsetIEG: 0x391, variantIEG: "-Greek"},
                  "-tex-caligraphic": {offsetIEG: 0x391, variantIEG: "-Greek"},
                  "-tex-oldstyle":    {offsetIEG: 0x391, variantIEG: "-Greek"},
                  "-Greek":           {fonts:["MathJax_Greek"]}
                }
              }
            });
            HTMLCSS.FONTDATA.FONTS['MathJax_Greek'] = {
              directory: 'Greek/Regular',
              family: 'MathJax_Greek',
              testString: "\u0393 \u03A5 \u039B",
              0x20: [0,0,250,0,0],               
              0xA0: [0,0,250,0,0],               
              0x393: [680,0,625,25,582],         
              0x394: [716,0,833,46,786],         
              0x398: [705,22,778,56,722],        
              0x39B: [716,0,694,32,661],         
              0x39E: [677,0,667,42,624],         
              0x3A0: [680,0,750,25,724],         
              0x3A3: [683,0,722,55,666],         
              0x3A5: [705,0,778,55,722],         
              0x3A6: [683,0,722,56,665],         
              0x3A8: [683,0,778,55,722],         
              0x3A9: [704,0,722,44,677]          
            };
          }
          if (HTMLCSS.Font.testFont({family:"MathJax_Greek", weight:"bold", testString: testString})) {
            HTMLCSS.Augment({
              FONTDATA: {
                VARIANT: {
                  bold:               {offsetIEG: 0x391, variantIEG: "-Greek-Bold"},
                  "bold-fraktur":     {offsetIEG: 0x391, variantIEG: "-Greek-Bold"},
                  "bold-script":      {offsetIEG: 0x391, variantIEG: "-Greek-Bold"},
                  "-Greek-Bold":      {fonts:["MathJax_Greek-bold"]}
                }
              }
            });
            HTMLCSS.FONTDATA.FONTS['MathJax_Greek-bold'] = {
              directory: 'Greek/Bold',
              family: 'MathJax_Greek',
              weight: 'bold',
              testString: "\u0393 \u03A5 \u039B",
              0x20: [0,0,250,0,0],               
              0xA0: [0,0,250,0,0],               
              0x393: [680,0,692,39,643],         
              0x394: [698,0,958,56,901],         
              0x398: [696,10,894,64,829],        
              0x39B: [698,0,806,40,765],         
              0x39E: [675,0,767,48,718],         
              0x3A0: [680,0,900,39,860],         
              0x3A3: [686,0,831,64,766],         
              0x3A5: [697,0,894,64,829],         
              0x3A6: [686,0,831,64,766],         
              0x3A8: [686,0,894,64,829],         
              0x3A9: [696,1,831,51,779]          
            };
          }
          if (HTMLCSS.Font.testFont({family:"MathJax_Greek", style:"italic", testString: testString})) {
            HTMLCSS.Augment({
              FONTDATA: {
                VARIANT: {
                  italic:  {offsetIEG: 0x391, variantIEG: "-Greek-Italic"},
                  "-Greek-Italic": {fonts:["MathJax_Greek-italic"]}
                }
              }
            });
            HTMLCSS.FONTDATA.FONTS['MathJax_Greek-italic'] = {
              directory: 'Greek/Italic',
              family: 'MathJax_Greek',
              style: 'italic',
              testString: "\u0393 \u03A5 \u039B",
              skew: {
                0x393: 0.0833,
                0x394: 0.167,
                0x398: 0.0833,
                0x39B: 0.167,
                0x39E: 0.0833,
                0x3A0: 0.0556,
                0x3A3: 0.0833,
                0x3A5: 0.0556,
                0x3A6: 0.0833,
                0x3A8: 0.0556,
                0x3A9: 0.0833,
                0x3B1: 0.0278,
                0x3B2: 0.0833,
                0x3B4: 0.0556,
                0x3B5: 0.0833,
                0x3B6: 0.0833,
                0x3B7: 0.0556,
                0x3B8: 0.0833,
                0x3B9: 0.0556,
                0x3BC: 0.0278,
                0x3BD: 0.0278,
                0x3BE: 0.111,
                0x3BF: 0.0556,
                0x3C1: 0.0833,
                0x3C2: 0.0833,
                0x3C4: 0.0278,
                0x3C5: 0.0278,
                0x3C6: 0.0833,
                0x3C7: 0.0556,
                0x3C8: 0.111,
                0x3D1: 0.0833,
                0x3D5: 0.0833,
                0x3F1: 0.0833,
                0x3F5: 0.0556
              },
              0x20: [0,0,250,0,0],               
              0xA0: [0,0,250,0,0],               
              0x393: [680,-1,615,31,721],        
              0x394: [716,0,833,48,788],         
              0x398: [704,22,763,50,740],        
              0x39B: [716,0,694,35,670],         
              0x39E: [678,0,742,53,777],         
              0x3A0: [681,0,831,31,887],         
              0x3A3: [683,0,780,58,806],         
              0x3A5: [705,0,583,28,700],         
              0x3A6: [683,0,667,24,642],         
              0x3A8: [683,0,612,21,692],         
              0x3A9: [704,0,772,80,786],         
              0x3B1: [442,11,640,34,603],        
              0x3B2: [705,194,566,23,573],       
              0x3B3: [441,216,518,11,543],       
              0x3B4: [717,10,444,36,451],        
              0x3B5: [452,22,466,27,428],        
              0x3B6: [704,204,438,44,471],       
              0x3B7: [442,216,497,21,503],       
              0x3B8: [705,10,469,35,462],        
              0x3B9: [442,10,354,48,332],        
              0x3BA: [442,11,576,49,554],        
              0x3BB: [694,12,583,47,556],        
              0x3BC: [442,216,603,23,580],       
              0x3BD: [442,2,494,45,530],         
              0x3BE: [704,205,438,21,443],       
              0x3BF: [441,11,485,34,476],        
              0x3C0: [431,11,570,19,573],        
              0x3C1: [442,216,517,23,510],       
              0x3C2: [442,107,363,31,405],       
              0x3C3: [431,11,571,31,572],        
              0x3C4: [431,13,437,18,517],        
              0x3C5: [443,10,540,21,523],        
              0x3C6: [442,218,654,50,618],       
              0x3C7: [442,204,626,25,600],       
              0x3C8: [694,205,651,21,634],       
              0x3C9: [443,11,622,15,604],        
              0x3D1: [705,11,591,21,563],        
              0x3D5: [694,205,596,43,579],       
              0x3D6: [431,10,828,19,823],        
              0x3F1: [442,194,517,67,510],       
              0x3F5: [431,11,406,40,382]         
            };
          }
        }
        if (HTMLCSS.msieIE6) {
          var WinIE6 = "MathJax_WinIE6";
          HTMLCSS.FONTDATA.FONTS[WinIE6] = "WinIE6/Regular/Main.js";
          HTMLCSS.FONTDATA.RANGES.push({name: "arrows", low: 0x2190, high: 0x2199, offset: "AR"});
          var REMAP = {variant:"-WinIE6",
            0x21D2:0xE20A, 0x21D4:0xE20B,                               
            0x2200:0xE20C, 0x2202:0xE20D, 0x2203:0xE20E, 0x2207:0xE20F, 
            0x2208:0xE210, 0x220B:0xE211, 0x2215:0xE212, 0x221A:0xE213, 
            0x221D:0xE214, 0x221E:0xE215, 0x2220:0xE216, 0x2223:0xE217, 
            0x2225:0xE218, 0x2227:0xE219, 0x2228:0xE21A, 0x2229:0xE21B, 
            0x222A:0xE21C, 0x222B:0xE21D, 0x223C:0xE21E, 0x2248:0xE21F, 
            0x2260:0xE220, 0x2261:0xE221, 0x2264:0xE222, 0x2265:0xE223, 
            0x226A:0xE224, 0x226B:0xE225, 0x2282:0xE226, 0x2283:0xE227, 
            0x2286:0xE228, 0x2287:0xE229, 0x2295:0xE22A, 0x2299:0xE22B, 
            0x22A5:0xE22C, 0x25B3:0xE22D, 0x25BD:0xE22E, 0x25EF:0xE22F, 
            0x2660:0xE230, 0x2661:0xE231, 0x2662:0xE232, 0x2663:0xE233, 
            0x266D:0xE234, 0x266E:0xE235, 0x266F:0xE236,                
            0x2266:0xE2C5, 0x2267:0xE2C6, 0x226E:0xE2C7, 0x226F:0xE2C8, 
            0x231C:0xE2CA, 0x231D:0xE2CB, 0x231E:0xE2CC, 0x231F:0xE2CD, 
            0x250C:0xE2CA, 0x2510:0xE2CB, 0x2514:0xE2CC, 0x2518:0xE2CD, 
            0x2571:0xE2CE, 0x2572:0xE2CF, 0x25A0:0xE2D0, 0x25A1:0xE2D1, 
            0x25B2:0xE2D2, 0x25B6:0xE2D4, 0x25BC:0xE2D5,                
            0x25BD:0xE2D6, 0x25C0:0xE2D7, 0x25CA:0xE2D8,                
            0x2234:0xE2D9, 0x2235:0xE2DA, 0x2252:0xE2DB, 0x2605:0xE2DC, 
            0x223D:0xE2DD                                               
          };
          var REMAPBOLD = {variant:"-WinIE6",
            0x21D2:0xE24A, 0x21D4:0xE24B,                               
            0x2200:0xE24C, 0x2202:0xE24D, 0x2203:0xE24E, 0x2207:0xE24F, 
            0x2208:0xE250, 0x220B:0xE251, 0x2215:0xE252, 0x221A:0xE253, 
            0x221D:0xE254, 0x221E:0xE255, 0x2220:0xE256, 0x2223:0xE257, 
            0x2225:0xE258, 0x2227:0xE259, 0x2228:0xE25A, 0x2229:0xE25B, 
            0x222A:0xE25C, 0x222B:0xE25D, 0x223C:0xE25E, 0x2248:0xE25F, 
            0x2260:0xE260, 0x2261:0xE261, 0x2264:0xE262, 0x2265:0xE263, 
            0x226A:0xE264, 0x226B:0xE265, 0x2282:0xE266, 0x2283:0xE267, 
            0x2286:0xE268, 0x2287:0xE269, 0x2295:0xE26A, 0x2299:0xE26B, 
            0x22A5:0xE26C, 0x25B3:0xE26D, 0x25BD:0xE26E, 0x25EF:0xE26F, 
            0x2660:0xE270, 0x2661:0xE271, 0x2662:0xE272, 0x2663:0xE273, 
            0x266D:0xE274, 0x266E:0xE275, 0x266F:0xE276,                
            0x2266:0xE2C5, 0x2267:0xE2C6, 0x226E:0xE2C7, 0x226F:0xE2C8, 
            0x231C:0xE2CA, 0x231D:0xE2CB, 0x231E:0xE2CC, 0x231F:0xE2CD, 
            0x250C:0xE2CA, 0x2510:0xE2CB, 0x2514:0xE2CC, 0x2518:0xE2CD, 
            0x2571:0xE2CE, 0x2572:0xE2CF, 0x25A0:0xE2D0, 0x25A1:0xE2D1, 
            0x25B2:0xE2D2, 0x25B6:0xE2D4, 0x25BC:0xE2D5,                
            0x25BD:0xE2D6, 0x25C0:0xE2D7, 0x25CA:0xE2D8,                
            0x2234:0xE2D9, 0x2235:0xE2DA, 0x2252:0xE2DB, 0x2605:0xE2DC, 
            0x223D:0xE2DD                                               
          };
          var VARNORMAL = {offsetAR:0xE200, variantAR:"-WinIE6", remap: REMAP};
          var VARBOLD   = {offsetAR:0xE240, variantAR:"-WinIE6", remap: REMAPBOLD};
          HTMLCSS.Augment({
            FONTDATA: {
              VARIANT: {
                "normal": VARNORMAL,
                "bold":   VARBOLD,
                "italic": VARNORMAL,
                "bold-italic": VARBOLD,
                "-largeOp": {fonts:[WinIE6,SIZE2,SIZE1,MAIN],
                             remap: {0x220F:0xE290, 0x2211:0xE291, 0x222B:0xE295, 0x222E:0xE296}},
                "-smallOp": {fonts:[WinIE6,SIZE1,MAIN],
                             remap: {0x220F:0xE280, 0x2211:0xE281, 0x222B:0xE285, 0x222E:0xE286}},
                "-WinIE6":  {fonts:[WinIE6]}
	      },
	      DELIMITERS: {
	        0x221A: {
	          HW:{
                    0:[1,WinIE6,null,0xE213], 1:[1.2,WinIE6,null,0xE282], 2:[1.8,WinIE6,null,0xE292],
                    3:[2.4,WinIE6,null,0xE2A2], 4:[3,WinIE6,null,0xE2B2]
                  }
	        },
                0x007C: {stretch:{ext:[0xE217,WinIE6]}},
                0x2223: {HW:{0:[1,WinIE6,null,0xE217]}, stretch:{ext:[0xE217,WinIE6]}},
                0x23D0: {HW:{1:[1,WinIE6,null,0xE217]}, stretch:{ext:[0xE217,WinIE6]}},
                0x2225: {HW:{0:[1,WinIE6,null,0xE218]}, stretch:{ext:[0xE218,WinIE6]}},
                0x2190: {HW:{0:[.889,WinIE6,null,0xE200]}, stretch:{left:[0xE200,WinIE6]}},
                0x2191: {HW:{0:[.888,WinIE6,null,0xE201]}, stretch:{top:[0xE287,WinIE6],ext:[0xE289,WinIE6]}},
                0x2192: {HW:{0:[.889,WinIE6,null,0xE202]}, stretch:{right:[0xE202,WinIE6]}},
                0x2193: {HW:{0:[.888,WinIE6,null,0xE203]}, stretch:{bot:[0xE288,WinIE6],ext:[0xE289,WinIE6]}},
                0x2194: {HW:{0:[1,WinIE6,null,0xE204]}, stretch:{left:[0xE200,WinIE6],right:[0xE202,WinIE6]}},
                0x2195: {HW:{0:[1.044,WinIE6,null,0xE203]}, stretch:{top:[0xE287,WinIE6],bot:[0xE288,WinIE6], ext:[0xE289,WinIE6]}}
              }
            }
          });
        }
      },
      Chrome: function (browser) {
        if (browser.isPC && !MathJax.Hub.Browser.versionAtLeast("5.0")) {
          var WinChrome = "-WinChrome";
          HTMLCSS.Augment({
            FONTDATA: {
              VARIANT: {
                normal: {remap: {0x3E:   [0x3E,WinChrome]}},
                bold:   {remap: {0xE2F1: [0x3E,WinChrome]}},
                italic: {remap: {0x64:   [0x64,WinChrome]}},
                "-tex-caligraphic": {remap: {0x54: [0x54,WinChrome]}},
                "-largeOp": {remap: {0x2A00: [0x2A00,WinChrome]}},
                "-smallOp": {remap: {0x22C3: [0x22C3,WinChrome]}},
                "-WinChrome": {fonts:["MathJax_WinChrome"]}
              },
              DELIMITERS: {
                0x005D: {stretch:{bot:[0x23A6,"MathJax_WinChrome"]}},
                0x230B: {stretch:{bot:[0x23A6,"MathJax_WinChrome"]}}
              }
            }
          });
          HTMLCSS.FONTDATA.FONTS['MathJax_WinChrome'] = {
            directory: 'WinChrome/Regular',
            family: 'MathJax_WinChrome',
            testString: "> T d \u23A6 \u2A00",
            skew: {
              0x54: 0.0278,
              0xE2F0: 0.0319
            },
            0x20: [0,0,250,0,0],               
            0x3E: [540,40,778,83,694],         
            0x54: [717,68,545,34,833],         
            0x64: [694,11,511,101,567],        
            0xA0: [0,0,250,0,0],               
            0x22C3: [750,249,833,55,777],      
            0x23A6: [1155,644,667,0,347],      
            0x2A00: [949,449,1511,56,1454],    
            0xE2F0: [720,69,644,38,947],       
            0xE2F1: [587,85,894,96,797]        
          };
        }
      }
    });
  }
  (function () {
    var FONTS = HTMLCSS.FONTDATA.FONTS, AVAIL = HTMLCSS.config.availableFonts;
    var name, faces = [];
    if (HTMLCSS.allowWebFonts) {
      for (name in FONTS) {
        if (FONTS[name].family) {
          if (AVAIL && AVAIL.length && HTMLCSS.Font.testFont(FONTS[name])) {
            FONTS[name].available = true;
            HTMLCSS.Font.loadComplete(FONTS[name]);
          } else {
            FONTS[name].isWebFont = true;
            if (HTMLCSS.FontFaceBug) {FONTS[name].family = name}
            faces.push(HTMLCSS.Font.fontFace(name));
          }
        }
      }
      if (!HTMLCSS.config.preloadWebFonts) {HTMLCSS.config.preloadWebFonts = []}
      HTMLCSS.config.preloadWebFonts.push(MAIN,ITALIC,SIZE1);
      if (faces.length) {HTMLCSS.config.styles["@font-face"] = faces}
    } else if (AVAIL && AVAIL.length) {
      for (name in FONTS) {
        if (FONTS[name].family && HTMLCSS.Font.testFont(FONTS[name])) {
          FONTS[name].available = true;
          HTMLCSS.Font.loadComplete(FONTS[name]);
        }
      }
    }
  })();
  AJAX.loadComplete(HTMLCSS.fontDir + "/fontdata.js");
})(MathJax.OutputJax["HTML-CSS"],MathJax.ElementJax.mml,MathJax.Ajax);
