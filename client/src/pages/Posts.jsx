import React, { useEffect, useState } from "react";
import "./posts.scss";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { Button } from "../common/Button";
import { TextInput, TextArea } from "../common/Inputs";
import { BACKEND_API } from "../environment/Api";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [editPost, setEditPost] = useState({
    mode: false,
    id: "",
    title: "",
    content: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${BACKEND_API}/api/v1/comments`;
    const jsonBody = JSON.stringify({
      title: title,
      content: content,
    });

    const token = JSON.parse(localStorage.getItem("token"));
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const response = await fetch(url, {
        method: "POST",
        body: jsonBody,
        headers: headers,
      });

      const data = await response.json();

      if (response.status === 200) {
        setTitle(data.title);
        setContent(data.content);
      }

      if (title === "" || content === "") {
        alert("Please fill out input fields");
      }

      window.location.reload(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const url = `${BACKEND_API}/api/v1/comments`;

      const token = JSON.parse(localStorage.getItem("token"));
      const headers = { Authorization: `Bearer ${token}` };

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: headers,
        });
        const data = await response.json();

        if (response.status === 200) {
          setPosts(data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchPosts();
  }, []);

  const removePost = async (id) => {
    const url = `${BACKEND_API}/api/v1/comments/${id}`;

    const token = JSON.parse(localStorage.getItem("token"));
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const response = await fetch(url, { method: "DELETE", headers: headers });
      if (response.status === 200) {
        setPosts(posts.filter((com) => com.id !== id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const editComment = async (id, idx) => {
    const url = `${BACKEND_API}/api/v1/comments/${id}`;
    const jsonBody = JSON.stringify({
      title: title,
      content: content,
    });

    const token = JSON.parse(localStorage.getItem("token"));
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const response = await fetch(url, {
        method: "PUT",
        body: jsonBody,
        headers: headers,
      });

      setEditPost({
        mode: true,
        id: posts[idx].id,
        title: posts[idx].title,
        content: posts[idx].content,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setTitle(editPost.title);
    setContent(editPost.content);
  }, [editPost]);

  const exitEditMode = () => {
    setEditPost({
      mode: false,
      id: "",
      title: "",
      content: "",
    });
  };

  const updateEditMode = () => {
    let tempPosts = [...posts];
    tempPosts.forEach((com, idx) => {
      if (editPost.id === com.id) {
        tempPosts[idx].title = title;
        tempPosts[idx].content = content;
      }
    });

    setEditPost({
      mode: false,
      id: "",
      title: "",
      content: "",
    });
  };

  const [visible, setVisible] = useState(true);
  const removeElement = () => {
    setVisible((prev) => !prev);
  };

  return (
    <section className="section__wrapper">
      {!editPost.mode ? (
        <article className="add-comment-form">
          <h2>Add New Post</h2>
          <form onSubmit={handleSubmit}>
            <TextInput
              type="text"
              label="User"
              id="title"
              placeholder="ex. John Doe"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <TextArea
              label="Comment"
              id="content"
              placeholder="ex. Lorem ipsum dolor sit amet"
              onChange={(e) => setContent(e.target.value)}
              value={content}
            />
            <Button onClick={() => removeElement()}>Add post</Button>
          </form>
        </article>
      ) : (
        <article className="add-comment-form">
          <h2>Edit post</h2>
          <form>
            <TextInput
              type="text"
              label="User"
              id="title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <TextArea
              label="Comment"
              id="content"
              onChange={(e) => setContent(e.target.value)}
              value={content}
            />
            <div className="cta">
              <Button onClick={updateEditMode}>Update</Button>
              <Button onClick={exitEditMode}>Cancel</Button>
            </div>
          </form>
        </article>
      )}

      <article className="posts_wrapper">
        <h2>Posts</h2>
        {posts.length === 0 ? (
          <h4>No posts to display</h4>
        ) : (
          posts.map((com, idx) => {
            return (
              <div className="posts__content" key={com.id}>
                <div className="header__content">
                  <h3>{com.title}</h3>
                  <small>{com.createdAt.substring(0, 10)}</small>/
                  <small>{com.createdAt.substring(11, 16)}</small>
                </div>
                <span>
                  <AiOutlineEdit
                    className="icon"
                    onClick={() => {
                      editComment(com.id, idx);
                    }}
                  />
                  <AiOutlineDelete
                    className="icon"
                    onClick={() => {
                      removePost(com.id);
                    }}
                  />
                </span>
                <p>{com.content}</p>
              </div>
            );
          })
        )}
      </article>
    </section>
  );
};

export default Posts;
