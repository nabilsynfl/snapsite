import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ArticlesLists = () => {
  const [articles, setArticles] = useState([]);
  const url = `http://localhost:4000/`;

  useEffect(() => {
    getArticles();
  }, []);

  const getArticles = async () => {
    const response = await axios.get("http://localhost:4000/articles");
    const modifiedArticles = response.data.map((article) => ({
      ...article,
      content: removeHTMLTags(article.content),
    }));
    setArticles(modifiedArticles);
  };


  const deleteArticle = async (articleId, thumbnail) => {
    console.log(articleId)
    console.log(thumbnail)
    const fileName = thumbnail.split('\\').pop();
    await axios.delete(`http://localhost:4000/delete-image/${fileName}`)
    await axios.delete(`http://localhost:4000/articles/${articleId}`)
    getArticles();
  }

  const removeHTMLTags = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent;
  };

  return (
    <div>
      <div>
        <h1 className="title">Article</h1>
        <h2 className="subtitle">List Of Article</h2>
        <Link to={"/articles/add"} className="button is-primary mb-2">Add New</Link>
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Title</th>
              <th>Content</th>
              <th>Created By</th>
              <th>Thumbnails</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article, index) => (
              <tr key={article.uuid}>
                <td>{index + 1}</td>
                <td>{article.title}</td>
                <td>{article.content.length > 10 ? article.content.substring(0, 10) + "...." : article.content}</td>
                <td>{article.user.name}</td>
                <td><img width="50" height="50" src={url + article.thumbnail} alt="thumbnail" /></td>
                <td>
                  <Link to={`/articles/edit/${article.uuid}`} className="button is-small is-info mr-4">Edit</Link>
                  <button onClick={(() => deleteArticle(article.uuid, article.thumbnail))} className="button is-small is-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ArticlesLists;
