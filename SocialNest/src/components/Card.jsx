import React from 'react';

const Card = ({ post, deletePost, updatePost }) => {
  return (
    <>
      {post.map((item, index) => {
        return (
          <React.Fragment key={item + index}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.description}</p>
                <a className="btn btn-primary" onClick={() => updatePost(item)}>
                  Update
                </a>
                <a
                  className="btn btn-danger delete-btn"
                  onClick={() => deletePost(item)}
                >
                  Delete
                </a>
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </>
  );
};

export default Card;
