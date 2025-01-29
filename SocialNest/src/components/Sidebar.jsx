import { GiNestBirds } from 'react-icons/gi';

const Sidebar = ({ selectTab, setSelectTab }) => {
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
            <a
              onClick={() => setSelectTab('home')}
              href="#"
              className={`nav-link ${selectTab === 'home' && 'active'}`}
              aria-current="page"
            >
              Home
            </a>
          </li>
          <li>
            <a
              onClick={() => setSelectTab('create')}
              className={`nav-link ${selectTab === 'create' && 'active'}`}
            >
              Create Post
            </a>
          </li>
        </ul>
        <hr />
      </div>
    </>
  );
};

export default Sidebar;
