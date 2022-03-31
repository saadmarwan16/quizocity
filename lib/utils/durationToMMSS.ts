const durationToMMSS = (duration: number) => {
  let minutes = Math.floor(duration / 60);
  let seconds = duration - minutes * 60;

  let minuteString = minutes.toString();
  let secondString = seconds.toString();

  if (minutes < 10) {
    minuteString = "0" + minutes;
  }
  if (seconds < 10) {
    secondString = "0" + seconds;
  }

  return minuteString + ":" + secondString;
};

export default durationToMMSS;
