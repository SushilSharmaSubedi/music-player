let now_playing = document.querySelector(".now-playing"); // Selects the element displaying the current track info
let track_art = document.querySelector(".track-art"); // Selects the element for the track's artwork
let track_name = document.querySelector(".track-name"); // Selects the element for the track's name
let track_artist = document.querySelector(".track-artist"); // Selects the element for the track's artist

let playpause_btn = document.querySelector(".playpause-track"); // Selects the play/pause button
let next_btn = document.querySelector(".next-track"); // Selects the next track button
let prev_btn = document.querySelector(".prev-track"); // Selects the previous track button

let seek_slider = document.querySelector(".seek_slider"); // Selects the seek slider element
let volume_slider = document.querySelector(".volume_slider"); // Selects the volume slider element
let curr_time = document.querySelector(".current-time"); // Selects the element displaying the current time of the track
let total_duration = document.querySelector(".total-duration"); // Selects the element displaying the total duration of the track
let wave = document.getElementById("wave"); // Selects the wave animation element
let randomIcon = document.querySelector(".fa-random"); // Selects the random/shuffle icon
let curr_track = document.createElement("audio"); // Creates a new audio element

let track_index = 0; // Initializes the track index to 0
let isPlaying = false; // Initializes the playing state to false
let isRandom = false; // Initializes the random state to false
let updateTimer; // Variable to store the interval timer
let previousVolume = 1; // Stores the previous volume level

const music_list = [
  {
    img: "./assets/images/comingBackToLife.jpg",
    name: "Coming Back To Life",
    artist: "Pink Floyd",
    music: "./assets/music/comingBackToLife.mp3",
  },
  {
    img: "./assets/images/linkin-park.png",
    name: "One More Light",
    artist: "Linkin Park",
    music: "./assets/music/oneMoreLight.mp3",
  },
  {
    img: "./assets/images/SOYCD.webp",
    name: "Shine On You",
    artist: "Pink Floyd",
    music: "./assets/music/shineOnYouCrazyDiamond.mp3",
  },
  {
    img: "./assets/images/nightWeMet.webp",
    name: "Night We Met",
    artist: "Lord Huron",
    music: "./assets/music/nightWeMet.mp3",
  },
  {
    img: "./assets/images/pbm.gif",
    name: "Lori",
    artist: "Pahelo Batti Muni",
    music: "./assets/music/lori.mp3",
  },
  {
    img: "./assets/images/pbm.gif",
    name: "Gauthali",
    artist: "Pahelo Batti Muni",
    music: "./assets/music/gauthali.mp3",
  },
  {
    img: "./assets/images/YOTBM.jpg",
    name: "Year Of The Blood Moon",
    artist: "Pahelo Batti Muni",
    music: "./assets/music/yearOfTheBloodMoon.mp3",
  },
];

loadTrack(track_index); // Loads the initial track

function loadTrack(track_index) {
  clearInterval(updateTimer); // Clears the update timer
  reset(); // Resets the track details

  curr_track.src = music_list[track_index].music; // Sets the audio source to the current track
  curr_track.load(); // Loads the audio track

  track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")"; // Sets the track artwork
  track_name.textContent = music_list[track_index].name; // Sets the track name
  track_artist.textContent = music_list[track_index].artist; // Sets the track artist
  now_playing.textContent =
    "Playing music " + (track_index + 1) + " of " + music_list.length; // Updates the now playing text

  updateTimer = setInterval(setUpdate, 1000); // Sets an interval to update the track time

  curr_track.addEventListener("ended", nextTrack); // Adds an event listener to play the next track when the current one ends
  random_bg_color(); // Changes the background color randomly
}

function random_bg_color() {
  let hex = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
  ]; // Array of hex digits
  let a;

  function populate(a) {
    for (let i = 0; i < 6; i++) {
      // Generates a random hex color
      let x = Math.round(Math.random() * 14);
      let y = hex[x];
      a += y;
    }
    return a;
  }
  let Color1 = populate("#"); // Generates the first color
  let Color2 = populate("#"); // Generates the second color
  var angle = "to bottom"; // Sets the gradient angle

  let gradient =
    "linear-gradient(" + angle + "," + Color1 + ", " + Color2 + ")"; // Creates a linear gradient
  document.body.style.background = gradient; // Applies the gradient to the body background
}

function reset() {
  curr_time.textContent = "00:00"; // Resets the current time display
  total_duration.textContent = "00:00"; // Resets the total duration display
  seek_slider.value = 0; // Resets the seek slider
}

function randomTrack() {
  isRandom ? pauseRandom() : playRandom(); // Toggles random play mode
  randomIcon.classList.toggle("shuffleActive"); // Toggles the shuffle icon state
}

function playRandom() {
  let randomIcon = document.querySelector(".icon-shuffle"); // Selects the shuffle icon
  randomIcon.classList.add("shuffleActive"); // Activates the shuffle icon
  isRandom = true; // Sets random mode to true
}

function pauseRandom() {
  isRandom = false; // Sets random mode to false
  let randomIcon = document.querySelector(".icon-shuffle"); // Selects the shuffle icon
  randomIcon.classList.remove("shuffleActive"); // Deactivates the shuffle icon
}

function repeatTrack() {
  let repeatIcon = document.querySelector(".icon-loop"); // Selects the repeat icon
  repeatIcon.classList.toggle("repeatActive"); // Toggles the repeat icon state
  loadTrack(track_index); // Reloads the current track
  playTrack(); // Plays the track
}

function playpauseTrack() {
  isPlaying ? pauseTrack() : playTrack(); // Toggles play/pause state
}

function playTrack() {
  curr_track.play(); // Plays the current track
  isPlaying = true; // Sets playing state to true
  track_art.classList.add("rotate"); // Adds rotation to the track art
  wave.classList.add("loader"); // Activates the wave animation
  playpause_btn.innerHTML = '<i class="icon-pause"></i>'; // Changes the button icon to pause
}

function pauseTrack() {
  curr_track.pause(); // Pauses the current track
  isPlaying = false; // Sets playing state to false
  track_art.classList.remove("rotate"); // Removes rotation from the track art
  wave.classList.remove("loader"); // Deactivates the wave animation
  playpause_btn.innerHTML = '<i class="icon-play"></i>'; // Changes the button icon to play
}

function nextTrack() {
  if (track_index < music_list.length - 1 && isRandom === false) {
    track_index += 1; // Moves to the next track
  } else if (track_index < music_list.length - 1 && isRandom === true) {
    let random_index = Number.parseInt(Math.random() * music_list.length); // Selects a random track
    track_index = random_index;
  } else {
    track_index = 0; // Resets to the first track
  }
  loadTrack(track_index); // Loads the selected track
  playTrack(); // Plays the track
}

function prevTrack() {
  if (track_index > 0) {
    track_index -= 1; // Moves to the previous track
  } else {
    track_index = music_list.length - 1; // Moves to the last track
  }
  loadTrack(track_index); // Loads the selected track
  playTrack(); // Plays the track
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100); // Calculates the new seek position
  curr_track.currentTime = seekto; // Sets the current time to the new position
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100; // Sets the track volume
}

function decreaseVolume() {
  let newVolume = Math.max(0, volume_slider.value - 10); // Decreases the volume by 10
  curr_track.volume = newVolume / 100; // Sets the new volume
  volume_slider.value = newVolume; // Updates the volume slider
}

function increaseVolume() {
  let currentVolume = parseInt(volume_slider.value, 10); // Gets the current volume
  let newVolume = Math.min(100, currentVolume + 10); // Increases the volume by 10
  curr_track.volume = newVolume / 100; // Sets the new volume
  volume_slider.value = newVolume; // Updates the volume slider
}

function mute() {
  if (curr_track.volume > 0) {
    previousVolume = curr_track.volume; // Stores the current volume
    curr_track.volume = 0; // Mutes the track
    volume_slider.value = 0; // Sets the volume slider to 0
    let muteIcon = document.querySelector(".icon-volume-muted"); // Selects the mute icon
    muteIcon.classList.add("muteActive"); // Activates the mute icon
  } else {
    curr_track.volume = previousVolume; // Restores the previous volume
    volume_slider.value = previousVolume * 100; // Updates the volume slider
    let muteIcon = document.querySelector(".icon-volume-muted"); // Selects the mute icon
    muteIcon.classList.remove("muteActive"); // Deactivates the mute icon
  }
}

function setUpdate() {
  let seekPosition = 0;
  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration); // Calculates the seek position
    seek_slider.value = seekPosition; // Updates the seek slider

    let currentMinutes = Math.floor(curr_track.currentTime / 60); // Calculates current minutes
    let currentSeconds = Math.floor(
      curr_track.currentTime - currentMinutes * 60
    ); // Calculates current seconds
    let durationMinutes = Math.floor(curr_track.duration / 60); // Calculates duration minutes
    let durationSeconds = Math.floor(
      curr_track.duration - durationMinutes * 60
    ); // Calculates duration seconds

    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds; // Formats seconds
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds; // Formats seconds
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes; // Formats minutes
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes; // Formats minutes
    }

    curr_time.textContent = currentMinutes + ":" + currentSeconds; // Updates the current time display
    total_duration.textContent = durationMinutes + ":" + durationSeconds; // Updates the total duration display
  }
}
