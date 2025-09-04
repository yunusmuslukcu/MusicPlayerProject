const music = document.querySelector("audio");
const image = document.querySelector("img");
const playButton = document.getElementById("play");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const title = document.getElementById("title");
const creator = document.getElementById("creator");
const progressDiv = document.getElementById("progressDiv");
const progress = document.getElementById("progress");
const currentTimeSpan = document.getElementById("currentTime");
const totalTimeSpan = document.getElementById("totalTime");

let songIndex = 0;

const songs = [
  {
    name: "Emi",
    title: "Emi",
    creator: "Rubato-Sancak",
  },
  {
    name: "Kurtulmak",
    title: "Kurtulmak",
    creator: "Ahiyan",
  },
  {
    name: "Zor Bela",
    title: "Zor Bela",
    creator: "Serkan Kaya",
  },
];

let isPlaying = false;

function loadSong(song) {
  title.textContent = song.title;
  creator.textContent = song.creator;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}
loadSong(songs[songIndex]);

function playSong() {
  isPlaying = true;
  playButton.classList.replace("fa-play", "fa-pause");
  music.play();
}
function pauseSong() {
  isPlaying = false;
  playButton.classList.replace("fa-pause", "fa-play");
  music.pause();
}

function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  } else {
  }
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  } else {
  }
  loadSong(songs[songIndex]);
  playSong();
}
function updateProgressBar(e) {
  if (isPlaying) {
    const { currentTime, duration } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const durationMinutes = Math.floor(duration / 60);

    let durationSeconds = Math.floor(duration % 60);

    if (durationSeconds < 10) {
      durationMinutes = `0${durationSeconds}`;
    }
    if (durationSeconds) {
      totalTimeSpan.textContent = `${durationMinutes}:${durationSeconds}`;
    }

    const currentMinutes = Math.floor(currentTime / 60);

    let currentSeconds = Math.floor(currentTime % 60);

    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    if (currentSeconds) {
      currentTimeSpan.textContent = `${currentMinutes}:${currentSeconds}`;
    }
  }
}

function setProgressBar(e) {
  const width = e.srcElement.clientWidth;

  const { duration } = music;

  const clickX = e.offsetX;
  music.currentTime = (clickX / width) * duration;
}

playButton.addEventListener("click", () =>
  isPlaying ? pauseSong() : playSong()
);

prevButton.addEventListener("click", prevSong);
nextButton.addEventListener("click", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressDiv.addEventListener("click", setProgressBar);
music.addEventListener("ended", nextSong);
