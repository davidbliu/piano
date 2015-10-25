console.log('hi from midi-piano');
console.log('piano keys range from 21 to 108'); 

keyNumbers = [1,3,4,6,8,9,11,13,15,16,18].map(function(i){return i+20});
keyTexts = ['a', 's', 'd', 'f', 'g', 'h','j','k','l',';','\''];
keyMap = {};
for(var i=0;i<keyTexts.length;i++){
  keyMap[keyTexts[i]] = keyNumbers[i];
}
function activateKeyboard(){
  $(document).keypress(function(e){
    console.log(e.keyCode);
    console.log(String.fromCharCode(e.keyCode));
    key = String.fromCharCode(e.keyCode);
    if(Object.keys(keyMap).indexOf(key)!=-1){
      playSound(0, keyMap[key], 127);
    }
  });
} 

function playSong(){
  console.log('playing song');
  delay = 0;
  for(var i=10;i<100;i++){
    console.log('play key '+i.toString()+' at delay of '+delay.toString());
    playSound(delay, i, 127);
    delay += 0.05;
  }
  for(var i=100;i>10;i--){
    playSound(delay,i,127);
    delay+=0.05;
  }
}
function playSound(delay, note, velocity){
    console.log('playing sound '+note.toString());
    MIDI.setVolume(0,127);
    MIDI.noteOn(0,note,velocity,delay);
    MIDI.noteOff(0,note,delay+0.75);
}
function drawKeyboard(){
  keys = ['a','s','d','f','g','h','j','k','l',';'];
  for(var i=0;i<keys.length;i++){
    key = document.createElement('div');
    $(key).addClass('key');
    $(key).text(keys[i]);
    $('#piano').append(key);
  }

}
function activateSoundButton(){
  
    $('#play-btn').click(function(){
      tone = prompt('what sound?', '');
      if (tone != null){
        console.log(parseInt(tone));
        tone = parseInt(tone);
        playSound(0,tone,127);
      }
    });
}
function keypressActions(){
  $('.key').click(function(){
    playSound(0,50,127);
  });
}
$(document).ready(function(){
  activateKeyboard();
  drawKeyboard();
  keypressActions();
  activateSoundButton();
});
      
window.onload=function(){
MIDI.loadPlugin(
{
soundfontUrl:"./soundfont/",
instrument:"acoustic_grand_piano",
onprogress:function(state,progress){
  console.log(state,progress);
},
onsuccess:function(){
  console.log('done wit dis shit');
  //playSong();
  }
});// end of MIDI.loadPlugin
//end of window.onload
};
