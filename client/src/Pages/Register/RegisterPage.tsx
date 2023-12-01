import React, { useState } from "react";
import { register } from "../../Services/auth/auth";
import { useNavigate } from "react-router-dom";

interface Credentials {
  userName: string;
  email: string;
  password: string;
}

// interface LoginResponse {
//   token: string,
//   user:[
//         email:string,
//         id:string,
//         userName:string
//     ]
// }

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const credentials: Credentials = { userName, email, password };
      const res = await register(credentials);

      if (res.token) {
        localStorage.setItem("authToken", res.token);
        navigate("/");
      }
    } catch (error) {
      console.error("Registred error:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
      }}
    >
      <div
        style={{
          background: "#1A1B1B",
          minHeight: "60vh",
          width: "40vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          borderRadius: "1rem",
        }}
      >
        <div
          style={{
            color: "white",
            margin: "2rem 0rem",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "3rem",
          }}
        >
          Register Here!
        </div>
        <form
          className="flex flex-row items-center justify-center h-full"
          style={{ flexDirection: "column" }}
        >
          <input
            style={{
              width: "15vw",
              padding: "0.5rem 1rem",
              color: "white",
              borderRadius: "5px",
              backgroundColor: "#272526",
              margin: "1rem",
            }}
            id="userName"
            type="text"
            placeholder="Enter A Unique User Name"
            value={userName}
            onChange={handleUserNameChange}
          />
          <input
            style={{
              width: "15vw",
              padding: "0.5rem 1rem",
              color: "white",
              borderRadius: "5px",
              backgroundColor: "#272526",
              margin: "1rem",
            }}
            id="email"
            type="text"
            placeholder="Enter Your Email"
            value={email}
            onChange={handleEmailChange}
          />

          <input
            style={{
              width: "15vw",
              padding: "0.5rem 1rem",
              color: "white",
              borderRadius: "5px",
              backgroundColor: "#272526",
              margin: "1rem",
            }}
            id="password"
            type="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={handlePasswordChange}
          />

          <button
            style={{
              padding: "0.5rem 1rem",
              background: "white",
              borderRadius: "5px",
              margin: "1.5rem",
            }}
            type="button"
            onClick={handleSubmit}
          >
            Register
          </button>
        </form>
        <div>
          <button
            style={{
              padding: "0.5rem 1rem",
              background: "white",
              borderRadius: "5px",
              margin: "1.5rem",
            }}
            type="button"
            onClick={() => navigate("/login")}
          >
            Already Have An Account?
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
