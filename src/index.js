#!/usr/bin/env node

const { cfonts } = require('cfonts');

const FORTUNES = [
  "A beautiful journey awaits you — but first, coffee.",
  "Your code will compile on the first try. Today is special.",
  "Someone will thank you for a PR you wrote six months ago.",
  "The bug you're looking for is in the comments you skipped.",
  "Your git push --force fears are about to come true. Kidding.",
  "Today you will accidentally delete production. Just kidding. Probably.",
  "A new framework will announce itself. Resist it at your peril.",
  "Your terminal theme is about to be the envy of your colleagues.",
  "The answer you're looking for is one `console.log` away.",
  "Stack Overflow has the answer. You just haven't found it yet.",
];

const JOKES = [
  "Why do Java developers wear glasses? Because they can't C#.",
  "A SQL query walks into a bar, walks up to two tables and asks: 'Can I join you?'",
  "Why was the JavaScript developer sad? Because he didn't Node how to Express himself.",
  "There are only two hard things in computer science: cache invalidation and naming things.",
  "How many programmers does it take to change a light bulb? None — that's a hardware problem.",
  "Why do programmers prefer dark mode? Because light attracts bugs.",
  "A programmer's spouse: 'Talk to me!' — Programmer: 'SELECT * FROM spouse WHERE topic = ?'",
  "I told my computer I needed a break. It hasn't sent me a notification since.",
  "Why was the developer on vacation? Because he didn't C the point.",
  "You know what the best thing about booleans is? Even if you're wrong, you're only off by a bit.",
];

const QUOTES = [
  { text: "Debugging is twice as hard as writing the code in the first place.", author: "Brian Kernighan" },
  { text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler" },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
  { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
  { text: "The best error message is the one that never shows up.", author: "Thomas Fuchs" },
  { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
  { text: "Deleted code is debugged code.", author: "Jeff Sickel" },
  { text: "Programming isn't about what you know; it's about what you can figure out.", author: "Chris Pine" },
  { text: "The most important property of a program is whether it accomplishes the intention of its user.", author: "C.A.R. Hoare" },
];

const ASCII_ART = [
  `
   ██████╗ ██╗   ██╗███████╗███████╗███████╗
  ██╔════╝ ██║   ██║██╔════╝██╔════╝██╔════╝
  ██║  ███╗██║   ██║█████╗  ███████╗███████╗
  ██║   ██║██║   ██║██╔══╝  ╚════██║╚════██║
  ╚██████╔╝╚██████╔╝███████╗███████║███████║
   ╚═════╝  ╚═════╝ ╚══════╝╚══════╝╚══════╝
  `,
  `
   ▓▓▓▓▓▓▓▓▓▓
  ▓ Framework ▓  ← pick one, any one!
   ▔▔▔▔▔▔▔▔▔▔
  `,
  `
    ┌──────────┐
    │ 0  1  0  │  ← your code, probably
    │ 1  0  1  │
    │ 0  1  0  │
    └──────────┘
  `,
  `
    ╔═╗╔═╗╔═╗╔═╗╔═╗
    ║ ║║ ║║║║║║║║║║
    ║ ║║ ║║║║║║║║║║
    ╚═╝╚═╝╚═╝╚═╝╚═╝
  `,
  `
    /\\稽yx
   /  \\  鱗 ?!
  /    \\     ← me, trying to fix the bug
 /______\\
  `,
  `
  ██╗    ██╗███████╗██╗      ██████╗ ██████╗ ███╗   ███╗███████╗
  ██║    ██║██╔════╝██║     ██╔════╝██╔═══██╗████╗ ████║██╔════╝
  ██║ █╗ ██║█████╗  ██║     ██║     ██║   ██║██╔████╔██║█████╗  
  ██║███╗██║██╔══╝  ██║     ██║     ██║   ██║██║╚██╔╝██║██╔══╝  
  ╚███╔███╔╝███████╗███████╗╚██████╗╚██████╔╝██║ ╚═╝ ██║███████╗
   ╚══╝╚══╝ ╚══════╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝
  `,
];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function showFortune() {
  console.log('\n  🎱 ' + pick(FORTUNES) + '\n');
}

function showJoke() {
  const j = pick(JOKES);
  console.log('\n  😂 ' + j + '\n');
}

function showQuote() {
  const q = pick(QUOTES);
  console.log('\n  💡 "' + q.text + '"');
  console.log('     — ' + q.author + '\n');
}

function showAscii() {
  console.log(pick(ASCII_ART));
}

function show(type) {
  switch (type) {
    case 'fortune': showFortune(); break;
    case 'joke':    showJoke();    break;
    case 'quote':   showQuote();   break;
    case 'ascii':   showAscii();   break;
    default:
      const types = [showFortune, showJoke, showQuote, showAscii];
      pick(types)();
  }
}

// CLI args
const args = process.argv.slice(2);
const countArg = args.indexOf('-n');
const count = countArg !== -1 ? parseInt(args[countArg + 1]) || 1 : 1;
const typeArg = args.find(a => a.startsWith('--type='));
const type = typeArg ? typeArg.split('=')[1] : null;

if (args.includes('--help') || args.includes('-h')) {
  console.log(`
  🎱 Fortune CLI

  Usage:
    fortune              Random everything
    fortune --type=joke  Specific type
    fortune -n 5         Show 5 at once

  Types: fortune, joke, quote, ascii
  `);
  process.exit(0);
}

for (let i = 0; i < count; i++) {
  show(type);
}
