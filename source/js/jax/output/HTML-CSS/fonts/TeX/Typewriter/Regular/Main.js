MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['MathJax_Typewriter'] = {
  directory: 'Typewriter/Regular',
  family: 'MathJax_Typewriter',
  testString: "MathJax Typewriter |",
  Ranges: [
    [0x0,0x7F,"BasicLatin"],
    [0x80,0xFFFF,"Other"],
    [0x300,0x36F,"CombDiacritMarks"]
  ]
};
MathJax.Callback.Queue(
  ["initFont",MathJax.OutputJax["HTML-CSS"],"MathJax_Typewriter"],
  ["loadComplete",MathJax.Ajax,MathJax.OutputJax["HTML-CSS"].fontDir+"/Typewriter/Regular/Main.js"]
);
