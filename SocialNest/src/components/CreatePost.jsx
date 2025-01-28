const CreatePost = () => {
  return (
    <>
      <form className="post-container">
        <div className="mb-3 ">
          <label for="exampleInputEmail1" className="form-label">
            Post Title
          </label>
          <input
            type="email"
            className="form-control input-width"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Post Description
          </label>
          <textarea
            rows="4"
            cols="50"
            className="form-control input-width"
            id="exampleInputPassword1"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default CreatePost;
