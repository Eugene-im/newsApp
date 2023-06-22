import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../router/urls";

export function NoMatch() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate(routes.home);
    }, 3000);
  }, [navigate]);
  return (
    <div>
      <h2>oops! nothing here</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
