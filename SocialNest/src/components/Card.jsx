const Card = ({ post }) => {
  return (
    <>
      {post.map((item) => {
        return (
          <>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.description}</p>
                <a className="btn btn-primary">Button</a>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};

export default Card;
