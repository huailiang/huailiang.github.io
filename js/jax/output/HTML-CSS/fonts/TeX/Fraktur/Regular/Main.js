MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['MathJax_Fraktur'] = {
  directory: 'Fraktur/Regular',
  family: 'MathJax_Fraktur',
  testString: "MathJax Fraktur",
  Ranges: [
    [0x0,0x7F,"BasicLatin"],
    [0x80,0xDFFF,"Other"],
    [0xE300,0xE310,"PUA"]
  ]
};
MathJax.Callback.Queue(
  ["initFont",MathJax.OutputJax["HTML-CSS"],"MathJax_Fraktur"],
  ["loadComplete",MathJax.Ajax,MathJax.OutputJax["HTML-CSS"].fontDir+"/Fraktur/Regular/Main.js"]
);
