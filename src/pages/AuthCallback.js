import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { handleGoogleCallback, parseJwt } from "../utils/googleAuth";

const AuthCallback = () => {
  const location = useLocation();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");

    if (code) {
      handleGoogleCallback(code).then((data) => {
        if (data) {
          console.log(data);
          const user = parseJwt(data.id_token);
          setUserInfo(user);
          console.log(user);
        }
      });
    }
  }, [location]);

  console.log(userInfo);

  return (
    <div>
      {userInfo ? (
        <div>
          <h2>Welcome, {userInfo.name}</h2>
          <p>Email: {userInfo.email}</p>
        </div>
      ) : (
        <p>Authenticating...</p>
      )}
    </div>
  );
};

export default AuthCallback;
