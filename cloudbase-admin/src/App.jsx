import React, { useState, useEffect } from "react";
import Footer from "./footer";
import Header from "./header";

function App() {
  const [isDisabledSubmit, setIsDisabledSubmit] = useState(false);

  const onSubmit = () => {
    setIsDisabledSubmit(true);
  };

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
                <input type="text" className="form-control" required />
              </div>

              <div className="col-6">
                <label htmlFor="firstName" className="form-label">
                  中文
                </label>
                <input type="text" className="form-control" required />
              </div>

              <div className="col-6">
                <div className="row">
                  <div className="col-8">
                    <label htmlFor="lastName" className="form-label">
                      英文音频
                    </label>
                    <input type="file" className="form-control" required />
                  </div>
                  <div className="col-4">
                    <label htmlFor="lastName" className="form-label">
                      英时长
                    </label>
                    <input type="text" className="form-control" required />
                  </div>
                </div>
              </div>

              <div className="col-6">
                <div className="row">
                  <div className="col-8">
                    <label htmlFor="lastName" className="form-label">
                      中文音频
                    </label>
                    <input type="file" className="form-control" required />
                  </div>
                  <div className="col-4">
                    <label htmlFor="lastName" className="form-label">
                      中时长
                    </label>
                    <input type="number" className="form-control" required />
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
