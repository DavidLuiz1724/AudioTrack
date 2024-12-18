import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils";
import { Link } from "react-router-dom";
import Arrow from "../assets/arrow-ios-back-svgrepo-com.svg";

const List = () => {
  const [streams, setStreams] = useState([]);
  const [detects, setDetects] = useState([]);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    axios.get(`${BASE_URL}/api/stream_url/`).then((res) => {
      setStreams(res.data);
    }).catch((e) => console.error("error", e))
  }, [])

  // Handler for the button click (example action)
  const handleButtonClick = (id) => {
    axios.get(`${BASE_URL}/api/audio_time/?stream_id=${id}`).then((res) => {
      setFlag(true);
      setDetects(res.data);
    }).catch((e) => console.error("error", e))
  };

  const handleDeleteButtonClick = (id) => {
    alert(`Url deleted successfully`);
    axios.delete(`${BASE_URL}/api/stream_url/?id=${id}`).then(() => {
      window.location.reload();
    })
  };

  return (
    <div className="list-container">
      <div className="list-header">
        <div className="title">
          <Link to="/dashboard">
            <img className="arrow" src={Arrow} />
          </Link>
          <h1>Audio Tracking List</h1>
        </div>
        <p>
          Kickstart your learning with our comprehensive selection with Ed Tech.
          You can use the predefined prompts below and type in what you want to
          learn in that style.
        </p>
      </div>

      <div className="list-total">
        <div className="list">
          {streams.length > 0 ? (
            streams.map((stream) => (
              <div key={stream.id} className="url-item">
                <span>{stream.url}</span>

                <button
                  onClick={() => handleButtonClick(stream.id)}
                  className="list-view-btn"
                >
                  Time List
                </button>
                <button
                  onClick={() => handleDeleteButtonClick(stream.id)}
                  className="url-delete-btn"
                >
                  Url Delete
                </button>
              </div>
            ))
          ) : (
            <p>No URLs added yet.</p>
          )}
        </div>
      </div>

      {flag && (
        <div className="modal">
          <div className="time-list">
            <div className="head">
              <div className="title">Tracking Time List</div>
              <div className="close" onClick={()=>setFlag(false)}>x</div>
            </div>
            
            <div className="table">
              <div className="thead">
                <div className="file">Audio File</div>
                <div className="time">Time</div>
              </div>
              <div className="tbody">
                {detects.length > 0 ? (
                  detects.map((detect) => (
                  <div className="row">
                    <audio className="file" controls>
                      <source src={"/audio/" + detect.filename} type="audio/wav"/>
                    </audio>
                    <div className="time">{new Date(detect.time).toLocaleString()}</div>
                  </div>
                ))
              ) : (
                <div className="time">No Tracking Times yet.</div>
              )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
