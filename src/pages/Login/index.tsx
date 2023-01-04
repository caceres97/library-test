import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/user-context";
import jwt_decode from "jwt-decode";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const { changeUser, userContext } = useUser() as any;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const onSubmit = (e: any) => {
    e.preventDefault();
    if (email.trim() && pass.trim()) {
      const body = {
        email,
        password: pass,
      };

      axios
        .post(`${process.env.REACT_APP_BASE_URL}/users/login`, body)
        .then((response: any) => {
          if (response.data.loginResult) {
            // let token = response.data.token;
            // let decoded = jwt_decode(token) as any;

            changeUser(response.data);
            if (response.data.loginResult.isAdmin) {
              navigate("/admin");
            } else {
              navigate("/");
            }
          } else {
            alert("Incorrect password");
          }
        })
        .catch((error: any) => {
          alert(error);
          setIsLoading(false);
        });
    } else {
      alert("Por favor, llenar todos los campos.");
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex">
      <div className="flex w-1/2 bg-gradient-to-tr from-blue-400 to-blue-800 i justify-around items-center">
        <div>
          <h1 className="text-white font-bold text-4xl font-sans">
            Library coding test
          </h1>
          <p className="text-white mt-1">Developed by Angel Caceres</p>
          <button
            type="submit"
            className="block w-40 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2"
            onClick={() => {
              window.open(
                "https://www.linkedin.com/in/caceres-angel/",
                "_blank",
                "noreferrer"
              );
            }}
          >
            Who's Angel?
          </button>
        </div>
      </div>
      <div className="flex w-1/2 justify-center items-center bg-white">
        <form className="bg-white w-2/3" onSubmit={(e) => onSubmit(e)}>
          <h1 className="text-gray-800 font-bold text-2xl mb-1">
            Hello Again!
          </h1>
          <p className="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>
          <div className="flex items-center border-2 py-2 px-2  rounded-2xl mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
            <input
              className="pl-2 outline-none border-none w-full"
              type="text"
              name="name"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
            />
          </div>
          <div className="flex items-center border-2 py-2 px-2  rounded-2xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clip-rule="evenodd"
              />
            </svg>
            <input
              className="pl-2 outline-none border-none w-full"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              name="password"
              type="password"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
