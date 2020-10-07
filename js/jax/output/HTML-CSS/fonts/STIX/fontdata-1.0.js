/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/font/STIX/fontdata-1.0.js
 *  
 *  Patches the STIX font data to work with version 1.0 of
 *  the STIX fonts (this is a delta from the v1.1 fonts).
 *
 *  ---------------------------------------------------------------------
 *  
 *  Copyright (c) 2012 Design Science, Inc.
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
(function (HTMLCSS,HUB) {
  var UPDATE = function (file,add,remove) {
    var name = "STIX"+file.replace(/\/[^\/]*$/,'').replace(/\
    name = name.replace(/-B/,'-b').replace(/-I/,'-i').replace(/-boldItalic/,'-bold-italic');
    HUB.Register.LoadHook(HTMLCSS.fontDir+"/"+file+".js",function () {
      var FONT = HTMLCSS.FONTDATA.FONTS[name];
      for (var id in add) {if (add.hasOwnProperty(id)) {FONT[id] = add[id]}}
      if (remove) {for (var i = 0, m = remove.length; i < m; i++) {delete FONT[remove[i]]}}
    });
  };
  HTMLCSS.FONTDATA.STIXversion = "1.0";
  delete HTMLCSS.FONTDATA.FONTS["STIXGeneral-bold"].Ranges["LatinExtendedD"];
  delete HTMLCSS.FONTDATA.FONTS["STIXGeneral-bold"].Ranges["BBBold"];
  HTMLCSS.FONTDATA.DELIMITERS[0x23DE].HW[0] = [.556,"STIXGeneral"];
  HTMLCSS.FONTDATA.DELIMITERS[0x23DE].HW[1] = [.926,"STIXSizeOneSym"];
  HTMLCSS.FONTDATA.DELIMITERS[0x23DF].HW[0] = [.556,"STIXGeneral"];
  HTMLCSS.FONTDATA.DELIMITERS[0x23DF].HW[1] = [.926,"STIXSizeOneSym"];
  HUB.Register.LoadHook(HTMLCSS.fontDir+"/fontdata-extra.js",function () {
    HTMLCSS.FONTDATA.DELIMITERS[0x23DC].HW[0] = [.556,"STIXGeneral"];
    HTMLCSS.FONTDATA.DELIMITERS[0x23DC].HW[1] = [.926,"STIXSizeOneSym"];
    HTMLCSS.FONTDATA.DELIMITERS[0x23DD].HW[0] = [.556,"STIXGeneral"];
    HTMLCSS.FONTDATA.DELIMITERS[0x23DD].HW[1] = [.926,"STIXSizeOneSym"];
    HTMLCSS.FONTDATA.DELIMITERS[0x23E0].HW[0][0] = .926;
    HTMLCSS.FONTDATA.DELIMITERS[0x23E1].HW[0][0] = .926;
  });
  UPDATE("General/Bold/CombDiacritMarks",{},[0x347]);
  UPDATE("General/Bold/LetterlikeSymbols",{
    0x2145: [676,0,748,75,703],        
    0x2146: [676,14,643,50,583],       
    0x2147: [473,14,573,50,523],       
    0x2148: [691,0,330,65,265],        
    0x2149: [691,205,371,-20,311]      
  });
  UPDATE("General/Bold/MathOperators",{
    0x2219: [473,-59,584,85,499]       
  },[0x22C0,0x22C1,0x22C2,0x22C3]);
  UPDATE("General/Bold/SpacingModLetters",{},[0x2F7]);
  UPDATE("General/BoldItalic/GeneralPunctuation",{
    0x203E: [637,-565,500,0,500]       
  });
  UPDATE("General/BoldItalic/GreekBoldItalic",{
    0x1D730: [685,0,589,31,721]        
  });
  UPDATE("General/BoldItalic/SpacingModLetters",{
    0x2B2: [1017,-331,350,24,384]      
  },[0x2F7]);
  UPDATE("General/Italic/CombDiactForSymbols",{
    0x20EC: [681,-548,0,-453,-17],     
    0x20ED: [681,-548,0,-453,-17]      
  });
  UPDATE("General/Italic/GeneralPunctuation",{
    0x203E: [582,-532,500,0,500]       
  });
  UPDATE("General/Italic/GreekItalic",{
    0x1D6F6: [668,0,567,28,687]       
  });
  UPDATE("General/Italic/SpacingModLetters",{},[0x2F7]);
  UPDATE("General/Regular/CombDiacritMarks",{},[0x347]);
  UPDATE("General/Regular/GreekBoldItalic",{
    0x1D730: [685,0,589,31,721]        
  });
  UPDATE("General/Regular/GreekItalic",{
    0x1D6F6: [668,0,567,28,687]       
  });
  UPDATE("General/Regular/LatinExtendedD",{},[0xA792]);
  UPDATE("General/Regular/LetterlikeSymbols",{
    0x2145: [662,0,722,70,677],        
    0x2146: [683,10,574,45,519],       
    0x2147: [460,10,523,45,478],       
    0x2148: [683,0,258,55,203],        
    0x2149: [683,217,305,-15,250]      
  });
  UPDATE("General/Regular/MathOperators",{
    0x22FF: [662,0,560,73,487]         
  });
  UPDATE("General/Regular/MiscMathSymbolsA",{},[0x27CB,0x27CD]);
  UPDATE("General/Regular/MiscSymbols",{},[0x26E2]);
  UPDATE("General/Regular/MiscTechnical",{
    0x23DC: [55,152,556,-10,566],      
    0x23DD: [771,-564,556,-10,566],    
    0x23DE: [117,88,556,-10,566],      
    0x23DF: [769,-564,556,-10,566],    
    0x23E0: [66,212,926,-3,929],       
    0x23E1: [842,-564,926,-3,929]      
  });
  UPDATE("General/Regular/PhoneticExtensions",{},[0x1D98,0x1DA3]);
  UPDATE("General/Regular/SpacingModLetters",{},[0x2F7]);
  UPDATE("General/Regular/SuppMathOperators",{},[0x2AFC,0x2AFF]);
  UPDATE("NonUnicode/Bold/PrivateUse",{
    0xE060: [-137,322,0,0,330],        
    0xE0A1: [691,19,769,27,734],       
    0xE38A: [676,0,787,50,737],        
    0xE38B: [676,0,729,75,669],        
    0xE38D: [676,0,650,75,595],        
    0xE38E: [676,0,474,75,595],        
    0xE38F: [691,19,751,45,686],       
    0xE390: [676,0,380,80,300],        
    0xE391: [676,19,618,50,548],       
    0xE392: [676,0,792,75,767],        
    0xE393: [676,0,662,70,607],        
    0xE394: [676,0,914,75,839],        
    0xE395: [691,19,787,45,742],       
    0xE396: [692,19,702,45,657],       
    0xE397: [676,0,556,25,645],        
    0xE398: [676,19,738,70,668],       
    0xE399: [676,0,627,17,704],        
    0xE39A: [676,0,996,17,1015],       
    0xE39B: [676,0,794,20,769],        
    0xE39C: [676,0,652,23,739],        
    0xE39D: [473,14,623,50,563],       
    0xE39E: [676,14,643,60,593],       
    0xE39F: [473,14,574,50,524],       
    0xE3A2: [676,0,474,25,536],        
    0xE3A3: [473,205,643,50,583],      
    0xE3A4: [676,0,624,60,564],        
    0xE3A7: [676,0,646,60,621],        
    0xE3A8: [676,0,325,60,265],        
    0xE3A9: [473,0,908,60,848],        
    0xE3AA: [473,0,624,60,564],        
    0xE3AB: [473,14,598,45,553],       
    0xE3AC: [473,205,643,60,593],      
    0xE3AD: [473,205,643,50,583],      
    0xE3AE: [473,0,339,60,445],        
    0xE3AF: [473,14,549,52,497],       
    0xE3B0: [676,14,446,25,411],       
    0xE3B1: [461,16,619,55,559],       
    0xE3B2: [461,0,494,6,544],         
    0xE3B3: [461,0,786,22,789],        
    0xE3B4: [461,0,660,25,635],        
    0xE3B5: [461,205,471,-9,537],      
    0xE3B6: [461,0,513,40,473]         
  });
  UPDATE("NonUnicode/BoldItalic/PrivateUse",{
    0xE388: [707,14,598,18,563]        
  });
  UPDATE("NonUnicode/Italic/PrivateUse",{
    0xE387: [683,10,557,52,526]        
  });
  UPDATE("NonUnicode/Regular/PrivateUse",{
    0xE041: [911,-433,480,64,398],     
    0xE042: [755,-425,441,57,387],     
    0xE060: [-140,292,1,11,323],       
    0xE09F: [662,156,902,0,863],       
    0xE0A0: [662,156,902,0,863],       
    0xE0A1: [676,14,734,18,700],       
    0xE0E4: [773,80,700,94,606]        
  });
  UPDATE("SizeTwoSym/Regular/All",{},[0x2AFF]);
  MathJax.Ajax.loadComplete(HTMLCSS.fontDir+"/fontdata-1.0.js");
})(MathJax.OutputJax["HTML-CSS"],MathJax.Hub);
