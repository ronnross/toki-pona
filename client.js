const p = require('pico-lambda')
var html = require('choo/html')
var choo = require('choo')
var app = choo()

const alphabet = [
  { letter: 'k', type: "consonant", pronounced: "kill" },
  { letter: 'l', type: "consonant", pronounced: "let" },
  { letter: 'm', type: "consonant", pronounced: "met" },
  { letter: 'n', type: "consonant", pronounced: "net" },
  { letter: 'p', type: "consonant", pronounced: "pit" },
  { letter: 's', type: "consonant", pronounced: "sink" },
  { letter: 't', type: "consonant", pronounced: "too" },
  { letter: 'w', type: "consonant", pronounced: "wet" },
  { letter: 'j', type: "consonant", pronounced: "yet" },
  { letter: 'a', type: "vowel", pronounced: "father" },
  { letter: 'e', type: "vowel", pronounced: "met" },
  { letter: 'i', type: "vowel", pronounced: "peel" },
  { letter: 'o', type: "vowel", pronounced: "more" },
  { letter: 'u', type: "vowel", pronounced: "food" }
]

const vocabulary = [
  { word: "mi", definition: "I, we, me, our", etymology: "esperanto", note: "" },
  { word: "sina", definition: "you, your", etymology: "", note: "" },
  { word: "jan", definition: "somebody, anybody, person", etymology: "", note: "doesn't work with mi or sina" },
  { word: "li", definition: "separates a 3rd person subject from its verb", etymology: "", note: "intransative::li can be used in compound sentences like mi moku li pakal I eat and destroy" },
  { word: "pona", definition: "good, simple, to fix, to repair", etymology: "", note: "" },
  { word: "moku", definition: "food, eat, drink", etymology: "", note: "" },
  { word: "suno", definition: "sun, light, to shine", etymology: "esperanto", note: "" },
  { word: "telo", definition: "water, liquid", etymology: "", note: "" },
  { word: "suli", definition: "big, tall, long, important", etymology: "", note: "" },
  { word: "ona", definition: "he, she, it", etymology: "", note: "" },
  { word: "kili", definition: "fruit, vegetable", etymology: "", note: "" },
  { word: "e", definition: "introduces direct object", etymology: "", note: "transative::use for multiple direct objects like mi moku e kili e telo, I eat/drink fruit and water" },
  { word: "wile", definition: "to want, to need, to have to, desire", etymology: "", note: "" },
  { word: "ilo", definition: "tool, device, machine", etymology: "esperanto", note: "" },
  { word: "ijo", definition: "something, anything, stuff, thing", etymology: "esperanto", note: "" },
  { word: "ni", definition: "this, that", etymology: "", note: "" },
  { word: "pipi", definition: "bug, insect, spider", etymology: "", note: "" },
  { word: "ma", definition: "land, country, region, outside area", etymology: "", note: "" },
  { word: "jo", definition: "to have, ownership, possession", etymology: "", note: "" },
  { word: "lukin", definition: "to see, to look at, vision, sight", etymology: "", note: "" },
  { word: "pakala", definition: "mess up, destry, accident", etymology: "", note: "" },
  { word: "unpa", definition: "have sex with, sex, sexual", etymology: "", note: "" },
  { word: "ike", definition: "bad, evil, complicated", etymology: "norwegian", note: "" },
  { word: "jaki", definition: "dirty, nasty, trash", etymology: "english yucky", note: "" },
  { word: "lawa", definition: "main, leading, head; to lead, control", etymology: "croatian glava meaning head", note: "" },
  { word: "len", definition: "clothing, to clothe", etymology: "welsh llen ‘curtain’ or french linge", note: "" },
  { word: "lili", definition: "little", etymology: "", note: "" },
  { word: "mute", definition: "many, a lot", etymology: "", note: "" },
  { word: "nasa", definition: "crazy, stupid, silly, weird, drunk, strange", etymology: "", note: "" },
  { word: "seli", definition: "warm, hot, to burn", etymology: "", note: "" },
  { word: "sewi", definition: "high, superior, sky", etymology: "", note: "" },
  { word: "tomo", definition: "house, building, constructions", etymology: "", note: "" },
  { word: "utala", definition: "war, battle, to fight", etymology: "", note: "" },
  { word: "lon", definition: "to be in/at/on, to exist; in ,at, on", etymology: "", note: "" },
  { word: "kepeken", definition: "to use, with, using", etymology: "", note: "" },
  { word: "tawa", definition: "to go to, to move, to, for", etymology: "", note: "" },
  { word: "kama", definition: "to come, to happen, to cause", etymology: "", note: "" },
  { word: "kiwen", definition: "stone, rock, hard like a rock", etymology: "", note: "" },
  { word: "kon", definition: "air, atmosphere, spirit, wind", etymology: "", note: "" },
  { word: "ko", definition: "squishy substance, paste, powder, gum", etymology: "english goo", note: ""},
  { word: "pana", definition: "to give, to send, to release, to emit", etymology: "", note: "" },
  { word: "poki", definition: "container, bowl, glass, cup, box, etc", etymology: "", note: "" },
  { word: "toki", definition: "language, to talk, to speak", etymology: "", note: "" },
  { word: "soweli", definition: "land-dwelling mammel", etymology: "", note: "" },
  { word: "kalama", definition: "sound, noise, voice", etymology: "croatian galama meaning buzz, noise", note: "" },
  { word: "sama", definition: "same, like", etymology: "esperanto", note: "" },
  { word: "pali", definition: "work, make", etymology: "esperanto fari", note: "" },
  { word: "lape", definition: "sleep, rest", etymology: "dutch slapen meaning sleep", note: "" },
  { word: "la", definition: "between adverb or phrase of context and rest of sentence", etymology: "", note: "" },
  { word: "mun", definition: "moon", etymology: "english moon", note: "" },
  { word: "pini", definition: "end, finish", etymology: "english finish or esperanto finito", note: "" },
  { word: "suwi", definition: "sweet, candy", etymology: "english sweet", note: "" },
  { word: "walo", definition: "white or light colored", etymology: "Finnish valo meaning light", note: "" },
  { word: "kasi", definition: "plant, herb, tree, leaf, wood", etymology: "finish kasvi meaning plant", note: "" },
  { word: "esun", definition: "market, shop", etymology: "", note: "" },
  { word: "pan", definition: "grain, cereal", etymology: "latin for bread", note: "" },
  { word: "pi", definition: "of, belonging to", etymology: "welsh pi-au meaning to own", note: "" },
  { word: "alasa", definition: "to gather, to collect food, to hunt", etymology: "", note: "" },
  { word: "kipisi", definition: "to cut", etymology: "swahili kipisi meaning little piece of wood", note: "" },
  { word: "namako", definition: "extra, additional, spice", etymology: "", note: "" },
  { word: "pimeja", definition: "black or dark-colored", etymology: "", note: "" },
  { word: "e", definition: "introduces a direct objects", etymology: "", note: "" },
  { word: "awen", definition: "stay, wait, keep, stationary, permanent", etymology: "", note: "" },
  { word: "kule", definition: "color, paint", etymology: "", note: "" },
  { word: "jan", definition: "person, human, people, anybody, somebody, being", etymology: "", note: "" },
  { word: "poka", definition: "next to, in the accompaniment of", etymology: "", note: "" },
  { word: "kule", definition: "color, paint", etymology: "", note: "" },
  { word: "poka", definition: "next to, in the accompaniment of", etymology: "", note: "" },
  { word: "kute", definition: "listen, hear, ear", etymology: "", note: "" },
  { word: "jelo", definition: "yellow", etymology: "", note: "" },
  { word: "kulupu", definition: "group, community, people, public", etymology: "", note: "" },
  { word: "linja", definition: "line, rope, string, hair, chord, chain", etymology: "", note: "" },
  { word: "meli", definition: "female", etymology: "", note: "" },
  { word: "sitelen", definition: "picture, draw, write", etymology: "", note: "" },
  { word: "", definition: "", etymology: "", note: "" },
  { word: "", definition: "", etymology: "", note: "" },
  { word: "", definition: "", etymology: "", note: "" },
  { word: "", definition: "", etymology: "", note: "" },
]

const phrases = [
  { phrase: "mi moku", meaning: "I eat" },
  { phrase: "sina pona", meaning: "You fix" },
  { phrase: "telo li pona", meaning: "Water is cleaning" },
  { phrase: "suno li suno", meaning: "The sun is shining" },
  { phrase: "moku li pona", meaning: "The food is good" },
  { phrase: "mi moku e kili", meaning: "I eat fruit" },
  { phrase: "ona li lukin e pipi", meaning: "He's watching the bug" },
  { phrase: "ona li pona e ilo", meaning: "She's fixing the machine" },
  { phrase: "mi pona e ijo", meaning: "I'm fixing something" },
  { phrase: "mi wile lukin e ma", meaning: "I want to see the countryside" },
  { phrase: "mi wile pakala e sina", meaning: "I must destry you" },
  { phrase: "ona li wile jo e ilo", meaning: "He woud like to have a tool" },
  { phrase: "mi moku li pakala", meaning: "I eat and destroy" },
  { phrase: "mi moku e kili e telo", meaning: "I eat/drink fruit and water" },
  { phrase: "mi wile lukin e ma e suno", meaning: "I want to see the land and the sun" },
  { phrase: "jan pona", meaning: "friend" },
  { phrase: "jan pakala", meaning: "injured person, victim, etc" },
  { phrase: "ilo moku", meaning: "eating utensil" },
  { phrase: "jan utala", meaning: "soldier" },
  { phrase: "jan utala nasa", meaning: "stupid soldier" },
  { phrase: "jan nasa utala", meaning: "fighting fool" },
  { phrase: "jan utala nasa mute", meaning: "many stupid soldiers" },
  { phrase: "jan utala nasa ni", meaning: "this stupid soldier" },
  { phrase: "ike lukin", meaning: "ugly" },
  { phrase: "pona lukin", meaning: "pretty, attractive" },
  { phrase: "jan ni li pona lukin", meaning: "That person is pretty" },
  { phrase: "jan ike", meaning: "enemy" },
  { phrase: "jan lawa", meaning: "leader" },
  { phrase: "jan lili", meaning: "child" },
  { phrase: "jan sewi", meaning: "saint, God" },
  { phrase: "jan suli", meaning: "adult" },
  { phrase: "jan unpa", meaning: "lover, prostitute" },
  { phrase: "ma telo", meaning: "mud, swamp" },
  { phrase: "ma tomo", meaning: "city, town" },
  { phrase: "mi mute", meaning: "we, us" },
  { phrase: "ona mute", meaning: "they, them" },
  { phrase: "telo nasa", meaning: "alchohol, beer, wine" },
  { phrase: "tomo telo", meaning: "restroom" },
  { phrase: "ilo suno", meaning: "flashlight" },
  { phrase: "tomo pona mi", meaning: "my nice house" },
  { phrase: "ma sina", meaning: "Your country" },
  { phrase: "telo ona", meaning: "his/her/its water" },
  { phrase: "len jan", meaning: "somebody's clothes" },
  { phrase: "seli suno", meaning: "sun's heat" },
  { phrase: "", meaning: "" },
  { phrase: "", meaning: "" },
  { phrase: "", meaning: "" },
  { phrase: "", meaning: "" },
  { phrase: "", meaning: "" },
  { phrase: "", meaning: "" },
]




app.model({
  state: { title: 'Not quite set yet' },
  reducers: {
    update: function (state, data) {
      return { title: data }
    }
  }
})

function mainView(state, prev, send) {
  return html`
    <main>
      <h1>Title: ${state.title}</h1>
      <input type="text" oninput=${update}>
    </main>
  `

  function update(e) {
    send('update', e.target.value)
  }
}

app.router(['/', mainView])

var tree = app.start()
document.body.appendChild(tree)
