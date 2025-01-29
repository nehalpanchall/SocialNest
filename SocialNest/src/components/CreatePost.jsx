import { useEffect, useState } from 'react';

const CreatePost = ({ createPost, updateItemObj }) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  useEffect(() => {
    if (updateItemObj) {
      setTitle(updateItemObj.title);
      setDesc(updateItemObj.description);
    }
  }, [updateItemObj]);

  return (
    <>
      <div className="post-container">
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
            className="form-control input-width"
          />
        </div>

        <button
          onClick={() => createPost(title, desc)}
          className="btn btn-primary"
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default CreatePost;
