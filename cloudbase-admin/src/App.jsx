import React, { useState, useEffect } from "react";
import Footer from "./footer";
import Header from "./header";
import { detectAudioDuration } from "./util";
import { add } from "./api";

const onAudioFileSelectedHandlerFactor = (callback) => {
  return (e) => {
    const file = e.target.files[0];
    if (file) {
      detectAudioDuration(file, (duration) => {
        callback && callback(file, duration);
      });
    }
  };
};

const initAudio = {
  english: {},
  chinese: {},
};

function App() {
  const [isDisabledSubmit, setIsDisabledSubmit] = useState(false);
  const [audio, setAudio] = useState(initAudio);

  const onSubmit = (e) => {
    e.preventDefault();
    // setIsDisabledSubmit(true);
    const formData = new FormData();

    formData.append("en_text", audio.english.text);
    formData.append("en_file", audio.english.file);
    formData.append("en_duration", audio.english.duration);

    formData.append("zh_text", audio.chinese.text);
    formData.append("zh_file", audio.chinese.file);
    formData.append("zh_duration", audio.chinese.duration);

    add(formData, (res) => {
      console.log(res);
    });
  };

  const onEnAudioSelected = onAudioFileSelectedHandlerFactor(
    (file, duration) => {
      audio.english.file = file;
      audio.english.duration = duration;
      setAudio(audio);
    }
  );

  const onZhAudioSelected = onAudioFileSelectedHandlerFactor(
    (file, duration) => {
      audio.chinese.file = file;
      audio.chinese.duration = duration;
      setAudio(audio);
    }
  );

  return (
    <div className="container">
      <main>
        <Header />

        <form className="row g-5" onSubmit={onSubmit}>
          <div className="col-md-12 col-lg-12">
            <h4 className="mb-3">火箭发射器</h4>
            <div className="row g-3">
              <div className="col-6">
                <label htmlFor="firstName" className="form-label">
                  英文
                </label>
                <input
                  type="text"
                  className="form-control"
                  required
                  onChange={(e) => {
                    audio.english.text = e.target.value;
                    setAudio(audio);
                  }}
                />
              </div>

              <div className="col-6">
                <label htmlFor="firstName" className="form-label">
                  中文
                </label>
                <input
                  type="text"
                  className="form-control"
                  required
                  onChange={(e) => {
                    audio.chinese.text = e.target.value;
                    setAudio(audio);
                  }}
                />
              </div>

              <div className="col-6">
                <div className="row">
                  <div className="col-8">
                    <label htmlFor="lastName" className="form-label">
                      英文音频
                    </label>
                    <input
                      type="file"
                      accept="audio/*"
                      className="form-control"
                      required
                      onChange={onEnAudioSelected}
                    />
                  </div>
                  <div className="col-4">
                    <label htmlFor="lastName" className="form-label">
                      英时长
                    </label>
                    {audio.english.duration && (
                      <input
                        type="number"
                        className="form-control"
                        required
                        readOnly="readonly"
                        value={audio.english.duration.toFixed(1)}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="col-6">
                <div className="row">
                  <div className="col-8">
                    <label htmlFor="lastName" className="form-label">
                      中文音频
                    </label>
                    <input
                      type="file"
                      accept="audio/*"
                      className="form-control"
                      required
                      onChange={onZhAudioSelected}
                    />
                  </div>
                  <div className="col-4">
                    <label htmlFor="lastName" className="form-label">
                      中时长
                    </label>
                    {audio.chinese.duration && (
                      <input
                        type="number"
                        className="form-control"
                        required
                        readOnly="readonly"
                        value={audio.chinese.duration.toFixed(1)}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="col-12">
                <hr className="my-4" />
                <button
                  className="w-100 btn btn-primary btn-lg"
                  type="submit"
                  disabled={isDisabledSubmit}
                >
                  发射
                </button>
              </div>
            </div>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}

export default App;
