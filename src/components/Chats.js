import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Avatar, ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

function Chats() {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  console.log(user);

  const handleLogout = async () => {
    await auth.signOut();
    history.push("/");
  };

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();

    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };

  useEffect(() => {
    if (!user) {
      history.push("/");
      return;
    }
    axios
      .get("https://api.chatengine.io/users/me", {
        headers: {
          "project-id": "916a1284-ce1d-41ac-9ce8-858539c0526b",
          "user-name": user.email,
          "user-secret": user.uid,
        },
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        let formData = new FormData();
        formData.append("email", user.email);
        formData.append("username", user.email);
        formData.append("secret", user.uid);

        getFile(user.photoURL).then((avatar) => {
          formData.append("avatar", avatar, avatar.name);
        });
        axios
          .post("https://api.chatengine.io/users", formData, {
            headers: {
              "private-key": "e4967aed-c5ee-4ec5-b9e8-9baa05a2f2d7",
            },
          })
          .then(() => setLoading(false))
          .catch((error) => console.log(error));
      });
  }, [user, history]);

  if (!user || loading) return "Loading....";

  return (
    <div className="chats=page">
      <div className="nav-bar">
        <div className="logo-tab">SPACE-CHAT</div>
        <div className="logout-tab" onClick={handleLogout}>
          Logout
        </div>
      </div>
      <ChatEngine
        height="calc(100vh - 66px)"
        projectID="916a1284-ce1d-41ac-9ce8-858539c0526b"
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
}

export default Chats;
