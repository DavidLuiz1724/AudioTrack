import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../config";

const List = () => {
  const [streams, setStreams] = useState([]);
  const [times, setTimes] = useState([]);
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
      setTimes(res.data);
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
        <h1>Audio Tracking List</h1>
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
                <div className="file">File Name</div>
                <div className="time">Time</div>
              </div>
              <div className="tbody">
                {times.length > 0 ? (
                  times.map((time) => (
                  <div className="row">
                    <div className="file">{time.file?.audio}</div>
                    <div className="time">{time.time}</div>
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
