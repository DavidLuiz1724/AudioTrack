import avatar from "../assets/Avatar.png";
import admin_setting from "../assets/admin_setting.svg";
import search_icon from "../assets/search.svg";
import square from "../assets/square.png";
export default function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"))
  return (
    <div className="sidebar">
      <div className="admin-container">
        <div className="admin">
          <img src={avatar} />
          <p>{user?.fullname}</p>
        </div>

        <img src={admin_setting} />
      </div>

      <div className="searchbar-container">
        <img src={search_icon} />
        <p>Search</p>
      </div>

      <div className="data-record-container">
        <div className="today">
          <img src={square} />
          <p>Today's Recording</p>
        </div>

        <div className="yesterday">
          <img src={square} />
          <p>Yesterday's Recording</p>
        </div>
      </div>
    </div>
  );
}
