import "./share.css";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@material-ui/icons";
import {connect} from 'react-redux';
import { useRef, useState } from "react";

import axios from "axios";

function Share({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();

  const submitHandler = async (e) => {
    debugger;
    e.preventDefault();
    const newPost = {
      username:user.username,
      userId: user._id,
      desc: desc.current.value,
      comments:[]
    };
    try {
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (err) {}
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
          />
          <input
            placeholder={"What's in your mind " + user.username + "?"}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />

        <form className="shareBottom">
          <div className="shareOptions">
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit" onClick={(e)=>submitHandler(e)}>
            Share
          </button>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = ({auth:{user}}) => ({
  user
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps,mapDispatchToProps)(Share);