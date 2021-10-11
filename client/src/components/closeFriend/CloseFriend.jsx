import "./closeFriend.css";
import axios from "axios";
import { useEffect,useState } from "react";
import Avatar from '@mui/material/Avatar';

export default function CloseFriend({userId}) {
  console.log(`userId ${userId}`)
  const [following,setFollowing]  = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(()=>{
    axios.get(`http://localhost:8800/api/users?userId=${userId}`).then(
      (res)=>{
        console.log(res.data);
        setFollowing(res.data);
      }
    )
    .catch(err=>{
      console.log(err);
    });
  },[userId])
  return (
    <>
    {console.log(following)}
    {
      following ?
      (
        <li className="sidebarFriend">
        <Avatar sx={{ bgcolor: "#" + ((1<<24)*Math.random() | 0).toString(16) }} aria-label="recipe">{following.username[0]}</Avatar>
          <span className="sidebarFriendName">{following.username}</span>
        </li>
      )
      :
      null
    }
    </>
  );
}
