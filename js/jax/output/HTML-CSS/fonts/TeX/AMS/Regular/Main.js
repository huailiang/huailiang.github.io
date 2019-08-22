MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['MathJax_AMS'] = {
  directory: 'AMS/Regular',
  family: 'MathJax_AMS',
  testString: "MATHJAX AMS \u02C6",
  Ranges: [
    [0x0,0x7F,"BBBold"],
    [0x80,0xFF,"Latin1Supplement"],
    [0x100,0x17F,"LatinExtendedA"],
    [0x2B0,0x2FF,"SpacingModLetters"],
    [0x300,0x36F,"CombDiacritMarks"],
    [0x370,0x3FF,"GreekAndCoptic"],
    [0x2000,0x206F,"GeneralPunctuation"],
    [0x2100,0x214F,"LetterlikeSymbols"],
    [0x2190,0x21FF,"Arrows"],
    [0x2200,0x22FF,"MathOperators"],
    [0x2300,0x23FF,"MiscTechnical"],
    [0x2460,0x24FF,"EnclosedAlphanum"],
    [0x2500,0x257F,"BoxDrawing"],
    [0x25A0,0x25FF,"GeometricShapes"],
    [0x2600,0x26FF,"MiscSymbols"],
    [0x2700,0x27BF,"Dingbats"],
    [0x2980,0x29FF,"MiscMathSymbolsB"],
    [0x2A00,0x2AFF,"SuppMathOperators"],
    [0xE000,0xF8FF,"PUA"]
  ]
};
MathJax.Callback.Queue(
  ["initFont",MathJax.OutputJax["HTML-CSS"],"MathJax_AMS"],
  ["loadComplete",MathJax.Ajax,MathJax.OutputJax["HTML-CSS"].fontDir+"/AMS/Regular/Main.js"]
);
