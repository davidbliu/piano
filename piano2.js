var records = [];
var minTimestamp = Date.now();
var layers = [];

function recordKeystroke(soundFile, records){
  timestamp = Date.now()-minTimestamp;
  records.push({'soundFile':soundFile,'timestamp':timestamp});
  console.log('recorded keystroke '+key+' at '+timestamp.toString());
}

function playback(layers){
  flattened = [];
  for(var i=0;i<layers.length;i++){
    for(var j=0;j<layers[i].length;j++){
      flattened.push(layers[i][j]);
    }
  }
  console.log(flattened);
  console.log('that was flattened');
  for(var i=0;i<flattened.length;i++){
    playSound(flattened[i].key, flattened[i].timestamp);
  }
}
function recordActions(){
  $('#record-btn').click(function(){
    console.log('recording records');
    $('#messages').text('recording...');
    records.length = 0;
    minTimestamp = Date.now();
    playback(layers);
  });
}
function playbackActions(){
  $('#playback-btn').click(function(){
    console.log("playback clicked");
    playback(layers);
  });
}
function createLayersList(){
  $('#layers-list').html('');
  for(var i=0;i<layers.length;i++){
    li = document.createElement('li');
    $(li).addClass('layer-li');
    $(li).text('layer '+i.toString()+' ('+layers[i].length.toString()+' notes)');
    $(li).attr('id', 'layer-'+i.toString());
    $('#layers-list').append(li);
  }
  deleteLayerActions();
}
function deleteLayerActions(){
  $('.layer-li').click(function(){
    index = $(this).attr('id').split('-')[1].toString();
    console.log('deleting '+index.toString());
    layers.splice(index, 1);
    $(this).remove();
  });
}
function saveActions(){
  $('#save-btn').click(function(){
    $('#messages').text('');
    console.log('saving records');
    console.log(records);
    layers.push(records.slice());
    createLayersList();
    console.log(layers);
    records.length = 0;
  });
}

function playSong(){
  notes = ["G5", "E5", "E5", "F5", "D5", "D5", "C5", "D5", "E5", "F5", "G5", "G5", "G5", "G5", "E5", "E5", "F5", "D5", "D5", "C5", "E5", "G5", "G5", "C5"];
  delays = [1, 2, 3, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 17, 18, 19, 21, 22, 23, 25, 26, 27, 28, 29].map(function(x){ return x+5});
  timeFactor = 350; 
  for(var i=0;i<notes.length;i++){
    playSound(notes[i], delays[i]*timeFactor);
  }
  //drum each beat
  for(var i=1;i<40;i++){
    if(i%2!=0){
      playSound('10', i*timeFactor);
      playSound('13', i*timeFactor);
    }
    playSound('9', i*timeFactor+timeFactor/2);
    playSound('2', i*timeFactor);
    //clap every 4 beats
    if(i%2==0){
      playSound('6', i*timeFactor);
    }
    if(i%4==0){
      playSound('6', i*timeFactor+100);
    }
  }
}
function drawKeyboard(){
  //draw keyboard using keys in the mapping
  keys = Object.keys(keyMap);
  for(var i=0;i<keys.length;i++){
    key = keys[i];
    div = document.createElement('div');
    $(div).addClass('key');
    $(div).attr('id', key);
    $(div).text(key);
    $('#piano-div').append(div);
  }
}
function animateKey(key){
  $('#'+key).fadeOut(50).fadeIn(50);
}

function playSound(soundFile, delay){
  try{
    var sound = new Audio(soundFile);
    setTimeout(function(){
      sound.play();
      animateKey(key);
    }, delay);
  }catch(err){
    console.log(err.message);
  }
}
function activateKeyboard(){
  $(document).keypress(function(e){
    key = String.fromCharCode(e.keyCode);
    if(Object.keys(keyMap).indexOf(key)!=-1){
      soundFile = keyMap[key];
      //showRandomImage();
      playSound(soundFile, 0);
      recordKeystroke(soundFile, records);
    }
  });
}
function activateSongButton(){
  $('#song-btn').click(function(){
    playSong();
  });
}
function showRandomImage(){
 images = [];
  images.push('https://scontent.fsnc1-1.fna.fbcdn.net/hphotos-xtf1/t31.0-8/12030465_10153274450151491_3396779585048093138_o.jpg');
  images.push('https://scontent.fsnc1-1.fna.fbcdn.net/hphotos-xpf1/t31.0-8/12182790_10153274450126491_5440527320823729810_o.jpg');
  images.push('https://scontent.fsnc1-1.fna.fbcdn.net/hphotos-xtp1/t31.0-8/12182887_10153274449991491_553158657372515922_o.jpg');
  images.push('https://scontent.fsnc1-1.fna.fbcdn.net/hphotos-xpf1/t31.0-8/12185202_10153274449906491_3225495742505052429_o.jpg');
  img_url = images[Math.floor(Math.random()*images.length)];
  $('#center-img').attr('src', img_url);
  $('#image-div').fadeIn(75).fadeOut(75);
}
$(document).ready(function(){
  activateKeyboard();
  drawKeyboard();
  activateSongButton();
  playbackActions();
  recordActions();
  saveActions();
  deleteLayerActions();
});








