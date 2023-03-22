import User from "../models/User.js";


export const getUser=async(req,res)=>{
    try {
        const {id}=req.params;
        const user=await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({msg:error.message});
    }
}


export const getUserFriends=async (req,res) =>{
    try {
        const {id}=req.params;
        const user=await User.findById(id);

        const friendsList=await Promise.all(
            user.friends.map((F_id)=>User.findById(F_id))
        );

        const Friends=friendsList.map(({_id,firstName,lastName,occupation,location,PicPath})=>{
            return {_id,firstName,lastName,occupation,location,PicPath};
        })

        res.status(200).json(Friends);
    } catch (error) {
        res.status(404).json({msg:error.message}); 
    }
    
}




export const getSearchedFriends =async(req,res)=>{

    try {
        const {searchQuery}=req.params;

        const searchRes= await User.find({firstName:String(searchQuery)});
        const searchList=searchRes.map(({_id,firstName,lastName,PicPath,occupation})=>{
            return {_id,firstName,lastName,PicPath,occupation};
        });
        res.status(200).json(searchList);
        
    } catch (error) {
        res.status(500).json({msg:error.message});
    }
    

}

export const addRemoveFriends = async (req,res)=>{
    try {
        const{id,friendId}=req.params;
        const user=await User.findById(id);
        const friend=await User.findById(friendId);


        if(user.friends.includes(friendId)){
            user.friends=user.friends.filter((id)=>id!==friendId);
            friend.friends=friend.friends.filter((id)=>id!==id);
        }
        else{
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        const friendsList=await Promise.all(
            user.friends.map((F_id)=>User.findById(F_id))
        );

        const Friends=friendsList.map(({_id,firstName,lastName,occupation,location,PicPath})=>{
            return {_id,firstName,lastName,occupation,location,PicPath};
        })

        res.status(200).json(Friends);
    } catch (error) {
        res.status(404).json({msg:error.message});
    }
}
