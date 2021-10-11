import { useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { useState } from "react";

import SearchField from "../../components/searchField/searchField.component";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import {SetUsers} from "../../redux/users/users.actions";
import "./home.css"

function Home({user,users,setUsers}) {
  const [people,setPeople] = useState([]);
  useEffect(async ()=>{
    try{
      const res = await axios.get("http://localhost:8800/api/users/all");
      setUsers(res.data);
    }
    catch(err){
      console.log(err);
    }
  },[])

  const handleChange = (searchValue="") => {
    let newPeople = [];
    if(searchValue.length!==0)
    newPeople = users.filter(people=>user.username!==people.username&&people.username.indexOf(searchValue)!==-1);    
    else
    newPeople = [];
    setPeople(newPeople);
  }

  const followUser = async (friend) => {
    let userId = user._id;
    try{
      const res = await axios.put(`http://localhost:8800/api/users/${friend._id}/follow`,{
        userId
      });
      alert.log(`Following ${friend.username}`);  
    }
    catch(error){
      alert(error.response.data);
    }
  }

  return (
    <>
      <Topbar handleChange={handleChange}  people={people} />
      <div className="searchField">
        <SearchField followUser={followUser} people={people} />
      </div>
      <div className="homeContainer">
        <Sidebar user={user} />
        <Feed/>
        <Rightbar/>
      </div>
    </>
  );
}
const mapStateToProps = ({auth:{user},users:{users}}) => ({
  users,
  user
})

const mapDispatchToProps = (dispatch) => ({
  setUsers:users=>dispatch(SetUsers(users))
})

export default connect(mapStateToProps,mapDispatchToProps)(Home)