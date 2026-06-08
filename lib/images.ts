// Locally-hosted imagery (in /public/img) so the site never depends on a
// third-party image host at runtime — no rate limits, always loads, fast.
// Source: curated open/free Indian-context photos (Indian rappers, street
// portraits, Indian festival/concert crowds). Swap the files in /public/img
// for your own event photos when you have them (keep the same filenames).
// Bump V whenever the image files in /public/img are replaced — it busts any
// stale browser / optimizer cache so the new images load immediately.
const V = "2";
const local = (name: string) => `/img/${name}.jpg?v=${V}`;

export const IMAGES = {
  // Crowds / concerts / energy (Indian festivals + shows)
  heroCrowd: local("heroCrowd"), // golden-smoke night crowd
  concertSmoke: local("concertSmoke"), // Holi pink crowd
  crowdLights: local("crowdLights"), // dusk event crowd
  festivalCrowd: local("festivalCrowd"), // colourful Indian crowd
  concertWide: local("concertWide"), // aerial mega crowd
  concertHands: local("concertHands"), // hands up at a show
  djSet: local("djSet"), // Indian concert stage (Diwali lights)
  speakerAmp: local("speakerAmp"), // vibrant crowd
  turntable: local("turntable"), // outdoor event crowd
  stageLights: local("stageLights"), // performer in spotlight (hero)

  // Indian rapper / street portraits
  emceeMic: local("emceeMic"), // rapper, yellow hoodie
  rapperCrowd: local("rapperCrowd"), // rapper gesturing, cap
  rapperPortrait: local("rapperPortrait"), // teal jacket portrait
  micCloseup: local("micCloseup"), // moody cap portrait
  micStage: local("micStage"), // printed shirt, street
  graffiti: local("graffiti"), // "99" jersey, street
  djHands: local("djHands"), // red fit, red car
  vinyl: local("vinyl"), // tattooed, edgy
  speaker: local("speaker"), // white hoodie street style
  graffitiWall: local("graffitiWall"), // moody b&w portrait
  studioMic: local("studioMic"), // festival colour crowd
} as const;
