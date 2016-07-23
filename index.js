function each(obj, callback, context){
  context = context || this;
  for (var prop in obj){
    if (obj.hasOwnProperty(prop)){
      callback.call(context, obj[prop], prop);
    }
  }
}

function calc_bpm(bpm){
  bpm = bpm || 120;
  return (60 / bpm) * 1000;
}

function seq(bpm, beat){
  this.tracks = {};
  this.playing = false;
  this.interval = calc_bpm(bpm);
  this.beat = 1 / beat;
}

seq.prototype.set_bpm = function(bpm){
  this.interval = calc_bpm(bpm);
}

seq.prototype.set_beat = function(beat){
  this.beat = 1 / beat;
}

seq.prototype.attach = function(instruments){
  each(instruments, function(instrument, label){
    this.tracks[label] = instrument;
  }, this);
}

seq.prototype.pattern = function(patterns){
  each(patterns, function(pat, label){
    this.tracks[label].loop = typeof pat === "string" ? pat.split('') : pat;
    this.tracks[label].tick = 0;
  }, this);
  if( this.playing ) this.start();
}

seq.prototype.start = function(){
  this.playing = true;
  this.next();
}

seq.prototype.next = function(){
  if (!this.playing) return;
  var self = this;
  each(this.tracks, function(track, name){
    var now = track.loop[track.tick];
    if (now){ track.trigger(); }
    if (++track.tick >= track.loop.length){ track.tick = 0; }
  }, this);
  setTimeout(function(){ self.next(); }, this.interval * this.beat * 4);
}

seq.prototype.stop = function(){
  this.playing = false;
}

module.exports = seq;
