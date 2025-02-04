import React from 'react';
import '../index.css';
import { FaTrashAlt } from 'react-icons/fa';
import { FaPencil } from 'react-icons/fa6';
import { usePostContext } from './context/postContext';
import EmptyMessage from './EmptyMessage';

const Card = () => {
  // let { post, deletePost, updatePost } = useContext(contextObject);
  let { post, deletePost, updatePost, fetchPost } = usePostContext();

  const POST_API = 'https://dummyjson.com/products';

  const dataFetched = () => {
    fetch(POST_API)
      .then((res) => res.json())
      .then((data) => fetchPost(data.products));
  };

  return (
    <>
      {post.length === 0 && <EmptyMessage dataFetched={dataFetched} />}

      {post.map((item, index) => {
        return (
          <div className="card" key={item + index}>
            <div className="card-body">
              <h5 className="card-title">{item.title}</h5>
              <span>Id: {item.id}</span>
              <hr></hr>
              <p className="card-text">{item.description}</p>

              {item.tags.map((tag) => (
                <span key={tag} className="badge text-bg-primary tags">
                  #{tag}
                </span>
              ))}

              <div className="button-container">
                <button
                  className="btn btn-update"
                  onClick={() => updatePost(item, 'create')}
                >
                  <FaPencil />
                </button>
                <button
                  className="btn btn-delete"
                  onClick={() => deletePost(item)}
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Card;
