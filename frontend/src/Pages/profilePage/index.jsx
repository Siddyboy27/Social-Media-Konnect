import React from 'react'
import { Box } from '@mui/material'
import { useEffect,useState } from 'react'
import { useSelector } from 'react-redux' 
import { useParams } from 'react-router-dom'
import Navbar from 'Pages/navbar'
import FriendListWidget from 'Pages/widgets/FriendListWidget'
import PostingWidget from 'Pages/widgets/PostingWidget'
import PostsWidget from 'Pages/widgets/PostsWidget'
import UserWidget from 'Pages/widgets/UserWidget'



export default function ProfilePage() {
  
  const [user,setUser]=useState(null);
  const {userId}=useParams();
  const token=useSelector((state)=>state.token);

  const getUser =async()=>{
    const response=await fetch(`http://localhost:5000/users/${userId}`,
      {
        method:"GET",
        headers:{Authorization: `Bearer ${token}`}
      }
    );
    const data=await response.json();
    setUser(data);
  }

  useEffect(()=>{
    getUser();
  },[]); //eslint-disable-line react-hooks/exhaustive-deps

  
  if(!user)
    return null;

  return (
    <Box>
      <Navbar/>
      <Box
        width="100%"
        padding="2rem 6%"
        display="flex"
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis="26%">
          <UserWidget userId={userId} PicPath={user.PicPath}/>
          <Box m="2rem"/>
          <FriendListWidget userId={userId}/>
        </Box>
        <Box flexBasis="45%" mt={undefined}>
          <PostingWidget PicPath={user.PicPath}/>
          <Box m="2rem"/>
          <PostsWidget userId={userId} isProfile/>
        </Box>
        
      </Box>
    </Box>
  )
}
