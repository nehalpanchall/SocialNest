import { useRef } from 'react';

const CreatePost = ({ createPost, updateItemObj }) => {
  let titleField = useRef(null);
  let descField = useRef(null);

  if (updateItemObj) {
    titleField.current.value = updateItemObj.title;
    descField.current.value = updateItemObj.description;
  }

  return (
    <>
      <div className="post-container">
        <div className="mb-3 ">
          <label className="form-label">Post Title</label>
          <input
            ref={titleField}
            id="titleId"
            type="text"
            className="form-control input-width"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Post Description</label>
          <textarea
            ref={descField}
            id="desc"
            rows="4"
            cols="50"
            className="form-control input-width"
          />
        </div>

        <button
          onClick={() => createPost(titleField, descField)}
          className="btn btn-primary"
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default CreatePost;
