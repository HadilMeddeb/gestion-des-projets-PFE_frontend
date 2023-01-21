import React, { useState, useEffect } from "react";
import "../Chat/ChatRoom.css";
import { friends } from "../Chat/data";
import axios from "axios";
import { useAuth } from "../../../contexts/AuthContext";
import Swal from "sweetalert2";

function TopicList(props) {
  const [topicList, setTopicList] = useState([]);
  const [searchTopic, setSearchTopic] = useState("");
  const [listmessages, setListMessages] = useState([]);
  const { currentUser } = useAuth();
  const [topicsWeVeSubscribedTo, setTopicsWeVeSubscribedTo] = useState([]);
  

  console.log("topics ", topicList);




  // get puis afficher  les messages  du current topic  dont on a connecté sur
  const getAllMessages = async (currentTopic) => {
    try {
      console.log("dddddddconnected", currentTopic);
      const res = await axios.get(`/api/topic/messages/${currentTopic._id}`);
      if (res.data.data) {
        props.getAllMessages(res.data.data);
        setListMessages(res.data.data);
        console.log("mesaages getted successfully", res.data.data);
      } else {
        console.log(res.data.message);
      }
    } catch (err) {
      console.log("catch error " + err);
    }
  };






  const listenToTopic = (e, topic) => {
    setTopicsWeVeSubscribedTo(
      JSON.parse(sessionStorage.getItem("topicsWeVeSubscribedTo"))
    );
    if (topicsWeVeSubscribedTo) {
      if (topicsWeVeSubscribedTo.indexOf(topic) == -1) {
     

        setTopicsWeVeSubscribedTo([...topicsWeVeSubscribedTo, topic]);

        const res = axios.post("/subscribe", { topic });

        try {
          if (res.data) {
            sessionStorage.setItem(
              "topicsWeVeSubscribedTo",
              JSON.stringify(topicsWeVeSubscribedTo)
            );
            console.log("here is data of subscription",res.data);
            return "subscribed";
          } else {
            return "not subscribed";
          }
        } catch (err) {
          console.log("error suscribing totopic" + err.response.error.message);
        }
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "you have already subscribed to this topic",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
  
      const res = axios.post("/subscribe", { topic });
      console.log("topiccccc", topic);
      try {
        if (res) {
       
          sessionStorage.setItem("topicsWeVeSubscribedTo", [topic]);
          return "subscribed";
        } else {
          return "not subscribed";
        }
      } catch (err) {
        console.log("error suscribing totopic" + err.response.error.message);
      }
    }
  };
  

  const subscribe = async (connectedTopic) => {
    console.log(connectedTopic);
    sessionStorage.setItem("connectedTopic", JSON.stringify(connectedTopic));
     getAllMessages(connectedTopic);
  };

  // const topics = JSON.parse(sessionStorage.getItem("subscribedTopics"));
  //   try {
  //     if (!topics||topics==[])
  //     {
  //     sessionStorage.setItem(
  //       "subscribedTopics",
  //       JSON.stringify([])
  //     );

  //     const res = await  axios.post(
  //       "http://127.0.0.1:5000/subscribe",
  //       { name: subscribedTopic.name },
  //       config
  //     );

  //     // topics.push(subscribedTopic.name);
  //     // console.log("response subscription ", res.data);
  //     // if (res.data) {
  //     //   console.log(res.data);
  //     // } else {
  //     //   console.log(" there is no response here sorry !!");
  //     // }
  //   }
  //   else
  //   {
  //     // if(topics.indexOf(subscribedTopic.name) !== -1)
  //     // {
  //     //   //desubscribe then subscribe
  //     // }
  //     // else
  //     // {
  //     //   topics.push(subscribedTopic.name);
  //     //   sessionStorage.setItem(
  //     //     "subscribedTopics",
  //     //     JSON.stringify([])
  //     //   );

  //     // }
  //   }
  //   }
  //   catch (err)
  //   {
  //     console.log("subscribe error!! :", err.response.data.message);
  //   }}};

  console.log("messages", listmessages);
  useEffect(() => {
    

    //  setTopicList(props.topicList)
    axios
      .get("/api/topic")
      .then((res) => {
        if (res.data.data) {
          setTopicList(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="col-12 col-lg-5 col-xl-3 border-end">
      <div className="px-4 d-none d-md-block">
        <div className="d-flex align-items-center">
          <div className="flex-grow-1">
            <input
              type="text"
              className="form-control my-3"
              placeholder="Search..."
              onChange={(e) => {
                setSearchTopic(e.target.value);
              }}
            />
          </div>
        </div>
      </div>



{/* ici on a la liste des topics  */}
      {topicList.length != 0 &&
        topicList
          .filter((value) => {
            if (searchTopic == "") {
              return value;
            } else if (
              value.name.toLowerCase().includes(searchTopic.toLowerCase())
            ) {
              return value;
            }
          })
          .map((topic) => {
            return (
              <div className="row" key={topic._id}>
                <a
                  href="#"
                  className="col-2 btn"
                  onClick={(e) => {
                    listenToTopic(e, topic);
                  }}
                >
                  <i className="fas fa-store-alt text-success"></i>
                </a>


                {/* changer le current topic par le topic dont on cliqué sur  */}
                <button
                  className="list-group-item list-group-item-action border-bottom col-10"
                  onClick={() => {
                    subscribe(topic);
                    props.changeCurrentTopic(topic);
                  }}
                >
                  <div className="d-flex align-items-start p-2">
                    <div className="flex-grow-1 ml-3 row">
                      <div className="small col-2 fw-6">
                        <span className="fas fa-circle chat-offline text-primary" />
                      </div>
                      <div className="col-8 text-start"> {topic.name}</div>
                    </div>
                  </div>
                </button>
              </div>

              // <Topic  changeCurrentTopic={(topic)=>props.changeCurrentTopic(topic)} name={topic.name}  key={topic._id} />
            );
          })}
      <hr className="d-block d-lg-none mt-1 mb-0" />
    </div>
  );
}
export default TopicList;
