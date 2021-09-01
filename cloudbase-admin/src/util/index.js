const activeAudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new activeAudioContext();

export const detectAudioDuration = (file, callback) => {
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);
  reader.onload = (evt) => {
    audioContext.decodeAudioData(evt.target.result, (buffer) => {
      callback && callback(buffer.duration);
    });
  };
};
