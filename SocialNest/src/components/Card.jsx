import React, { useEffect, useState } from 'react';
import '../index.css';
import { FaTrashAlt } from 'react-icons/fa';
import { FaPencil } from 'react-icons/fa6';
import { usePostContext } from './context/postContext';
import EmptyMessage from './EmptyMessage';
import LoadingPosts from './LoadingPosts';

const Card = () => {
  // let { post, deletePost, updatePost } = useContext(contextObject);
  let { post, deletePost, updatePost, loadPost } = usePostContext();

  return (
    <>
      {loadPost === true && <LoadingPosts />}

      {!loadPost && post.length === 0 && <EmptyMessage />}

      {!loadPost &&
        post.map((item, index) => {
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
