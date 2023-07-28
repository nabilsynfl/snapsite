import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
  ],
};

const FormAddArticles = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);

    // Membuat URL objek dari file yang dipilih
    const previewURL = URL.createObjectURL(e.target.files[0]);
    setPreviewImage(previewURL);
  };

  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, []);

  const handleCancel = () => {
    navigate("/articles");
  }

  const saveArticles = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      const uploadResponse = await axios.post(
        "http://localhost:4000/upload",
        formData
      );
      const thumbnailUrl = uploadResponse.data.url;
      console.log(thumbnailUrl)
      await axios.post("http://localhost:4000/articles", {
        title: title,
        content: content,
        thumbnail: thumbnailUrl,
      });
      navigate("/articles");
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.serverMessage);
      }
    }
  };

  return (
    <div>
      <div>
        <h1 className="title">Articles</h1>
        <h2 className="subtitle">Add New Articles</h2>
        <div className="card is-shadowless">
          <div className="card-content">
            <div className="content">
              <form onSubmit={saveArticles} encType="multipart/form-data">
                <p className="has-text-centered">{message}</p>
                <div className="field">
                  <label className="label">Title</label>
                  <div className="control">
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="input"
                      placeholder="Title"
                    />
                  </div>
                </div>
                {previewImage && <img src={previewImage} alt="Preview" width="300" />}
                <div className="field">
                  <label className="label">Upload</label>
                  <div className="control">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="input"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Content</label>
                  <div className="control">
                    <ReactQuill
                      theme="snow"
                      value={content}
                      onChange={setContent}
                      modules={modules}
                      style={{ height: 500 }}
                    />
                  </div>
                </div>
                <div className="field mt-6">
                  <div className="control">
                    <button type="submit" onClick={handleCancel} className="button is-danger mr-4">
                      Cancel
                    </button>
                    <button type="submit" className="button is-success">
                      Save
                    </button>
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

export default FormAddArticles;
