import React, { useState,useEffect,  } from 'react'
import Navbar from '../navbar';
import { Box, Typography, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import UserWidget from 'Pages/widgets/UserWidget';
import Friend from 'components/Friend';
import FriendListWidget from 'Pages/widgets/FriendListWidget';
import { useParams } from 'react-router-dom';
import WidgetWrapper from 'components/WidgetWrapper';

const SearchPage=()=> {

  const {searchQuery}=useParams();
  const [list,setList]=useState(null);

  const token=useSelector((state)=>state.token);
  const {PicPath}=useSelector((state)=>state.user);
  const userId=useSelector((state)=>state.user._id);

  const {palette}=useTheme();
  const dark=palette.neutral.dark;


  

  const getList = async ()=>{
        const response=await fetch(`http://localhost:5000/users/search/${searchQuery}`,
        {
            method:"GET",
            headers:{ Authorization: `Bearer ${token}` },
        });

        const data=await response.json();
        
        setList(data);        
    }

    useEffect(()=>{
        getList();
    },[searchQuery]);





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
        
        {
          list ? (
            <Box flexBasis="45%" display="flex" flexDirection="column" gap="2rem" p="1rem">

                  <Typography variant="h2" color={dark} fontWeight="500">
                    Search Results
                  </Typography>


                  {list.map((item) => (
                    <WidgetWrapper>
                      <Friend
                      key={item._id}
                      friendId={item._id}
                      name={`${item.firstName} ${item.lastName}`}
                      subtitle={item.occupation}
                      userPicPath={item.PicPath}
                    />
                    </WidgetWrapper>
                    

                  ))}
          </Box>
          ): (
            <Box><Typography variant="h2" color={dark} fontWeight="500">Loaadddiinng....</Typography></Box>
          )
        }

          
        
        
        
        <Box flexBasis="30%">
          <FriendListWidget userId={userId}/>
        </Box>
      </Box>
    </Box>
  )
}

export default SearchPage;
