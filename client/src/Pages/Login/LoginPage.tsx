import React, { useState } from "react";
import { login } from "../../Services/auth/auth";
import { useNavigate } from "react-router-dom";
import { getChannel } from "../../Services/main/main";
import { useDispatch } from "react-redux";
import { loginChannel } from "../../Redux/slices/channelSlice";

interface Credentials {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: { email: string; id: string; userName: string };
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const credentials: Credentials = { email, password };
      const res: LoginResponse = await login(credentials);

      if (res.token) {
        localStorage.setItem("authToken", res.token);
        // navigate("/");
      }

      const user = res.user.userName;
      console.log("user: ", user);

      const channelRes = await getChannel(user, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("channelRes: ", channelRes.data);
      if (channelRes.data.status == false) {
        navigate("/createChannel");
      } else {
        dispatch(
          loginChannel({
            banner: channelRes.data.channel.banner,
            bio: channelRes.data.channel.bio,
            displayPic: channelRes.data.channel.displayPic,
            username: channelRes.data.channel.username,
            loggedIn: true,
          })
        );
      }

      console.log("Logged in", res);
    } catch (error) {
      console.error("Login error:", error);
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
          Welcome Back!
        </div>
        <form
          className="flex flex-row items-center justify-center h-full"
          style={{ flexDirection: "column" }}
        >
          <input
            style={{
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
            Login
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
            onClick={() => navigate("/register")}
          >
            Already Have An Account?
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
