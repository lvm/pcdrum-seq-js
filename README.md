# PC Drum - Sequencer

Module for `PC Drum`.

## Install

```bash
npm install pcdrum-seq
```

## Usage

```js
var seq = require('pcdrum-seq'),
    kick = require('pcdrum-kick'),
    snare = require('pcdrum-snare'),
    e = require('bjork'),
    context = new AudioContext(),
    bd = kick(context),
    sn = snare(context),
    s
    ;

s = new seq(120, 16);
s.attach({bd: bd, sn: sn});
s.pattern({bd: e(4,16), sn: e(2,16)});
s.start();
```

## License

See [LICENSE](LICENSE)
