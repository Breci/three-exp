/**
 * Created by bculas on 28/10/2016.
 */

/**
 *
 * AUDIO SETUP
 *
 */
var audioCtx = new AudioContext();
var audioBuffer;
var audioSource;
var analyser = audioCtx.createAnalyser();
var frequencyData = new Uint8Array(analyser.frequencyBinCount);


function loadSound(url) {
    var request = new XMLHttpRequest();
    request.open('GET', 'sounds/sound.mp3', true);
    request.responseType = 'arraybuffer';

    // Decode asynchronously
    request.onload = function() {

        audioCtx.decodeAudioData(request.response, function(buffer) {

            // success callback
            audioBuffer = buffer;

            // Create sound from buffer
            audioSource = audioCtx.createBufferSource();
            audioSource.buffer = audioBuffer;

            // connect the audio source to context's output
            audioSource.connect( analyser )
            analyser.connect( audioCtx.destination )

            // play sound
            audioSource.start();

            frame()

        }, function(){

            // error callback
            //
        });
    }
    request.send();
}
function frame() {

    analyser.getByteFrequencyData(frequencyData);

}
