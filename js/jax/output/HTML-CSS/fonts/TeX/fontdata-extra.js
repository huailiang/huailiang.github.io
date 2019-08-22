(function (HTMLCSS) {
  var DELIMITERS = HTMLCSS.FONTDATA.DELIMITERS;
  var MAIN   = "MathJax_Main",
      BOLD   = "MathJax_Main-bold",
      AMS    = "MathJax_AMS",
      SIZE1  = "MathJax_Size1",
      SIZE4  = "MathJax_Size4";
  var H = "H", V = "V";
  var delim = {
    0x003D: 
    {
      dir: H, HW: [[.767,MAIN]], stretch: {rep:[0x003D,MAIN]}
    },
    0x219E: 
    {
      dir: H, HW: [[1,AMS]], stretch: {left:[0x219E,AMS], rep:[0x2212,MAIN]}
    },
    0x21A0: 
    {
      dir: H, HW: [[1,AMS]], stretch: {right:[0x21A0,AMS], rep:[0x2212,MAIN]}
    },
    0x21A4: 
    {
      dir: H, HW: [],
      stretch: {left:[0x2190,MAIN], rep:[0x2212,MAIN], right:[0x2223,SIZE1,0,-.05,.9]}
    },
    0x21A5: 
    {
      dir: V, HW: [],
      stretch: {bot:[0x22A5,BOLD,0,0,.75], ext:[0x23D0,SIZE1], top:[0x2191,SIZE1]}
    },
    0x21A6: 
    {
      dir: H, HW: [[1,MAIN]],
      stretch: {left:[0x2223,SIZE1,-.09,-.05,.9], rep:[0x2212,MAIN], right:[0x2192,MAIN]}
    },
    0x21A7: 
    {
      dir: V, HW: [],
      stretch: {top:[0x22A4,BOLD,0,0,.75], ext:[0x23D0,SIZE1], bot:[0x2193,SIZE1]}
    },
    0x21B0: 
    {
      dir: V, HW: [[.722,AMS]],
      stretch: {top:[0x21B0,AMS], ext:[0x23D0,SIZE1,.097]}
    },
    0x21B1: 
    {
      dir: V, HW: [[.722,AMS]],
      stretch: {top:[0x21B1,AMS,.27], ext:[0x23D0,SIZE1]}
    },
    0x21BC: 
    {
      dir: H, HW: [[1,MAIN]],
      stretch: {left:[0x21BC,MAIN], rep:[0x2212,MAIN]}
    },
    0x21BD: 
    {
      dir: H, HW: [[1,MAIN]],
      stretch: {left:[0x21BD,MAIN], rep:[0x2212,MAIN]}
    },
    0x21BE: 
    {
      dir: V, HW: [[.888,AMS]],
      stretch: {top:[0x21BE,AMS,.12,0,1.1], ext:[0x23D0,SIZE1]}
    },
    0x21BF: 
    {
      dir: V, HW: [[.888,AMS]],
      stretch: {top:[0x21BF,AMS,.12,0,1.1], ext:[0x23D0,SIZE1]}
    },
    0x21C0: 
    {
      dir: H, HW: [[1,MAIN]],
      stretch: {right:[0x21C0,MAIN], rep:[0x2212,MAIN]}
    },
    0x21C1: 
    {
      dir: H, HW: [[1,MAIN]],
      stretch: {right:[0x21C1,MAIN], rep:[0x2212,MAIN]}
    },
    0x21C2: 
    {
      dir: V, HW: [[.888,AMS]],
      stretch: {bot:[0x21C2,AMS,.12,0,1.1], ext:[0x23D0,SIZE1]}
    },
    0x21C3: 
    {
      dir: V, HW: [[.888,AMS]],
      stretch: {bot:[0x21C3,AMS,.12,0,1.1], ext:[0x23D0,SIZE1]}
    },
    0x21DA: 
    {
      dir: H, HW: [[1,AMS]],
      stretch: {left:[0x21DA,AMS], rep:[0x2261,MAIN]}
    },
    0x21DB: 
    {
      dir: H, HW: [[1,AMS]],
      stretch: {right:[0x21DB,AMS], rep:[0x2261,MAIN]}
    },
    0x23B4: 
    {
      dir: H, HW: [],
      stretch: {left:[0x250C,AMS,0,-.1], rep:[0x2212,MAIN,0,.35], right:[0x2510,AMS,0,-.1]}
    },
    0x23B5: 
    {
      dir: H, HW: [],
      stretch: {left:[0x2514,AMS,0,.26], rep:[0x2212,MAIN,0,0,0,.25], right:[0x2518,AMS,0,.26]}
    },
    0x23DC: 
    {
      dir: H, HW: [[.778,AMS,0,0x2322],[1,MAIN,0,0x2322]],
      stretch: {left:[0xE150,SIZE4], rep:[0xE154,SIZE4], right:[0xE151,SIZE4]}
    },
    0x23DD: 
    {
      dir: H, HW: [[.778,AMS,0,0x2323],[1,MAIN,0,0x2323]],
      stretch: {left:[0xE152,SIZE4], rep:[0xE154,SIZE4], right:[0xE153,SIZE4]}
    },
    0x23E0: 
    {
      dir: H, HW: [],
      stretch: {left:[0x2CA,MAIN,-.1], rep:[0x2C9,MAIN,0,.13], right:[0x2CB,MAIN], fullExtenders:true}
    },
    0x23E1: 
    {
      dir: H, HW: [],
      stretch: {left:[0x2CB,MAIN,-.1,.1], rep:[0x2C9,MAIN], right:[0x2CA,MAIN,-.1,.1], fullExtenders:true}
    },
    0x2906: 
    {
      dir: H, HW: [],
      stretch: {left:[0x21D0,MAIN], rep:[0x3D,MAIN], right:[0x2223,SIZE1,0,-.1]}
    },
    0x2907: 
    {
      dir: H, HW: [],
      stretch: {left:[0x22A8,AMS,0,-.12], rep:[0x3D,MAIN], right:[0x21D2,MAIN]}
    },
    0x294E: 
    {
      dir: H, HW: [],
      stretch: {left:[0x21BC,MAIN], rep:[0x2212,MAIN], right:[0x21C0,MAIN]}
    },
    0x294F: 
    {
      dir: V, HW: [],
      stretch: {top:[0x21BE,AMS,.12,0,1.1], ext:[0x23D0,SIZE1], bot:[0x21C2,AMS,.12,0,1.1]}
    },
    0x2950: 
    {
      dir: H, HW: [],
      stretch: {left:[0x21BD,MAIN], rep:[0x2212,MAIN], right:[0x21C1,MAIN]}
    },
    0x2951: 
    {
      dir: V, HW: [],
      stretch: {top:[0x21BF,AMS,.12,0,1.1], ext:[0x23D0,SIZE1], bot:[0x21C3,AMS,.12,0,1.1]}
    },
    0x295A: 
    {
      dir: H, HW: [],
      stretch: {left:[0x21BC,MAIN], rep:[0x2212,MAIN], right:[0x2223,SIZE1,0,-.05,.9]}
    },
    0x295B: 
    {
      dir: H, HW: [],
      stretch: {left:[0x2223,SIZE1,-.09,-.05,.9], rep:[0x2212,MAIN], right:[0x21C0,MAIN]}
    },
    0x295C: 
    {
      dir: V, HW: [],
      stretch: {bot:[0x22A5,BOLD,0,0,.75], ext:[0x23D0,SIZE1], top:[0x21BE,AMS,.12,0,1.1]}
    },
    0x295D: 
    {
      dir: V, HW: [],
      stretch: {top:[0x22A4,BOLD,0,0,.75], ext:[0x23D0,SIZE1], bot:[0x21C2,AMS,.12,0,1.1]}
    },
    0x295E: 
    {
      dir: H, HW: [],
      stretch: {left:[0x21BD,MAIN], rep:[0x2212,MAIN], right:[0x2223,SIZE1,0,-.05,.9]}
    },
    0x295F: 
    {
      dir: H, HW: [],
      stretch: {left:[0x2223,SIZE1,-.09,-.05,.9], rep:[0x2212,MAIN], right:[0x21C1,MAIN]}
    },
    0x2960: 
    {
      dir: V, HW: [],
      stretch: {bot:[0x22A5,BOLD,0,0,.75], ext:[0x23D0,SIZE1], top:[0x21BF,AMS,.12,0,1.1]}
    },
    0x2961: 
    {
      dir: V, HW: [],
      stretch: {top:[0x22A4,BOLD,0,0,.75], ext:[0x23D0,SIZE1], bot:[0x21C3,AMS,.12,0,1.1]}
    }
  };
  for (var id in delim) {if (delim.hasOwnProperty(id)) {DELIMITERS[id] = delim[id]}};
  MathJax.Ajax.loadComplete(HTMLCSS.fontDir + "/fontdata-extra.js");
})(MathJax.OutputJax["HTML-CSS"]);
