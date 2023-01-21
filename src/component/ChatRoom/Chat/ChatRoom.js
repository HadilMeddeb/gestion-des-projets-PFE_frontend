import React, { useState, useEffect } from "react";
import "./ChatRoom.css";
import TopicList from "../TopicList/TopicList";
import Message from "../Message/Message";
import { messages } from "./data";
import { useAuth } from "../../../contexts/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import {FormatDate} from "../../../utils/DataTreatment";
import {getTime} from "../../../utils/DataTreatment";
import Swal from "sweetalert2"

function ChatRoom() {

  const [subscribedTopic, setsubscribedTopic] = useState(undefined);
  const [messageText, setMessageText] = useState("");
  const [Listmessages, setListmessages] = useState([]);
  const [topicList, setTopicList] = useState([]);
  const { currentUser } = useAuth();
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };


//----------------------------------------------------publish-------------------------------------------//
  //send request to backend to make currentuser publish a message to  the currentTopic both topic and message are sent from front
  const publish=(msg,topic)=>{
   const res=axios.post("/publish", { message: msg , topic: topic})
   try
   {
    if (res) { return "sent"} 
    else {return "not sent"}
   }
  catch(err) {console.log("error publishing message in topic"+err.response.error.message);}
}

//-------------------------------------------------send message ----------------------------------
const send= async (e)=> 
{
    e.preventDefault();
    const messageObject = {
      content: messageText,
      sender: currentUser._id,
      topic: subscribedTopic._id,
    };
// publish msg dans le topic
      const  result=publish(messageObject.content,subscribedTopic.name);
      if(result=="sent"){
        try{
// stockage du message dans labase
        const res=await axios.post("/api/messages",messageObject, config);
        if (res.data) 
          {
               setListmessages([...Listmessages,messageObject])
          } else { console.log("not inserted ...");}
      
      }
      catch(err)
      {
              console.log("error creation etud  error : ", err.response.data.message);
              Swal.fire({
              position: "center",
              icon: "error",
              title: "error  sent message",
              showConfirmButton: false,
              timer: 1500,
         }); 
       }
      }
      else
      {
        console.log("resssss",result);
      }
  }







  //---------------------------------------------------------components--------------------------------------------
  return (
    <>
      <main className="container">
        <div className="content-header mt-5 mb-5">
          <div>
            <div>
              <div className="">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">AddProject</li>
                </ol>
              </div>
              <div className="float-sm-left d-flex align-top ">
                {" "}
                <h4>Nouveau ProjetPFE</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="container p-0">
          <div className="card">
            <div className="row ">
              {/*  chat_users */}

              <TopicList
                 topicList={topicList}
                 changeCurrentTopic={(topic) => setsubscribedTopic(topic)}
                 getAllMessages={(messages=>{setListmessages(messages)})}
              
              />
              <div className="col-12 col-lg-7 col-xl-9">
                <div className="py-2 px-4 border-bottom d-none d-lg-block">
                  <div className="d-flex align-items-center py-1">
                    <div className="position-relative">
                     {currentUser.avatar? <img
                        src={currentUser.avatar}
                        className="rounded-circle mr-1"
                        alt="Sharon Lessman"
                        width={40}
                        height={40}
                      />:<i class="fas fa-user-circle fs-1"></i>}
                    </div>
                    <div className="flex-grow-1 pl-3">
                      <strong>
                        {currentUser.nom + " " + currentUser.prenom}
                      </strong>
                      <div className="text-muted small">
                        <em>Connected...</em>
                      </div>
                    </div>
                    <div>
                      <button className="btn btn-light border btn-lg px-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-more-horizontal feather-lg"
                        >
                          <circle cx={12} cy={12} r={1} />
                          <circle cx={19} cy={12} r={1} />
                          <circle cx={5} cy={12} r={1} />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* chat Messages */}

                <div className="position-relative">
                  <div className="chat-messages p-4">
                    {/* Message */}
  {
    Listmessages.length!=0 &&
  
  Listmessages.map((message) => {
    console.log('hhhhhhh')
      if(message.sender._id==currentUser._id)
      {
       return  <Message
        key={message.id}
        text={message.content}
        time={getTime(message.time)}
        date={FormatDate(message.time)}
        sender={message.sender}
        side="right" />
      }
      else
      {
      return   <Message
      key={message.id}
      text={message.content}
      time={getTime(message.time)}
      date={FormatDate(message.time)}
      sender={message.sender}
      side="left" />
      }
    })  
}
    
  
                    
                  </div>
                </div>

                {/* send input */}

                <div className="flex-grow-0 py-3 px-4 border-top">
                  <form onSubmit={(e)=>{send(e)}}>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control "
                        placeholder="Type your message"
                        value={messageText}
                        onChange={(e) => {
                          console.log(e.target.value);
                          setMessageText(e.target.value);
                        }}
                      />
                      <button type="submit" className="btn btn-primary ">
                        Send
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default ChatRoom;
