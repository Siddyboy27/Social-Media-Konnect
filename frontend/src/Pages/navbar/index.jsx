import React from "react";
import { useState } from "react";
import { IconButton,InputBase,Typography,Select,MenuItem,FormControl,useTheme } from "@mui/material";
import {Search,Message,DarkMode,LightMode,Notifications} from "@mui/icons-material";
import {useDispatch,useSelector} from "react-redux";
import {setMode,setLogout} from "state";
import {useNavigate} from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";



const Navbar =()=>{

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const user=useSelector((state)=>state.user);
    const [searchQuery,setSearchQuery]=useState('');
    const theme=useTheme();
    const neutralLight=theme.palette.neutral.light;
    const dark=theme.palette.neutral.dark;
    const bg=theme.palette.background.default;
    const primaryLight=theme.palette.primary.light;
    const alt=theme.palette.background.alt;

    const userName=`${user.firstName} ${user.lastName}`


    const handleSearch=()=>{
        if(searchQuery)
            navigate(`/home/search/${searchQuery}`);
    }





    
    return(
        <FlexBetween padding="1rem 6%" backgroundColor={alt}>
            <FlexBetween gap="1.5rem">
                <Typography 
                fontWeight="bold" 
                fontSize="clamp(1rem, 2rem, 2.25rem)" 
                color="primary" 
                onClick={()=>navigate("/home")}
                sx={{"&:hover":{
                    color:primaryLight,
                    cursor: "pointer",
                },
                }}
                >
                    Konnect.
                </Typography>
                <FlexBetween backgroundColor={neutralLight} borderRadius="9px" gap="3rem" padding="0.1rem 1.5rem">
                    <InputBase placeholder="Search..." value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)}/>
                    <IconButton onClick={()=>handleSearch()}><Search /></IconButton>
                </FlexBetween>
            </FlexBetween>

            <FlexBetween gap="2rem">
                <IconButton onClick={()=>dispatch(setMode())}>  
                    {
                        theme.palette.mode==='dark' ? (
                            <DarkMode sx={{fontsize:"25px"}}/>
                        ) 
                        :
                        (
                            <LightMode sx={{color:dark,fontsize:"25px"}}/>
                        )
                    }
                </IconButton>
                <Message sx={{fontsize:"25px"}}/>
                <Notifications sx={{fontsize:"25px"}}/>
                <FormControl variant="standard" value={userName}>
                    <Select value={userName}
                    sx={{
                            backgroundColor:neutralLight,
                            width:"auto",
                            borderRadius:"0.25rem",
                            padding:"0.25rem 1rem",
                            "& .MuiSvgIcon-root":{
                                pr:"0.25rem",
                                width:"3rem"
                            },
                            "& .MuiSelect-select:focus": {
                                backgroundColor:neutralLight
                            }
                        }}
                        input={<InputBase/>}
                    >
                        <MenuItem value={userName}>
                            <Typography>{userName}</Typography>
                        </MenuItem>
                        <MenuItem onClick={()=>dispatch(setLogout())}>
                            Log Out
                        </MenuItem>
                    </Select>
                </FormControl>
            </FlexBetween>
        </FlexBetween>
    )
}

export default Navbar;