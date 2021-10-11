import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

function Topbar({user,people,handleChange}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Venuesocial</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
            onChange={(event)=>handleChange(event.target.value)}
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
          </div>
          <div className="topbarIconItem">
            <Chat />
          </div>
          <div className="topbarIconItem">
            <Notifications />
          </div>
        </div>
        <Link>
          <img
            src={
               PF + "person/noAvatar.png"
            }
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}

const mapStateToProps = ({auth:{user}})=>({
  user
});

export default connect(mapStateToProps)(Topbar);