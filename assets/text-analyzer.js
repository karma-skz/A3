// text-analyzer.js
// JS for Text Analyzer section

document.getElementById('analyze-btn').addEventListener('click', function() {
  const text = document.getElementById('analyzer-input').value;
  const output = document.getElementById('analyzer-output');

  // Show the output box
  document.getElementById('analyzer-output').style.display = 'block';

  // Basic counts
  const letters = (text.match(/[a-zA-Z]/g) || []).length;
  const words = (text.match(/\b\w+\b/g) || []).length;
  const spaces = (text.match(/ /g) || []).length;
  const newlines = (text.match(/\n/g) || []).length;
  const specials = (text.match(/[^\w\s\n]/g) || []).length;

  // Tokenize
  const tokens = text.split(/\s+/).filter(Boolean);

  // Pronouns (common English)
  const pronouns = [
    'i','me','my','mine','myself','we','us','our','ours','ourselves',
    'you','your','yours','yourself','yourselves',
    'he','him','his','himself','she','her','hers','herself',
    'it','its','itself','they','them','their','theirs','themselves'
  ];
  const pronounCounts = {};
  tokens.forEach(tok => {
    const t = tok.toLowerCase();
    if (pronouns.includes(t)) pronounCounts[t] = (pronounCounts[t]||0)+1;
  });

  // Prepositions (common English)
  const prepositions = [
    'about','above','across','after','against','along','among','around','at','before','behind','below','beneath','beside','between','beyond','but','by','concerning','despite','down','during','except','for','from','in','inside','into','like','near','of','off','on','onto','out','outside','over','past','regarding','since','through','throughout','to','toward','under','underneath','until','up','upon','with','within','without'
  ];
  const prepCounts = {};
  tokens.forEach(tok => {
    const t = tok.toLowerCase();
    if (prepositions.includes(t)) prepCounts[t] = (prepCounts[t]||0)+1;
  });

  // Indefinite articles
  const articles = ['a','an'];
  const articleCounts = {};
  tokens.forEach(tok => {
    const t = tok.toLowerCase();
    if (articles.includes(t)) articleCounts[t] = (articleCounts[t]||0)+1;
  });

  // Output
  let html = `<b>Basic Counts:</b><br>
    Letters: ${letters}<br>
    Words: ${words}<br>
    Spaces: ${spaces}<br>
    Newlines: ${newlines}<br>
    Special Symbols: ${specials}<br><br>`;

  html += `<b>Pronouns:</b><br>`;
  if (Object.keys(pronounCounts).length === 0) html += 'None<br>';
  else for (const p in pronounCounts) html += `${p}: ${pronounCounts[p]}<br>`;

  html += `<br><b>Prepositions:</b><br>`;
  if (Object.keys(prepCounts).length === 0) html += 'None<br>';
  else for (const p in prepCounts) html += `${p}: ${prepCounts[p]}<br>`;

  html += `<br><b>Indefinite Articles:</b><br>`;
  if (Object.keys(articleCounts).length === 0) html += 'None<br>';
  else for (const a in articleCounts) html += `${a}: ${articleCounts[a]}<br>`;

  output.innerHTML = html;
});
