import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const FormEditArticles = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

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

  useEffect(() => {
    const getArticlesById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/articles/${id}`
        );
        setTitle(response.data.title);
        setContent(response.data.content);
        setThumbnail(response.data.thumbnail);
      } catch (error) {
        if (error.response) {
          setMessage(error.response.data.serverMessage);
        }
      }
    };
    getArticlesById();
  }, [id]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleCancel = () => {
    navigate("/articles");
  }

  const url = `http://localhost:4000/` + thumbnail;
  console.log(url);

  const updateArticles = async (e) => {
    e.preventDefault();
    try {
      const parts = url.split("\\");
      const filename = parts[parts.length - 1];
      console.log(url);
      axios.delete(`http://localhost:4000/delete-image/${filename}`);

      const formData = new FormData();
      formData.append("file", selectedFile);
      const uploadResponse = await axios.post(
        "http://localhost:4000/upload",
        formData
      );
      const thumbnailUrl = uploadResponse.data.url;
      await axios.patch(`http://localhost:4000/articles/${id}`, {
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
              <form onSubmit={updateArticles} encType="multipart/form-data">
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
                <div className="field">
                  <label className="label">Upload</label>
                  <div className="control">
                    {url && (
                      <img
                        src={url}
                        alt="Uploaded Image"
                        width="300"
                        height="300"
                      />
                    )}
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

export default FormEditArticles;
