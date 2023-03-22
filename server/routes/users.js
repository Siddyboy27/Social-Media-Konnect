import express from "express";
import{
    getUser,
    getUserFriends,
    addRemoveFriends,
    getSearchedFriends
} from "../controllers/users.js";
import {verifyToken} from "../middleware/auth.js";

const router=express.Router();


router.get("/search/:searchQuery",verifyToken,getSearchedFriends);
router.get("/:id",verifyToken,getUser);
router.get("/:id/friends",verifyToken,getUserFriends);


router.patch("/:id/:friendId", verifyToken, addRemoveFriends);
 //update with verification later
export default router;