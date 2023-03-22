import React from 'react'
import Navbar from '../navbar';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import state from 'state';
import UserWidget from 'Pages/widgets/UserWidget';
import PostingWidget from "Pages/widgets/PostingWidget";
import PostsWidget from 'Pages/widgets/PostsWidget';
import FriendListWidget from 'Pages/widgets/FriendListWidget';

const HomePage=()=> {

  const {PicPath}=useSelector((state)=>state.user);
  const userId=useSelector((state)=>state.user._id)
  console.log(userId);
  return (
    <Box>
      <Navbar/>
      <Box
        width="100%"
        padding="2rem 6%"
        display="flex"
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis="26%">
          <UserWidget userId={userId} PicPath={PicPath}/>
        </Box>
        <Box flexBasis="45%" mt={undefined}>
          <PostingWidget PicPath={PicPath}/>
          <PostsWidget userId={userId}/>
        </Box>
        
        <Box flexBasis="30%">
          <FriendListWidget userId={userId}/>
        </Box>
      </Box>
    </Box>
  )
}

export default HomePage;
