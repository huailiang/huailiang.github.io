MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['MathJax_SansSerif-italic'] = {
  directory: 'SansSerif/Italic',
  family: 'MathJax_SansSerif',
  style: 'italic',
  testString: "MathJax SansSerif ^ _",
  Ranges: [
    [0x0,0x7F,"BasicLatin"],
    [0x80,0xFFFF,"Other"],
    [0x300,0x36F,"CombDiacritMarks"]
  ]
};
MathJax.Callback.Queue(
  ["initFont",MathJax.OutputJax["HTML-CSS"],"MathJax_SansSerif-italic"],
  ["loadComplete",MathJax.Ajax,MathJax.OutputJax["HTML-CSS"].fontDir+"/SansSerif/Italic/Main.js"]
);
