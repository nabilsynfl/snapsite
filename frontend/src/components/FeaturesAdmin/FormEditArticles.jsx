import React from "react";

const FormEditArticles = () => {
  return (
    <div>
      <div>
        <h1 className="title">Articles</h1>
        <h2 className="subtitle">Edit Articles</h2>
        <div className="card is-shadowless">
          <div className="card-content">
            <div className="content">
              <form>
                <div className="field">
                  <label className="label">Title</label>
                  <div className="control">
                    <input type="text" className="input" placeholder="Title" />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Content</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      placeholder="Content"
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <div className="control">
                    <button className="button is-success">Updated</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormEditArticles;
