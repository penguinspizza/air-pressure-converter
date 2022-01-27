import logo from './logo.svg';
import './Layout.css';

function Layout(props) {
  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="#">
          <img src={logo} width="30" height="30" className="d-inline-block align-top" alt="" />
          {props.title}
        </a>
      </nav>
      <div className="container-fluid">
        {props.children}
      </div>
      <div className="footer bg-light text-center">
        <span className="text-muted">{props.footer}</span>
      </div>
    </div>
  );
}

export default Layout;