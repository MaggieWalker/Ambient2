'use strict';

var tessel = require('tessel');
var ambientlib = require('ambient-attx4');
var path = require('path');
var av = require('tessel-av');
var mp3 = path.join(__dirname, 'DrakeKiki.mp3')
const sound = new av.Player();


var ambient = ambientlib.use(tessel.port['A']);

ambient.on('ready', function () {
  ambient.setSoundTrigger(0.025) // The readings will happen every .5 seconds
 // Get points of light and sound data.
  setInterval( function () {
    ambient.getLightLevel( function(err, lightdata) {
      if (err) throw err;
      ambient.getSoundLevel( function(err, sounddata) {
        if (err) throw err;
        console.log("Light level:", lightdata.toFixed(8), " ", "Sound Level:", sounddata.toFixed(8));
      });
    });
  }, 500);
});
ambient.on('sound-trigger', function(data) {
  console.log('KIKI DO YOU LOVE ME', data)
  
  sound.play(mp3);
sound.on('ended', function(seconds) {
  sound.play();
});
})
ambient.on('error', function (err) {
  console.log(err);
});