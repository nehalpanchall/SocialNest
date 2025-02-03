import { useEffect, useState } from 'react';
import '../index.css';
import { usePostContext } from './context/postContext';

const CreatePost = () => {
  // let { createPost, updateItem } = useContext(contextObject);
  let { createPost, updateItem } = usePostContext();

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [tags, setTags] = useState('');

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
        <form className="form-post">
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

          <button
            onClick={() => createPost(title, desc, tags, 'home')}
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
