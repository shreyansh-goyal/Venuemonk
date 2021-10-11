import "./post.css";
import { MoreVert } from "@material-ui/icons";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { LoginSuccess } from "../../redux/auth/auth.actions";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

function Post({ post, user,setUser }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [following, setFollowing] = useState(null);
  const [open, setOpen] = useState(false);
  const [opinion, setOpinion] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const addComment = async ()=>{
    const commentData = {
      text : opinion,
      username : user.username
    }
    try {
      const res = await axios.put("/posts/" + post._id + "/comment", commentData);
      alert("comment has been updated");
    } catch (err) {}
  }


  useEffect(() => {
    setIsLiked(post.likes.includes(user._id));
  }, [user._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setFollowing(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: user._id });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${post.username}`}>
              <img
                className="postProfileImg"
                src="person/noAvatar.png"
                alt=""
              />
            </Link>
            <span className="postUsername">{post.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={PF + post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`${PF}like.png`}
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon"
              src={`${PF}heart.png`}
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText" onClick={handleOpen} > comments</span>
          </div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              {
                post.comments.map(comment=>(
                  <Card key={comment.text} >
                      <CardHeader
                      avatar={
                      <Avatar>
                          {comment.username[0]}
                      </Avatar>
                      }
                      title={comment.text}
                      />
                  </Card>
                ))
              }
            <div className="share">
              <div className="shareWrapper">
                <div className="shareTop">
                  <input
                    placeholder={"Comment"}
                    className="shareInput"
                    onChange={(e)=>setOpinion(e.target.value)}
                  />
                </div>

                <form className="shareBottom" >
                  <div className="shareOptions">
                  </div>
                  <button className="shareButton" type="submit" onClick={addComment}>
                    comment
                  </button>
                </form>
              </div>
            </div>
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({auth:{user}}) => ({
  user
});

const mapDispatchToProps = (dispatch) =>({
  setUser : (user)=>{dispatch(LoginSuccess(user))}
})

export default connect(mapStateToProps,mapDispatchToProps)(Post);