import { GiNestBirds } from 'react-icons/gi';
import { usePostContext } from './context/postContext';
import { Link } from 'react-router-dom';
const Sidebar = () => {
  // let { selectTab, setSelectTab } = useContext(contextObject);
  let { selectTab, setSelectTab } = usePostContext();

  return (
    <>
      <div
        className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary sidebar-container"
        style={{ width: '250px' }}
      >
        <a
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
        >
          <svg className="bi pe-none me-2" width="40" height="32">
            <use href="#bootstrap" />
          </svg>
          <span className="fs-4">
            <GiNestBirds />
          </span>
        </a>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <Link
              to="/"
              onClick={() => setSelectTab('home')}
              className={`nav-link ${selectTab === 'home' && 'active'}`}
              aria-current="page"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/create"
              onClick={() => setSelectTab('create')}
              className={`nav-link ${selectTab === 'create' && 'active'}`}
            >
              Add Post
            </Link>
          </li>
        </ul>
        <hr />
      </div>
    </>
  );
};

export default Sidebar;
