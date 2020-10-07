MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['MathJax_Fraktur-bold'] = {
  directory: 'Fraktur/Bold',
  family: 'MathJax_Fraktur',
  weight: 'bold',
  testString: "MathJax Fraktur",
  Ranges: [
    [0x0,0x7F,"BasicLatin"],
    [0x80,0xDFFF,"Other"],
    [0xE300,0xE310,"PUA"]
  ]
};
MathJax.Callback.Queue(
  ["initFont",MathJax.OutputJax["HTML-CSS"],"MathJax_Fraktur-bold"],
  ["loadComplete",MathJax.Ajax,MathJax.OutputJax["HTML-CSS"].fontDir+"/Fraktur/Bold/Main.js"]
);
