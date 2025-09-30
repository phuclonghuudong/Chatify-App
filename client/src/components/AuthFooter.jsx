import { Link } from "react-router-dom";

const AuthFooter = ({ path, title }) => {
  return (
    <div className="mt-6 text-center">
      <Link to={path ? path : "/"} className="auth-link">
        {title}
      </Link>
    </div>
  );
};

export default AuthFooter;
