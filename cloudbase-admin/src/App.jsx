import React, { useState, useEffect } from "react";
import Footer from "./footer";
import Header from "./header";
import sdk from "@cloudbase/js-sdk";

function App() {
  const [cloudbase, setCloudbase] = useState();
  const [isDisabledSubmit, setIsDisabledSubmit] = useState(false);
  const [audio, setAudio] = useState(undefined);

  const onSubmit = (e) => {
    e.preventDefault();
    setIsDisabledSubmit(true);

    const db = cloudbase.database();
    db.collection("audios")
      .orderBy("id", "desc")
      .limit(1)
      .get()
      .then((res) => {
        console.log(cloudbase, res);
      });
  };

  useEffect(() => {
    const base = sdk.init({
      env: "default-5gswefsf8440cf4a",
    });
    setCloudbase(base);
  }, []);

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
                  onChange={(e) =>
                    setAudio({ ...audio, english: { text: e.target.value } })
                  }
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
                  onChange={(e) =>
                    setAudio({ ...audio, chinese: { text: e.target.value } })
                  }
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
                    />
                  </div>
                  <div className="col-4">
                    <label htmlFor="lastName" className="form-label">
                      英时长
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      onChange={(e) =>
                        setAudio({
                          ...audio,
                          english: { time: e.target.value },
                        })
                      }
                    />
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
                    />
                  </div>
                  <div className="col-4">
                    <label htmlFor="lastName" className="form-label">
                      中时长
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      required
                      onChange={(e) =>
                        setAudio({
                          ...audio,
                          chinese: { time: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="row">
                  <div className="col-12">
                    <label htmlFor="lastName" className="form-label">
                      ID
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="不填写 ID 将会自动递增"
                      required
                      onChange={(e) =>
                        setAudio({
                          ...audio,
                          id: parseInt(e.target.value, 10),
                        })
                      }
                    />
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
