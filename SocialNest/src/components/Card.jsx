import React, { useContext } from 'react';
import '../index.css';
import { FaTrashAlt } from 'react-icons/fa';
import { FaPencil } from 'react-icons/fa6';
import contextObject from './context/postContext';

const Card = ({ updatePost }) => {
  let { post, deletePost } = useContext(contextObject);

  return (
    <>
      {post.map((item, index) => {
        return (
          <div className="card" key={item + index}>
            <div className="card-body">
              <h5 className="card-title">{item.title}</h5>
              <hr></hr>
              <p className="card-text">{item.description}</p>
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
