const durationToHHMMSS = (duration: number) => {
  let hours = Math.floor(duration / 3600);
  let minutes = Math.floor((duration - hours * 3600) / 60);
  let seconds = duration - hours * 3600 - minutes * 60;

  let hourString = hours.toString();
  let minuteString = minutes.toString();
  let secondString = seconds.toString();

  if (hours < 10) {
    hourString = "0" + hours;
  }
  if (minutes < 10) {
    minuteString = "0" + minutes;
  }
  if (seconds < 10) {
    secondString = "0" + seconds;
  }

  return hourString + ":" + minuteString + ":" + secondString;
};

export default durationToHHMMSS;
