import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function Forum() {
  let { id } = useParams();
  const [forumObject, setForumObject] = useState({});
  const [listOfMessages, setListOfMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const addMessage = (data) => {
    axios
      .post(
        "https://back.r3mob.fr/message",
        {
          messageBody: newMessage,
          ForumId: id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((res) => {
        if (res.data.error) {
          console.log(res.data.error);
        } else {
          const messageToAdd = {
            messageBody: newMessage,
            username: res.data.username,
          };
          setListOfMessages([...listOfMessages, messageToAdd]);
          setNewMessage("");
        }
      });
  };

  useEffect(() => {
    axios.get(`https://back.r3mob.fr/forum/byId/${id}`).then((res) => {
      console.log(res.data);
      setForumObject(res.data);
    });
    axios.get(`https://back.r3mob.fr/message/${id}`).then((res) => {
      console.log(res.data);
      setListOfMessages(res.data);
    });
  }, [id]);

  return (
    <div className="forumPage">
      <div className="leftSide">
        <div className="forum" id="individual">
          <div className="title">{forumObject.title}</div>
          <div className="body">{forumObject.theme}</div>
          <div className="footer">{forumObject.userId}</div>
        </div>
      </div>
      <div className="rightSide">
        <div className="addMessageContainer">
          <input
            type="text"
            value={newMessage}
            placeholder="Message..."
            autoComplete="off"
            onChange={(event) => {
              setNewMessage(event.target.value);
            }}
          />
          <button onClick={addMessage}> Add Message </button>
        </div>

        <div className="listOfMessages">
          {listOfMessages.map((value, key) => {
            return (
              <div key={key} className="message">
                <div className="body">
                  {value.messageBody}
                  <label> Username : {value.username}</label>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Forum;
