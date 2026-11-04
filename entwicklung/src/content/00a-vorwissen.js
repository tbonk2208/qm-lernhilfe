/* ===== Thema 0: Mathematische Werkzeuge ===== */
topic({
  id:'vw', title:'Mathematische Werkzeuge', short:'Mathe-Werkzeuge',
  src:'Griffiths & Schroeter, Anhang Lineare Algebra · Mathematik-Grundvorlesungen',
  goals:[
    'Ich kann mit komplexen Zahlen und der Euler-Formel $e^{i\\varphi} = \\cos\\varphi + i\\sin\\varphi$ sicher rechnen.',
    'Ich kann Gauß-Integrale (auch mit quadratischer Ergänzung) und partielle Integration mit Randtermen anwenden.',
    'Ich kann Eigenwerte und Eigenvektoren hermitescher $2\\times 2$-Matrizen und einfache Fourier-Transformationen berechnen.'
  ],
  needs:'Ableiten und Integrieren elementarer Funktionen · Matrizen multiplizieren · Determinante einer $2\\times2$-Matrix',
  check:[
    {q:'Wie groß ist $|e^{i\\varphi}|$ für reelles $\\varphi$?', opts:['$1$', '$\\varphi$', 'hängt von $\\varphi$ ab'], a:0, ex:'$|e^{i\\varphi}|^2 = e^{-i\\varphi}e^{i\\varphi} = 1$. Phasenfaktoren ändern den Betrag nicht.', lex:'euler'},
    {q:'$\\int_{-\\infty}^{\\infty} e^{-x^2}\\,dx$ ist …', opts:['$\\sqrt{\\pi}$', '$\\pi$', '$1$'], a:0, ex:'Das Gauß-Integral: $\\int e^{-\\alpha x^2}dx = \\sqrt{\\pi/\\alpha}$, hier $\\alpha = 1$.', lex:'integrale'},
    {q:'Welche Funktionen lösen $y\'\' = -k^2y$ mit $k > 0$?', opts:['$A\\sin kx + B\\cos kx$', '$Ae^{kx} + Be^{-kx}$', '$Ax + B$'], a:0, ex:'Zweimal ableiten liefert den Faktor $-k^2$. Die Exponentialfunktionen lösen $y\'\' = +k^2y$.', lex:'schwingungsgleichung'},
    {q:'Welche Eigenwerte hat die Matrix $\\begin{pmatrix}0&1\\\\1&0\\end{pmatrix}$?', opts:['$+1$ und $-1$', '$0$ und $1$', '$i$ und $-i$'], a:0, ex:'$\\det\\begin{pmatrix}-\\lambda&1\\\\1&-\\lambda\\end{pmatrix} = \\lambda^2 - 1 = 0$.', lex:'hermitesche-matrix'}
  ],
  example:{
    title:'Gauß-Integral mit quadratischer Ergänzung',
    text:'Berechne $\\int_{-\\infty}^{\\infty} e^{-\\alpha x^2 + bx}\\,dx$ für $\\alpha > 0$ und reelles $b$. Dieses Integral kommt bei Wellenpaketen und Fourier-Transformationen ständig vor.',
    ctx:CTX.line({params:{α:'pos', b:'real', m:'pos'}}),
    lines:[
      {l:'∫_-∞^∞ e^(-α x^2 + b x) dx = ∫_-∞^∞ e^(-α (x - b/(2α))^2 + b^2/(4α)) dx', why:{q:'Was passiert im Exponenten?', opts:['Quadratische Ergänzung: $-\\alpha x^2 + bx = -\\alpha(x - \\frac{b}{2\\alpha})^2 + \\frac{b^2}{4\\alpha}$', 'Der Exponent wird abgeleitet.', 'Man setzt $x = 0$ ein.'], a:0, ex:'Ausmultiplizieren der rechten Seite gibt wieder $-\\alpha x^2 + bx$.'}},
      {l:'= e^(b^2/(4α)) ∫_-∞^∞ e^(-α (x - b/(2α))^2) dx', why:{q:'Warum darf $e^{b^2/(4\\alpha)}$ vor das Integral?', opts:['Er hängt nicht von $x$ ab.', 'Weil er klein ist.', 'Weil $b$ reell ist.'], a:0, ex:'$e^{u+v} = e^u e^v$, und konstante Faktoren zieht man heraus.'}},
      {l:'= e^(b^2/(4α)) ∫_-∞^∞ e^(-α u^2) du', w:'u = x − b/(2α)', why:{q:'Warum ändern sich die Grenzen nicht?', opts:['Eine Verschiebung bildet $(-\\infty, \\infty)$ auf sich ab.', 'Grenzen ändern sich bei Substitution nie.', 'Weil $du = 2dx$.'], a:0, ex:'Mit $u = x - c$ ist $du = dx$, und $\\pm\\infty$ bleibt $\\pm\\infty$.'}},
      {l:'= sqrt(π/α) e^(b^2/(4α))', why:{q:'Welche Formel wird benutzt?', opts:['$\\int_{-\\infty}^\\infty e^{-\\alpha u^2}du = \\sqrt{\\pi/\\alpha}$', '$\\int e^{-\\alpha u}du = 1/\\alpha$', '$\\int u\\,e^{-\\alpha u^2}du = 0$'], a:0, ex:'Das Gauß-Integral. Die Formel gilt übrigens auch für komplexes $b$ (Fourier-Transformation).'}}
    ],
    faded:{id:'vw-fade', title:'Jetzt du: Fourier-Transformierte einer Gauß-Funktion',
      text:'Berechne $\\varphi(k) = \\frac{1}{\\sqrt{2\\pi}}\\int_{-\\infty}^\\infty e^{-x^2/2}\\,e^{-ikx}\\,dx$. Benutze die Formel aus dem Beispiel mit $\\alpha = 1/2$ und $b = -ik$.',
      ctx:{coords:['k'], params:{}, defs:{'φ(k)':'1/sqrt(2π) ∫_-∞^∞ e^(-x^2/2) e^(-i k x) dx'}},
      given:['φ(k) = 1/sqrt(2π) ∫_-∞^∞ e^(-x^2/2) e^(-ikx) dx'],
      goals:[{id:'a', prompt:'Bestimme $\\varphi(k)$.', type:'value', target:'e^(-k^2/2)', points:2, hints:['$b^2/(4\\alpha) = (-ik)^2/2 = -k^2/2$.', '$\\sqrt{\\pi/\\alpha} = \\sqrt{2\\pi}$.'],
        model:['φ(k) = 1/sqrt(2π) ∫_-∞^∞ e^(-x^2/2) e^(-ikx) dx', {l:'= 1/sqrt(2π) · sqrt(2π) e^(-k^2/2)', gap:'= 1/sqrt(2π) · ▢'}, '= e^(-k^2/2)'],
        mistakes:[{expr:'e^(k^2/2)', msg:'Vorzeichen: $(-ik)^2 = -k^2$, nicht $+k^2$.'}]}]}
  },
  puzzle:{
    title:'Komplexe Einträge, reelle Eigenwerte?',
    text:'Die Matrix $M = \\begin{pmatrix}0 & -i\\\\ i & 0\\end{pmatrix}$ hat rein imaginäre Einträge.\n\nWas vermutest du über ihre Eigenwerte?',
    q:{q:'Deine Vermutung:', opts:['Sie sind rein imaginär, nämlich $\\pm i$.', 'Sie sind reell, nämlich $\\pm 1$.', 'Es gibt keine Eigenwerte.', 'Beide sind $0$.'], a:1, ex:'$\\det(M - \\lambda) = \\lambda^2 - (-i)(i) = \\lambda^2 - 1$, also $\\lambda = \\pm 1$.'},
    reveal:'Entscheidend ist nicht, ob die Einträge reell sind, sondern ob die Matrix **hermitesch** ist: $M^\\dagger = (M^T)^* = M$. Hier gilt $M_{12} = -i = (M_{21})^* = (i)^*$. Hermitesche Matrizen haben immer reelle Eigenwerte, und Eigenvektoren zu verschiedenen Eigenwerten stehen senkrecht aufeinander.\n\nDas ist der mathematische Kern der Quantenmechanik: Messgrößen werden durch hermitesche Operatoren dargestellt, deshalb sind Messwerte reell. (Die Matrix ist übrigens die Pauli-Matrix $\\sigma_y$.)'
  },
  clarify:{
    core:'Vier Werkzeuge tragen fast jede Rechnung in QM I:\n\n- **Komplexe Zahlen:** $z = re^{i\\varphi}$, $|z|^2 = z^*z$, $e^{i\\varphi} = \\cos\\varphi + i\\sin\\varphi$.\n- **Gauß-Integrale:** $\\int_{-\\infty}^{\\infty}e^{-\\alpha x^2 + bx}dx = \\sqrt{\\pi/\\alpha}\\,e^{b^2/(4\\alpha)}$, auch für komplexes $b$.\n- **Partielle Integration:** $\\int_a^b f g\'\\,dx = [fg]_a^b - \\int_a^b f\'g\\,dx$. In der QM verschwindet der Randterm meist, weil normierbare Funktionen am Rand null werden.\n- **Lineare Algebra:** Eigenwerte aus $\\det(M - \\lambda\\mathbb 1) = 0$; hermitesche Matrizen ($M^\\dagger = M$) haben reelle Eigenwerte und orthogonale Eigenvektoren.\n\nDazu die Fourier-Transformation $\\varphi(k) = \\frac{1}{\\sqrt{2\\pi}}\\int\\psi(x)e^{-ikx}dx$, $\\psi(x) = \\frac{1}{\\sqrt{2\\pi}}\\int\\varphi(k)e^{ikx}dk$.',
    keys:[
      '$|z|^2 = z^*z$ ist reell und $\\ge 0$; $z^2$ ist im Allgemeinen komplex.',
      'Bei der quadratischen Ergänzung den Faktor vor $x^2$ ausklammern, bevor man ergänzt.',
      'Randterme nie stillschweigend weglassen: kurz begründen, warum sie verschwinden.',
      'Ein Eigenvektor ist nur bis auf einen Faktor bestimmt; normiere ihn mit $v^\\dagger v = 1$.',
      'Konvention prüfen: Manche Bücher setzen den Faktor $1/(2\\pi)$ ganz in die Rücktransformation. Hier ist er symmetrisch verteilt, dann gilt $\\int|\\varphi|^2dk = \\int|\\psi|^2dx$ (Parseval).'
    ],
    errors:[
      '$(-ik)^2 = +k^2$ rechnen. Richtig ist $(-ik)^2 = i^2k^2 = -k^2$.',
      'Bei partieller Integration das Minuszeichen vor dem Restintegral vergessen.',
      'Beim hermitesch Konjugieren nur transponieren und das Konjugieren vergessen.',
      '$e^{a+b} = e^a + e^b$ statt $e^ae^b$.'
    ],
    checks:[
      {q:'Ist $M = \\begin{pmatrix}2 & 1+i\\\\ 1+i & 3\\end{pmatrix}$ hermitesch?', opts:['Nein, denn $M_{12} \\ne M_{21}^*$.', 'Ja, denn $M = M^T$.', 'Ja, denn die Diagonale ist reell.'], a:0, ex:'Hermitesch heißt $M_{12} = M_{21}^*$. Hier ist $M_{21}^* = 1 - i \\ne 1 + i$.'},
      {q:'$\\int_0^\\infty x\\,e^{-x}dx = [-xe^{-x}]_0^\\infty + \\int_0^\\infty e^{-x}dx$. Wie groß ist der Randterm?', opts:['$0$', '$1$', 'unendlich'], a:0, ex:'Bei $x = 0$ steht $0$, und $xe^{-x}\\to 0$ für $x\\to\\infty$. Das Integral ist also $1$.'}
    ]
  },
  lab:{type:'complex', title:'Komplexe Zahl in der Ebene',
    text:'Der blaue Pfeil ist $z = re^{i\\varphi}$, der rote $z^*$. Verändere Betrag und Phase.',
    questions:[
      {q:'Stelle $\\varphi = \\pi$ (rechts am Anschlag, $\\approx 3{,}14$) und $r = 1$ ein. Welche Zahl ist $e^{i\\pi}$?', opts:['$-1$', '$i$', '$1$'], a:0, ex:'$e^{i\\pi} = \\cos\\pi + i\\sin\\pi = -1$.'},
      {q:'Halte $r$ fest und ändere nur $\\varphi$. Was passiert mit $|z|^2$?', opts:['Es bleibt gleich.', 'Es wächst mit $\\varphi$.', 'Es wird negativ für $\\varphi < 0$.'], a:0, ex:'$|z|^2 = r^2$ hängt nicht von der Phase ab. Deshalb ändert ein Phasenfaktor $e^{-iEt/\\hbar}$ keine Wahrscheinlichkeiten.'}
    ],
    noPic:{q:'Ohne Bild: Was ist $|e^{-i\\omega t}(3 + 4i)|^2$?', opts:['$25$', '$25\\cos^2\\omega t$', '$7$'], a:0, ex:'$|e^{-i\\omega t}|^2 = 1$ und $|3 + 4i|^2 = 25$.'}},
  compare:{
    text:'Gesucht ist $\\int_{-\\infty}^\\infty x^2e^{-\\alpha x^2}dx$ für $\\alpha > 0$. Zwei richtige Wege:',
    ctx:CTX.line({params:{α:'pos', m:'pos'}}),
    A:{name:'Partiell integrieren', model:['∫_-∞^∞ x^2 e^(-α x^2) dx = ∫_-∞^∞ x · x e^(-α x^2) dx', {l:'= 1/(2α) ∫_-∞^∞ e^(-α x^2) dx', w:'f = x, g′ = x e^(−αx²); Randterm −x e^(−αx²)/(2α) verschwindet'}, '= 1/(2α) sqrt(π/α)']},
    B:{name:'Nach dem Parameter ableiten', model:['∫_-∞^∞ x^2 e^(-α x^2) dx = -d/dα ∫_-∞^∞ e^(-α x^2) dx', '= -d/dα sqrt(π/α)', '= 1/(2α) sqrt(π/α)']},
    questions:[
      {q:'Welcher Weg liefert am schnellsten auch $\\int x^4e^{-\\alpha x^2}dx$?', opts:['Weg B: noch einmal nach $\\alpha$ ableiten', 'Weg A: zweimal partiell integrieren', 'Keiner von beiden'], a:0, ex:'$\\int x^4e^{-\\alpha x^2}dx = \\frac{d^2}{d\\alpha^2}\\sqrt{\\pi/\\alpha} = \\frac{3}{4\\alpha^2}\\sqrt{\\pi/\\alpha}$.'},
      {q:'Was muss man bei Weg A zusätzlich begründen?', opts:['dass der Randterm verschwindet', 'dass $\\alpha$ reell ist', 'nichts'], a:0, ex:'$x\\,e^{-\\alpha x^2}\\to 0$ für $x\\to\\pm\\infty$, deshalb fällt $[\\dots]_{-\\infty}^{\\infty}$ weg.'}
    ]
  },
  practice:[
    {id:'vw-p1', title:'Rechnen mit komplexen Zahlen',
      text:'Gegeben ist $z = (2 + 3i)\\,e^{i\\omega t}$ mit reellen $\\omega, t$.',
      ctx:CTX.line({params:{ω:'pos', t:'pos', m:'pos'}, defs:{'z':'(2 + 3i) e^(i ω t)'}}),
      goals:[
        {id:'a', prompt:'a) Berechne $|z|^2$.', type:'value', target:'13', points:2, ph:'|z|^2 = z^* z', hints:['$|z|^2 = z^*z$; konjugiere jeden Faktor.', '$(2-3i)(2+3i) = 4 + 9$.'],
          model:['|z|^2 = z^* z', '= (2 - 3i)(2 + 3i) e^(-iωt) e^(iωt)', '= 4 + 9', '= 13'],
          mistakes:[{expr:'-5 + 12i', msg:'Das ist $(2+3i)^2$. Für $|z|^2$ braucht man $z^*z$, nicht $z^2$.'}]},
        {id:'b', prompt:'b) Schreibe $\\dfrac{1}{1 + i}$ in der Form $a + ib$.', type:'value', target:'1/2 - i/2', points:2, ph:'1/(1 + i) = (1 - i)/((1 + i)(1 - i))', hints:['Erweitere mit dem Konjugierten des Nenners.'],
          model:['1/(1 + i) = (1 - i)/((1 + i)(1 - i))', '= (1 - i)/2', '= 1/2 - i/2']}
      ]},
    {id:'vw-p2', title:'Euler-Formel',
      text:'Für reelles $\\theta$ gilt $e^{i\\theta} = \\cos\\theta + i\\sin\\theta$.',
      ctx:CTX.line({params:{θ:'real', m:'pos'}}),
      goals:[
        {id:'a', prompt:'a) Zeige: $\\dfrac{e^{i\\theta} + e^{-i\\theta}}{2} = \\cos\\theta$.', type:'show', from:'(e^(iθ) + e^(-iθ))/2', to:'cos(θ)', points:2, hints:['Setze für beide Exponentialfunktionen die Euler-Formel ein; $\\sin(-\\theta) = -\\sin\\theta$.'],
          model:['(e^(iθ) + e^(-iθ))/2 = (cos θ + i sin θ + cos θ - i sin θ)/2', '= cos θ']},
        {id:'b', prompt:'b) Berechne $\\left(e^{i\\pi/3}\\right)^6$.', type:'value', target:'1', points:2, hints:['$(e^{a})^n = e^{na}$.'],
          model:['(e^(iπ/3))^6 = e^(6iπ/3)', '= e^(2πi)', '= 1']}
      ]},
    {id:'vw-p3', title:'Gauß-Integrale',
      text:'Benutze $\\int_{-\\infty}^\\infty e^{-\\alpha u^2}du = \\sqrt{\\pi/\\alpha}$.',
      ctx:CTX.line({params:{α:'pos', m:'pos'}}),
      goals:[
        {id:'a', prompt:'a) Berechne $\\int_{-\\infty}^\\infty e^{-x^2 + 2x}\\,dx$.', type:'value', target:'sqrt(π) e', points:3, hints:['Quadratische Ergänzung: $-x^2 + 2x = -(x-1)^2 + 1$.'],
          model:['∫_-∞^∞ e^(-x^2 + 2x) dx = ∫_-∞^∞ e^(-(x - 1)^2 + 1) dx', '= e ∫_-∞^∞ e^(-u^2) du', '= e sqrt(π)'],
          mistakes:[{expr:'sqrt(π)', msg:'Der konstante Teil $e^{1}$ aus der quadratischen Ergänzung fehlt.'}]},
        {id:'b', prompt:'b) Berechne $\\int_0^\\infty x\\,e^{-\\alpha x^2}\\,dx$.', type:'value', target:'1/(2α)', points:2, hints:['$x\\,e^{-\\alpha x^2}$ ist bis auf einen Faktor die Ableitung von $e^{-\\alpha x^2}$.'],
          model:['∫_0^∞ x e^(-α x^2) dx = [-e^(-α x^2)/(2α)]_0^∞', '= 1/(2α)']}
      ]},
    {id:'vw-p4', title:'Partielle Integration',
      text:'Achte auf die Randterme.',
      ctx:CTX.line({params:{m:'pos'}}),
      goals:[
        {id:'a', prompt:'a) Berechne $\\int_0^\\pi x\\sin x\\,dx$.', type:'value', target:'π', points:2, hints:['Wähle $f = x$, $g\' = \\sin x$, also $g = -\\cos x$.'],
          model:['∫_0^π x sin(x) dx = [-x cos(x)]_0^π + ∫_0^π cos(x) dx', '= π + [sin(x)]_0^π', '= π']}
      ]},
    {id:'vw-p4b', title:'Randterme bei Funktionen, die am Rand verschwinden',
      text:'Für Funktionen $f, g$ auf $[0, L]$ mit $f(0) = f(L) = 0$ und $g(0) = g(L) = 0$ (wie Wellenfunktionen im Kasten).',
      ctx:CTX.box({abstract:{f:{args:['x']}, g:{args:['x']}}}),
      goals:[
        {id:'a', prompt:'Zeige: $\\int_0^L f^*g\'\\,dx = -\\int_0^L (f^*)\'\\,g\\,dx$.', type:'show', from:'∫_0^L f^* g\' dx', to:'-∫_0^L (f^*)\' g dx', points:3, hints:['Partielle Integration mit $f^*$ und $g$.', 'Der Randterm $[f^*g]_0^L$ ist null, weil beide Funktionen am Rand verschwinden.'],
          model:['∫_0^L f^* g\' dx = [f^* g]_0^L - ∫_0^L (f^*)\' g dx', {l:'= -∫_0^L (f^*)\' g dx', w:'f(0) = f(L) = 0'}],
          note:'Genau dieser Schritt zeigt später, dass $\\hat p = -i\\hbar\\,d/dx$ hermitesch ist.'}
      ]},
    {id:'vw-p5', title:'Eigenwerte und Eigenvektoren einer hermiteschen Matrix',
      text:'$M = \\begin{pmatrix}2 & 1-i\\\\ 1+i & 3\\end{pmatrix}$. In der Eingabe: `M` oder `(2, 1 - i; 1 + i, 3)`, Spaltenvektoren als `(a; b)`.',
      ctx:{rep:'mat', mat:{preset:'spin'}, coords:['t'], params:{}, defs:{'M':'(2, 1 - i; 1 + i, 3)'}, unknowns:{λ:{ref:'4', kind:'real'}}},
      goals:[
        {id:'a', prompt:'a) Stelle das charakteristische Polynom auf und bestimme den größeren Eigenwert $\\lambda$.', type:'solve', unknown:'λ', points:3, ph:'det(M - λ) = 0',
          hints:['$\\det\\begin{pmatrix}a & b\\\\ c & d\\end{pmatrix} = ad - bc$, und $(1-i)(1+i) = 2$.', 'Das Polynom $\\lambda^2 - 5\\lambda + 4$ faktorisiert.'],
          model:['det(M - λ) = 0', '(2 - λ)(3 - λ) - (1 - i)(1 + i) = 0', 'λ^2 - 5λ + 4 = 0', '(λ - 1)(λ - 4) = 0', 'λ = 4']},
        {id:'b', prompt:'b) Zeige, dass $v = \\begin{pmatrix}1-i\\\\2\\end{pmatrix}$ Eigenvektor zum Eigenwert $4$ ist.', type:'show', from:'M (1 - i; 2)', to:'4 (1 - i; 2)', points:2, hints:['Multipliziere zeilenweise: erste Zeile $2(1-i) + (1-i)\\cdot 2$.'],
          model:['M (1 - i; 2) = (2(1 - i) + 2(1 - i); (1 + i)(1 - i) + 6)', '= (4 - 4i; 8)', '= 4 (1 - i; 2)'],
          note:'Normiert: $v/\\sqrt6$, denn $|1-i|^2 + 4 = 6$.'}
      ]},
    {id:'vw-p6', title:'Fourier-Transformierte eines Kastens',
      text:'$\\psi(x) = 1/\\sqrt a$ für $|x| < a/2$, sonst $0$. Berechne $\\varphi(k) = \\frac{1}{\\sqrt{2\\pi}}\\int\\psi(x)e^{-ikx}dx$. Bei Auswertungsklammern mit zwei Variablen schreibst du die Variable dazu: `[…]_{x=-a/2}^{a/2}`.',
      ctx:{coords:['k', 'x'], params:{a:'pos'}, defs:{'φ(k)':'1/sqrt(2π a) ∫_{-a/2}^{a/2} e^(-i k x) dx'}},
      goals:[
        {id:'a', prompt:'Bestimme $\\varphi(k)$ für $k \\ne 0$.', type:'value', target:'sqrt(2/(π a)) sin(k a/2)/k', points:3, ph:'φ(k) = 1/sqrt(2π a) ∫_{-a/2}^{a/2} e^(-ikx) dx',
          hints:['Stammfunktion von $e^{-ikx}$ ist $e^{-ikx}/(-ik)$.', '$e^{iu} - e^{-iu} = 2i\\sin u$.'],
          model:['φ(k) = 1/sqrt(2π a) ∫_{-a/2}^{a/2} e^(-ikx) dx', '= 1/sqrt(2π a) [e^(-ikx)/(-ik)]_{x=-a/2}^{a/2}', '= 1/sqrt(2π a) · 2 sin(k a/2)/k', '= sqrt(2/(π a)) sin(k a/2)/k'],
          note:'Je schmaler der Kasten (kleines $a$), desto breiter $\\varphi(k)$: Das ist schon die Orts-Impuls-Unschärfe.'}
      ]}
  ],
  final:[
    {q:'Welche Aussage über eine hermitesche Matrix stimmt immer?', opts:['Ihre Eigenwerte sind reell.', 'Alle Einträge sind reell.', 'Sie ist diagonal.'], a:0, ex:'Aus $M^\\dagger = M$ folgt $\\lambda = \\lambda^*$ für jeden Eigenwert.'},
    {task:{id:'vw-f1', title:'Gauß-Integral', text:'Berechne $\\int_{-\\infty}^\\infty e^{-2x^2}\\,dx$.', ctx:CTX.line({params:{m:'pos'}}),
      goals:[{id:'a', prompt:'Ergebnis:', type:'value', target:'sqrt(π/2)', points:2, model:['∫_-∞^∞ e^(-2x^2) dx = sqrt(π/2)']}]}},
    {q:'$e^{i\\pi/2}$ ist gleich …', opts:['$i$', '$-1$', '$\\pi/2$'], a:0, ex:'$\\cos(\\pi/2) + i\\sin(\\pi/2) = i$.'},
    {task:{id:'vw-f2', title:'Betrag', text:'$z = e^{i\\theta}(1 + i)$ mit reellem $\\theta$.', ctx:CTX.line({params:{θ:'real', m:'pos'}, defs:{'z':'e^(i θ) (1 + i)'}}),
      goals:[{id:'a', prompt:'Berechne $|z|^2$.', type:'value', target:'2', points:2, model:['|z|^2 = z^* z', '= (1 - i)(1 + i)', '= 2']}]}}
  ],
  errors:[
    {id:'vw-e1', title:'Partielle Integration mit Vorzeichenfehler',
      text:'Gesucht ist $\\int_0^\\pi x\\cos x\\,dx$. So wurde gerechnet:',
      ctx:CTX.line({params:{m:'pos'}}),
      lines:['∫_0^π x cos(x) dx = ∫_0^π x (sin(x))\' dx', '= [x sin(x)]_0^π + ∫_0^π sin(x) dx', '= 0 + 2', '= 2'],
      wrong:1,
      why:{q:'Was ist in Zeile 2 falsch?', opts:['Vor dem Restintegral muss ein Minus stehen: $[fg] - \\int f\'g\\,dx$.', 'Der Randterm ist nicht null.', 'Die Grenzen sind vertauscht.'], a:0, ex:'Partielle Integration: $\\int fg\' = [fg] - \\int f\'g$. Mit dem Minus kommt $0 - 2 = -2$ heraus.'},
      fix:{id:'a', prompt:'Berichtige und rechne zu Ende.', type:'value', target:'-2', model:['∫_0^π x cos(x) dx = [x sin(x)]_0^π - ∫_0^π sin(x) dx', '= 0 - 2', '= -2']}}
  ]
});
lexe('euler', 'Euler-Formel', '$e^{i\\varphi} = \\cos\\varphi + i\\sin\\varphi$. Folgerungen: $\\cos\\varphi = \\tfrac12(e^{i\\varphi} + e^{-i\\varphi})$, $\\sin\\varphi = \\tfrac{1}{2i}(e^{i\\varphi} - e^{-i\\varphi})$, $|e^{i\\varphi}| = 1$, $e^{i\\pi} = -1$. Ableitung: $\\frac{d}{dt}e^{-i\\omega t} = -i\\omega\\,e^{-i\\omega t}$.', {topic:'vw'});
lexe('partielle-integration', 'Partielle Integration', '$\\int_a^b f(x)g\'(x)\\,dx = [f g]_a^b - \\int_a^b f\'(x)g(x)\\,dx$. In der Quantenmechanik verschwinden die Randterme meist, weil normierbare Wellenfunktionen im Unendlichen (oder an den Wänden eines Kastens) null werden. Diesen Schritt immer kurz begründen.', {topic:'vw'});
lexe('fourier', 'Fourier-Transformation', 'Konvention in dieser Lernhilfe: $\\varphi(k) = \\frac{1}{\\sqrt{2\\pi}}\\int_{-\\infty}^\\infty\\psi(x)e^{-ikx}dx$, $\\psi(x) = \\frac{1}{\\sqrt{2\\pi}}\\int_{-\\infty}^\\infty\\varphi(k)e^{ikx}dk$. Dann gilt Parseval: $\\int|\\psi|^2dx = \\int|\\varphi|^2dk$. Mit $p = \\hbar k$ ist $|\\varphi(k)|^2$ die Wahrscheinlichkeitsdichte für die Wellenzahl. Beispiel: $e^{-x^2/2}\\mapsto e^{-k^2/2}$.', {topic:'vw'});
lexe('hermitesche-matrix', 'Hermitesche Matrix (selbstadjungiert)', '$M^\\dagger = (M^T)^* = M$, also $M_{ij} = M_{ji}^*$. Eigenschaften: reelle Eigenwerte, Eigenvektoren zu verschiedenen Eigenwerten sind orthogonal, $M$ lässt sich unitär diagonalisieren. Eigenwerte aus $\\det(M - \\lambda\\mathbb 1) = 0$; für $2\\times2$: $\\lambda^2 - (\\operatorname{tr}M)\\lambda + \\det M = 0$.', {topic:'vw'});
lexe('schwingungsgleichung', 'Die Gleichung y″ = −k²y', 'Allgemeine Lösung: $y(x) = A\\sin kx + B\\cos kx = Ce^{ikx} + De^{-ikx}$. Für $y\'\' = +\\kappa^2y$: $y = Ce^{\\kappa x} + De^{-\\kappa x}$. Die Konstanten folgen aus Rand- oder Anschlussbedingungen (Kasten, Stufe, Barriere).', {topic:'vw'});
lexe('quadratische-ergaenzung', 'Gauß-Integral mit linearem Term', '$\\int_{-\\infty}^\\infty e^{-\\alpha x^2 + bx}dx = \\sqrt{\\pi/\\alpha}\\,e^{b^2/(4\\alpha)}$ für $\\operatorname{Re}\\alpha > 0$, auch für komplexes $b$. Herleitung: $-\\alpha x^2 + bx = -\\alpha(x - \\frac{b}{2\\alpha})^2 + \\frac{b^2}{4\\alpha}$, dann verschieben.', {topic:'vw'});
