const EmptyMessage = ({ dataFetched }) => {
  return (
    <>
      <div className="bg-light text-secondary  text-center hero">
        <div className="py-5">
          <h1 className="display-5 fw-bold ">No Recent Posts</h1>
          <div className="col-lg-6 mx-auto">
            <p className="fs-5 mb-4">
              Add new if you want to see feeds on your profile.
            </p>
            <button onClick={dataFetched}>Fetch data from server</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmptyMessage;
