import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <>
        <div>
          <Link to={"/register"}>Sign Up</Link>
        </div>
        <div>
          <Link to={"/login"}>Log In</Link>
        </div>
      </>
    </>
  );
}
