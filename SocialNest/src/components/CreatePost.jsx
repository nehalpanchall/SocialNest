import { useEffect, useState } from 'react';
import '../index.css';
import { usePostContext } from './context/postContext';

const CreatePost = () => {
  // let { createPost, updateItem } = useContext(contextObject);
  let { createPost, updateItem } = usePostContext();

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  useEffect(() => {
    if (updateItem) {
      setTitle(updateItem.title);
      setDesc(updateItem.description);
    }
  }, [updateItem]);

  return (
    <>
      <div className="post-container">
        <form className="form-post">
          <div className="mb-3 ">
            <label className="form-label">Post Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="form-control input-width"
              aria-describedby="emailHelp"
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

          <button
            onClick={() => createPost(title, desc, 'home')}
            className="button-submit"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default CreatePost;
