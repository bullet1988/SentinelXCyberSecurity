// Encrypted secrets
const secrets = {
  base64_1: "UFBPUlRBTF9BQ0NFU1NfR1JBTlRFRA==",
  caesar_7: "Aopz pz h zhfily av dvysk!",
  base64_2: "L2FkbWluP3VzZXI9YWRtaW4mcGFzcz1sZXRtZWlu"
};

// Decryption tools
function caesarDecrypt(str, shift) {
  return str.replace(/[A-Za-z]/g, c => {
    const base = c >= 'a' ? 97 : 65;
    return String.fromCharCode((c.charCodeAt(0) - base - shift + 26) % 26 + base);
  });
}

window.decrypt = function() {
  const output = `
> Decoded Base64 #1: ${atob(secrets.base64_1)}
> Decoded Caesar: ${caesarDecrypt(secrets.caesar_7, 7)}
> Decoded Path: ${atob(secrets.base64_2)}
`;
  document.getElementById('console').innerHTML += `<pre>${output}</pre>`;
};

document.getElementById('chatInput').addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    const msg = e.target.value.toLowerCase();
    const responseMap = {
      hello: "Welcome, Analyst. Awaiting commands.",
      decrypt: "Try typing decrypt() in the browser console.",
      admin: "Use decrypted admin path... if you're authorized."
    };
    const reply = responseMap[msg] || "🤖 Unknown command. Try 'hello' or 'decrypt'.";
    const log = document.getElementById('chatlog');
    log.innerHTML += `<div>> ${msg}</div><div>< ${reply}</div>`;
    e.target.value = '';
  }
});

// 🌐 Matrix scroll effect
const canvas = document.getElementById('matrixScroll');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZあいうえおПриветשלום0123456789';
const columns = Math.floor(canvas.width / 16);
const drops = Array(columns).fill(1);

function drawMatrix() {
  ctx.fillStyle = 'rgba(0,0,0,0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = '14px monospace';
  for (let i = 0; i < drops.length; i++) {
    const char = alphabet[Math.floor(Math.random() * alphabet.length)];
    const colors = ['#60e9ff', '#ffffff', '#ff4d4d', '#000000'];
    ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
    ctx.fillText(char, i * 16, drops[i] * 16);
    if (drops[i] * 16 > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

setInterval(drawMatrix, 50);

