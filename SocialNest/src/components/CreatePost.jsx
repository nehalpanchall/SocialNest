import { useEffect, useState } from 'react';
import '../index.css';
import { usePostContext } from './context/postContext';
import { useNavigate } from 'react-router-dom';
import { addAPI } from './axios/axiosService';

const CreatePost = () => {
  // let { createPost, updateItem } = useContext(contextObject);
  let { createPost, updateItem, setError } = usePostContext();

  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [tags, setTags] = useState('');

  const postAPI = async (e) => {
    e.preventDefault();

    try {
      const postObj = {
        userId: 6,
        title: title,
        body: desc,
        tags: tags,
      };

      setError(false);
      let res = await addAPI(postObj);
      createPost(res.data, 'home');
    } catch (error) {
      setError(true);
    }

    // const ADD_URL = 'https://dummyjson.com/posts/add';

    // let promiseX = fetch(ADD_URL, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     userId: 6,
    //     title: title,
    //     body: desc,
    //     tags: tags,
    //   }),
    // });
    // promiseX.then((res) => res.json()).then((data) => createPost(data, 'home'));

    setTitle('');
    setDesc('');
    setTags('');
    navigate('/');
  };

  useEffect(() => {
    if (updateItem) {
      setTitle(updateItem.title);
      setDesc(updateItem.description);
      setTags(updateItem.tags.join(', '));
    }
  }, [updateItem]);

  return (
    <>
      <div className="post-container">
        <form className="form-post" onSubmit={postAPI}>
          <div className="mb-3 ">
            <label className="form-label">Post Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="form-control input-width"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Post Description</label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows="4"
              cols="50"
              className="form-control input-width textarea"
            />
          </div>
          <label className="form-label">Tags</label>
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            type="text"
            placeholder="Travel, Food, Explore, etc.."
            className="form-control input-width"
          />

          <button className="button-submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default CreatePost;
