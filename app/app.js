var soundFile;
var fft;
var filter, filterFreq, filterRes;

var Y_AXIS = 1;
var X_AXIS = 2;
var b1, b2, c1, c2;

function preload() {
  soundFormats( 'mp3', 'ogg' );
  //clearestblue, atlast, r4, artschool, worry, imagine, thelessiknowthebetter
  soundFile = loadSound( 'audio/r4' );
}

function setup() {
    createCanvas(1920, 1280);
    // loop the sound file
    soundFile.loop();

    filter = new p5.LowPass();

    // Disconnect soundfile from master output.
    // Then, connect it to the filter, so that we only hear the filtered sound
    soundFile.disconnect();
    soundFile.connect(filter);
    fft = new p5.FFT();
}

function draw() {
  //Volume bidness
    //var volume = map(mouseY, 0, width, 0, 1);
    //volume = constrain(volume, 0, 1)
    //song.amp(volume);
    //stroke(0);
    //fill(51,100, 44);
    //ellipse(50%,50%,volume, volume)


  background(30);
  // Map mouseX to a the cutoff frequency from the lowest
  // frequency (10Hz) to the highest (22050Hz) that humans can hear
  filterFreq = map ( mouseX, 0, width, 10, 10000 );

  // Map mouseY to resonance (volume boost) at the cutoff frequency
  filterRes = map( mouseY, 0, height, 15, 5 );

  // set filter parameters
  filter.set( filterFreq, filterRes );

  // Draw every value in the FFT spectrum analysis where
  // x = lowest (10Hz) to highest (22050Hz) frequencies,
  // h = energy (amplitude / volume) at that frequency
  var spectrum = fft.analyze();
  noStroke();
    ellipse( ( 30 * 3 ), random( 0,600 ), random( 0,600 ) );
    //   fill( mouseY, mouseX, ( i+random( 50,100 ) ), 256 );

for ( i = -1; i < spectrum.length; i++ ){
  //Normal fun fills.
    var x = map( i, 0, spectrum.length, 0, width );
    var h = -height + map( spectrum[i], 0, 255, height, 0 );
    // rect(x,y,w,h,[tl],[tr],[br],[bl])
    rect( ( 30*i ), height, ( 6* ( width / spectrum.length ) ), h );
      //This selects every second bar
      //if(i%2){
        fill( mouseX, mouseY, ( i + random ( 0,100 ) ),100 );
      //}
  // if ( frameCount % 30 == 0 ){
  //     ellipse( ( ( 0, screen.width) ), random( 0, screen.height ), 100, 100 );
  //       fill( mouseX, mouseY, ( i + random ( 0,100 ) ),100 );
  // }

  }
}

// function setGradient( x, y, w, h, c1, c2, axis ) {
//   noFill();

//   if (axis == Y_AXIS) {  // Top to bottom gradient
//     for ( var i = y; i <= y+h; i++ ) {
//       var inter = map( i, y, y+h, 0, 1 );
//       var c = lerpColor( c1, c2, inter );
//       stroke(c);
//       line( x, i, x + w, i );
//     }
//   }
//   else if (axis == X_AXIS) {  // Left to right gradient
//     for ( var i = x; i <= x+w; i++ ) {
//       var inter = map( i, x, x + w, 0, 1 );
//       var c = lerpColor( c1, c2, inter );
//       stroke(c);
//       line( i, y, i, y + h );
//     }
//   }
// }
