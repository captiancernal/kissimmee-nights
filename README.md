# Kissimmee Nights

A GTA-style top-down browser game set in greater Kissimmee, Florida. Home base is Grand Beach resort on Lake Bryan. The game also has Old Town and its Saturday night car show, the Disney and Universal parks, Strangers and Freaks side missions, and Vartan, the Armenian speed racer.

The parks have rides, food carts, souvenir hats, character meets, wait-time boards, an afternoon parade and nightly fireworks. Seven shift jobs pay real money once per in-game day: churros, margaritas, popcorn, safari guide, two bars and street performing.

Around Kissimmee: six businesses you can buy for daily income, hotels to sleep at, a bowling alley, cinema, dinner joust, gator show, helicopter and plane tours, gas stations with scratch-offs, billboards and bus stops.

Satire: an Annual Pass with Saturday blackouts, virtual queues, peak food pricing, rope drop, influencers, stroller parking, a timeshare preview (with a 1/52nd timeshare you can buy), an Everything Must Go shop, fireworks and boiled peanuts, Florida Man on a mower, endless I-4 construction, Celebration's soap snow, and a car radio with four parody stations.

The resort holds ten mini-games plus the full **BBA beer ball** league: 16 rated players, player cards, specials, house rules, floors and distractions, and **BBA Franchise** mode, with a draft, uniforms, a season, an All-Star Game, the playoffs, records and 21 awards.

All 16 BBA players also live in the world as story characters. Each has their own voiced side mission built around their badge or special. They unlock as the main story moves forward and show up as pink dots on the map. Matt pulls double duty. During the day he's Dr. Matt at Osceola General, and at night he's Crash Out at Heritage Park Arena. Everyone knows they're the same guy. He swears they aren't. You'll never see both at once, but stick around at shift change (or annoy him enough) and you'll catch the costume change, half-done every time. Every player you meet becomes a contact on your **phone**. The phone also has texts, the radio, your properties, the BBA league and save backup.

## Play

- **Online:** the GitHub Pages link for this repo, once Pages is turned on.
- **Offline:** download `index.html` and open it in any browser. Everything is in that one file.

Works on phones (touch) and computers (keyboard). Saves stay in the browser on that device, along with an automatic backup from the previous in-game day. To move a save to another device, go to **Phone → Save backup**: copy a save code or download a `.json` file, then restore it on the other device.

## Layout

| Path | What it is |
| --- | --- |
| `index.html` | The whole game: HTML, CSS and JavaScript in one file |
| `tests/harness.js` | Fake browser for running the game code in Node |
| `tests/*.js` | Simulation tests: bots play the story, mini-games, beer ball, franchise seasons and the wanted level |
| `tools/extract.sh` | Pulls the script out of `index.html` into `tests/g.js` |
| `tools/run-tests.sh` | Extracts, then runs every test |

## Tests

Requires Node 18 or later.

```
tools/run-tests.sh
```

Tests print results instead of asserting, so read the output: look for `errors 0`, `stuck 0` and `IT errors 0`.

## Credits

Player ratings, badges, archetypes, stadiums and award names come from the Beer Ball Association ratings sheet (BBA V4, 2K27). The game reads that data; it never writes back to the sheet.
