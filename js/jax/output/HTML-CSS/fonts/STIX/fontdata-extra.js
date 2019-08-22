/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/fonts/STIX/fontdata-extra.js
 *  
 *  Adds extra stretchy characters to the STIX data.
 *
 *  ---------------------------------------------------------------------
 *  
 *  Copyright (c) 2011-2012 Design Science, Inc.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *     http:
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
(function (HTMLCSS) {
  var DELIMITERS = HTMLCSS.FONTDATA.DELIMITERS;
  var GENERAL = "STIXGeneral",
      BOLD    = "STIXGeneral-bold",
      VARIANT = "STIXVariants",
      NONUNI  = "STIXNonUnicode",
      SIZE1   = "STIXSizeOneSym",
      SIZE2   = "STIXSizeTwoSym",
      SIZE3   = "STIXSizeThreeSym",
      SIZE4   = "STIXSizeFourSym",
      SIZE5   = "STIXSizeFiveSym";
  var H = "H", V = "V";
  var delim = {
    0x003D: 
    {
      dir: H, HW: [[.685,GENERAL]], stretch: {rep:[0x003D,GENERAL]}
    },
    0x219E: 
    {
      dir: H, HW: [[.926,GENERAL]], stretch: {left:[0x219E,GENERAL], rep:[0x2212,GENERAL]}
    },
    0x21A0: 
    {
      dir: H, HW: [[.926,GENERAL]], stretch: {right:[0x21A0,GENERAL], rep:[0x2212,GENERAL]}
    },
    0x21A4: 
    {
      dir: H, HW: [[.926,GENERAL]],
      stretch: {left:[0x2190,VARIANT], rep:[0x2212,GENERAL], right:[0x22A3,BOLD,0,.1,.6]}
    },
    0x21A5: 
    {
      dir: V, HW: [[.816,GENERAL]],
      stretch: {bot:[0x5F,GENERAL,.05,-.01,.8], ext:[0x23D0,GENERAL], top:[0x2191,GENERAL]}
    },
    0x21A6: 
    {
      dir: H, HW: [[1,GENERAL]],
      stretch: {left:[0xE0B6,NONUNI], rep:[0x2212,GENERAL], right:[0x2192,GENERAL]}
    },
    0x21A7: 
    {
      dir: V, HW: [[.816,GENERAL]],
      stretch: {top:[0x22A4,BOLD,0.04,0,.6], ext:[0x23D0,GENERAL], bot:[0x2193,GENERAL]}
    },
    0x21B0: 
    {
      dir: V, HW: [[.818,GENERAL]], stretch: {top:[0x21B0,GENERAL], ext:[0x23D0,GENERAL,.152]}
    },
    0x21B1: 
    {
      dir: V, HW: [[.818,GENERAL]], stretch: {top:[0x21B1,GENERAL], ext:[0x23D0,GENERAL,-.195]}
    },
    0x21BC: 
    {
      dir: H, HW: [[.955,GENERAL]], stretch: {left:[0x21BC,GENERAL], rep:[0x2212,GENERAL]}
    },
    0x21BD: 
    {
      dir: H, HW: [[.955,GENERAL]], stretch: {left:[0x21BD,GENERAL], rep:[0x2212,GENERAL]}
    },
    0x21BE: 
    {
      dir: V, HW: [[.818,GENERAL]], stretch: {top:[0x21BE,GENERAL], ext:[0x23D0,GENERAL]}
    },
    0x21BF: 
    {
      dir: V, HW: [[.818,GENERAL]], stretch: {top:[0x21BF,GENERAL], ext:[0x23D0,GENERAL]}
    },
    0x21C0: 
    {
      dir: H, HW: [[.955,GENERAL]], stretch: {right:[0x21C0,GENERAL], rep:[0x2212,GENERAL]}
    },
    0x21C1: 
    {
      dir: H, HW: [[.955,GENERAL]], stretch: {right:[0x21C1,GENERAL], rep:[0x2212,GENERAL]}
    },
    0x21C2: 
    {
      dir: V, HW: [[.818,GENERAL]], stretch: {bot:[0x21C2,GENERAL], ext:[0x23D0,GENERAL]}
    },
    0x21C3: 
    {
      dir: V, HW: [[.818,GENERAL]], stretch: {bot:[0x21C3,GENERAL], ext:[0x23D0,GENERAL]}
    },
    0x21DA: 
    {
      dir: H, HW: [[.926,GENERAL]], stretch: {left:[0x21DA,GENERAL], rep:[0x2261,GENERAL]}
    },
    0x21DB: 
    {
      dir: H, HW: [[.926,GENERAL]], stretch: {right:[0x21DB,GENERAL], rep:[0x2261,GENERAL]}
    },
    0x23B4: 
    {
      dir: H, HW: [[.926,GENERAL],[1.063,SIZE1],[1.606,SIZE2],[2.147,SIZE3],[2.692,SIZE4],[3.237,SIZE5]],
      stretch: {left:[0x2310,GENERAL], rep:[0x2212,GENERAL,0,.12], right:[0xAC,GENERAL]}
    },
    0x23B5: 
    {
      dir: H, HW: [[.926,GENERAL],[1.063,SIZE1],[1.606,SIZE2],[2.147,SIZE3],[2.692,SIZE4],[3.237,SIZE5]],
      stretch: {left:[0x2A3D,GENERAL,0,.12], rep:[0x2212,GENERAL,0,0,0,.12], right:[0x2A3C,GENERAL,0,.12]}
    },
    0x23DC: 
    {
      dir: H, HW: [[.926,SIZE1],[1,GENERAL],[1.460,SIZE2],[1.886,SIZE3],[2.328,SIZE4],[3.237,SIZE5]],
      stretch: {left:[0xE13B,NONUNI], right:[0xE13C,NONUNI], rep:[0xE14A,NONUNI]}
    },
    0x23DD: 
    {
      dir: H, HW: [[.926,SIZE1],[1,GENERAL],[1.460,SIZE2],[1.886,SIZE3],[2.328,SIZE4],[3.237,SIZE5]],
      stretch: {left:[0xE13D,NONUNI], right:[0xE13E,NONUNI], rep:[0xE14B,NONUNI]}
    },
    0x23E0: 
    {
      dir: H, HW: [[1,GENERAL],[1.460,SIZE1],[1.886,SIZE2],[2.312,SIZE3],[2.738,SIZE4],[3.164,SIZE5]],
      stretch: {left:[0xE10D,NONUNI,-.1,-.1], rep:[0x2212,GENERAL,0,.05], right:[0xE10C,NONUNI,0,-.1], fullExtenders:true}
    },
    0x23E1: 
    {
      dir: H, HW: [[1,GENERAL],[1.460,SIZE1],[1.886,SIZE2],[2.312,SIZE3],[2.738,SIZE4],[3.164,SIZE5]],
      stretch: {left:[0xE10C,NONUNI,-.1,.1], rep:[0x2212,GENERAL,0,-.1,0,.1], right:[0xE10D,NONUNI,0,.1], fullExtenders:true}
    },
    0x2906: 
    {
      dir: H, HW: [[.926,GENERAL]],
      stretch: {left:[0x21D0,GENERAL], rep:[0x3D,GENERAL], right:[0x2AE4,GENERAL,0,-.09]}
    },
    0x2907: 
    {
      dir: H, HW: [[.926,GENERAL]],
      stretch: {left:[0x22A8,GENERAL,0,-.09], rep:[0x3D,GENERAL], right:[0x21D2,GENERAL]}
    },
    0x294E: 
    {
      dir: H, HW: [],
      stretch: {left:[0x21BC,GENERAL], rep:[0x2212,GENERAL], right:[0x21C0,GENERAL]}
    },
    0x294F: 
    {
      dir: V, HW: [[.818,GENERAL]],
      stretch: {top:[0x21BE,GENERAL], ext:[0x23D0,GENERAL], bot:[0x21C2,GENERAL]}
    },
    0x2950: 
    {
      dir: H, HW: [[.926,GENERAL]],
      stretch: {left:[0x21BD,GENERAL], rep:[0x2212,GENERAL], right:[0x21C1,GENERAL]}
    },
    0x2951: 
    {
      dir: V, HW: [[.818,GENERAL]],
      stretch: {top:[0x21BF,GENERAL], ext:[0x23D0,GENERAL], bot:[0x21C3,GENERAL]}
    },
    0x295A: 
    {
      dir: H, HW: [[.926,GENERAL]],
      stretch: {left:[0x21BC,GENERAL], rep:[0x2212,GENERAL], right:[0x22A3,BOLD,0,.1,.6]}
    },
    0x295B: 
    {
      dir: H, HW: [[.926,GENERAL]],
      stretch: {left:[0xE0B6,NONUNI], rep:[0x2212,GENERAL], right:[0x21C0,GENERAL]}
    },
    0x295C: 
    {
      dir: V, HW: [[.818,GENERAL]],
      stretch: {bot:[0x5F,GENERAL,.05,-.01,.8], ext:[0x23D0,GENERAL], top:[0x21BE,GENERAL]}
    },
    0x295D: 
    {
      dir: V, HW: [[.818,GENERAL]],
      stretch: {top:[0x22A4,BOLD,0.04,0,.6], ext:[0x23D0,GENERAL], bot:[0x21C2,GENERAL]}
    },
    0x295E: 
    {
      dir: H, HW: [[.926,GENERAL]],
      stretch: {left:[0x21BD,GENERAL], rep:[0x2212,GENERAL], right:[0x22A3,BOLD,0,.1,.6]}
    },
    0x295F: 
    {
      dir: H, HW: [[.926,GENERAL]],
      stretch: {left:[0xE0B6,NONUNI], rep:[0x2212,GENERAL], right:[0x21C1,GENERAL]}
    },
    0x2960: 
    {
      dir: V, HW: [[.818,GENERAL]],
      stretch: {bot:[0x5F,GENERAL,.05,-.01,.8], ext:[0x23D0,GENERAL], top:[0x21BF,GENERAL]}
    },
    0x2961: 
    {
      dir: V, HW: [[.818,GENERAL]],
      stretch: {top:[0x22A4,BOLD,0.04,0,.6], ext:[0x23D0,GENERAL], bot:[0x21C3,GENERAL]}
    },
    0x02C7: 
    {
      dir: H, HW: [[.333,GENERAL],[.56,SIZE1],[.979,SIZE2],[1.458,SIZE3],[1.886,SIZE4],[2.328,SIZE5]]
    },
    0x02CD: 
    {
      dir: H, HW: [[.334,GENERAL]], stretch: {rep:[0x2CD,GENERAL]}
    },
    0x02F7: 
    {
      dir: H, HW: [[.558,SIZE1],[.977,SIZE2],[1.458,SIZE3],[1.886,SIZE4],[2.328,SIZE5]]
    },
    0x219F: 
    {
      dir: V, HW: [[.816,GENERAL]], stretch: {ext:[0x23D0,GENERAL], top:[0x219F,GENERAL]}
    },
    0x21A1: 
    {
      dir: V, HW: [[.816,GENERAL]], stretch: {ext:[0x23D0,GENERAL], bot:[0x21A1,GENERAL]}
    },
    0x21A8: 
    {
      dir: V, HW: [[.816,GENERAL]],
      stretch: {top:[0x2191,GENERAL], ext:[0x23D0,GENERAL], bot:[0x2913,GENERAL]}
    },
    0x21A9: 
    {
      dir: H, HW: [[.926,GENERAL]],
      stretch: {left:[0x2190,GENERAL], rep:[0x2212,GENERAL], right:[0xE0B5,NONUNI]}
    },
    0x21AA: 
    {
      dir: H, HW: [[.926,GENERAL]],
      stretch: {left:[0xE0B4,NONUNI], rep:[0x2212,GENERAL], right:[0x2192,GENERAL]}
    },
    0x21B2: 
    {
      dir: V, HW: [[.818,GENERAL]], stretch: {bot:[0x21B2,GENERAL], ext:[0x23D0,GENERAL,.152]}
    },
    0x21B3: 
    {
      dir: V, HW: [[.818,GENERAL]], stretch: {bot:[0x21B3,GENERAL], ext:[0x23D0,GENERAL,-.195]}
    },
    0x21B4: 
    {
      dir: H, HW: [[.926,GENERAL]], stretch: {rep:[0x2212,GENERAL,0,.4], right:[0x21B4,GENERAL]}
    },
    0x21B5: 
    {
      dir: V, HW: [[.818,GENERAL]], stretch: {bot:[0x21B5,GENERAL], ext:[0x23D0,GENERAL,.57]}
    },
    0x21CB: 
    {
      dir: H, HW: [[.926,GENERAL]],
      stretch: {left:[0x296A,GENERAL], rep:[0x3D,GENERAL], right:[0x296D,GENERAL]}
    },
    0x21CC: 
    {
      dir: H, HW: [[.926,GENERAL]],
      stretch: {left:[0x296B,GENERAL], rep:[0x3D,GENERAL], right:[0x296C,GENERAL]}
    },
    0x21E0: 
    {
      dir: H, HW: [[.926,GENERAL]],
      stretch: {left:[0x21E0,GENERAL], rep:[0xE121,NONUNI,0,0,0,0,.1], fullExtenders:true}
    },
    0x21E1: 
    {
      dir: V, HW: [[.818,GENERAL]],
      stretch: {ext:[0xE12D,NONUNI], top:[0x21E1,GENERAL], fullExtenders: true}
    },
    0x21E2: 
    {
      dir: H, HW: [[.926,GENERAL]],
      stretch: {right:[0x21E2,VARIANT], rep:[0xE12E,NONUNI,0,0,0,0,.1], fullExtenders:true}
    },
    0x21E3: 
    {
      dir: V, HW: [[.818,GENERAL]],
      stretch: {ext:[0xE12C,NONUNI], bot:[0x21E3,GENERAL], fullExtenders: true}
    },
    0x21E4: 
    {
      dir: H, HW: [[.926,GENERAL]], stretch: {left:[0x21E4,GENERAL], rep:[0x2212,GENERAL]}
    },
    0x21E5: 
    {
      dir: H, HW: [[.926,GENERAL]], stretch: {right:[0x21E5,GENERAL], rep:[0x2212,GENERAL]}
    },
    0x21FD: 
    {
      dir: H, HW: [[.926,GENERAL]], stretch: {left:[0x21FD,GENERAL], rep:[0x2212,GENERAL]}
    },
    0x21FE: 
    {
      dir: H, HW: [[.926,GENERAL]], stretch: {right:[0x21FE,GENERAL], rep:[0x2212,GENERAL]}
    },
    0x21FF: 
    {
      dir: H, HW: [[.926,GENERAL]],
      stretch: {left:[0x21FD,GENERAL], rep:[0x2212,GENERAL], right:[0x21FE,GENERAL]}
    },
    0x27E6: 
    {
      dir: V, HW: [[.93,GENERAL],[1.23,SIZE1],[1.845,SIZE2],[2.46,SIZE3],[3.075,SIZE4]],
      stretch: {top:[0x2553,GENERAL], ext:[0x2551,GENERAL], bot:[0x2559,GENERAL]}
    },
    0x27E7: 
    {
      dir: V, HW: [[.93,GENERAL],[1.23,SIZE1],[1.845,SIZE2],[2.46,SIZE3],[3.075,SIZE4]],
      stretch: {top:[0x2556,GENERAL], ext:[0x2551,GENERAL], bot:[0x255C,GENERAL]}
    },
    0x27EA: 
    {
      dir: V, HW: [[.931,GENERAL],[1.23,SIZE1],[1.845,SIZE2],[2.461,SIZE3],[3.075,SIZE4]]
    },
    0x27EB: 
    {
      dir: V, HW: [[.931,GENERAL],[1.23,SIZE1],[1.845,SIZE2],[2.461,SIZE3],[3.075,SIZE4]]
    },
    0x290A: 
    {
      dir: V, HW: [[.818,GENERAL]], stretch: {top:[0x290A,GENERAL], ext:[0xE135,NONUNI]}
    },
    0x290B: 
    {
      dir: V, HW: [[.818,GENERAL]], stretch: {bot:[0x290B,GENERAL], ext:[0xE135,NONUNI]}
    },
    0x2912: 
    {
      dir: V, HW: [[.818,GENERAL]], stretch: {top:[0x2912,GENERAL], ext:[0x23D0,GENERAL]}
    },
    0x2913: 
    {
      dir: V, HW: [[.818,GENERAL]], stretch: {bot:[0x2913,GENERAL], ext:[0x23D0,GENERAL]}
    },
    0x2952: 
    {
      dir: H, HW: [[.926,GENERAL]], stretch: {left:[0x2952,GENERAL], rep:[0x2212,GENERAL]}
    },
    0x2953: 
    {
      dir: H, HW: [[.926,GENERAL]], stretch: {right:[0x2953,GENERAL], rep:[0x2212,GENERAL]}
    },
    0x2954: 
    {
      dir: V, HW: [[.818,GENERAL]], stretch: {top:[0x2954,GENERAL], ext:[0x23D0,GENERAL]}
    },
    0x2955: 
    {
      dir: V, HW: [[.818,GENERAL]], stretch: {bot:[0x2955,GENERAL], ext:[0x23D0,GENERAL]}
    },
    0x2956: 
    {
      dir: H, HW: [[.926,GENERAL]], stretch: {left:[0x2956,GENERAL], rep:[0x2212,GENERAL]}
    },
    0x2957: 
    {
      dir: H, HW: [[.926,GENERAL]], stretch: {right:[0x2957,GENERAL], rep:[0x2212,GENERAL]}
    },
    0x2958: 
    {
      dir: V, HW: [[.818,GENERAL]], stretch: {top:[0x2958,GENERAL], ext:[0x23D0,GENERAL]}
    },
    0x2959: 
    {
      dir: V, HW: [[.818,GENERAL]], stretch: {bot:[0x2959,GENERAL], ext:[0x23D0,GENERAL]}
    },
    0x2980: 
    {
      dir: V, HW: [[.874,GENERAL]], stretch: {ext:[0x2980,GENERAL]}
    },
    0x2997: 
    {
      dir: V, HW: [[.932,GENERAL]],
      stretch: {top:[0xE10D,NONUNI,.1,.05], ext:[0x23D0,GENERAL,-.1], bot:[0xE10C,NONUNI,.1]}
    },
    0x2998: 
    {
      dir: V, HW: [[.932,GENERAL]],
      stretch: {top:[0xE10C,NONUNI,-.1,.05], ext:[0x23D0,GENERAL], bot:[0xE10D,NONUNI,-.1]}
    }
  };
  for (var id in delim) {if (delim.hasOwnProperty(id)) {DELIMITERS[id] = delim[id]}};
  MathJax.Ajax.loadComplete(HTMLCSS.fontDir + "/fontdata-extra.js");
})(MathJax.OutputJax["HTML-CSS"]);
