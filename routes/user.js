import express from "express"
import {user} from "../models/user.js";
import {isauthenticated} from "../middlewares/auth.js";
import {getallusers,
    register,
    getuserdetails,
    login,
    logout,
    getMyProfile,
    //userdetail,
    // updateuser,
    // deleteuser
    // ,
}
from "../controllers/user.js";
const router=express.Router();

export default router;


router.get("/users/all" ,getallusers)

router.post("/users/new", register)
router.post("/users/login", login)
router.get("/users/logout", logout)
//router.get("/userid", userdetail)  // get se user ka detail milega

// niche hum uper ka dynamic url de rhe...mtlb /userid ke baad jo bhi denge use id consider krega ye
router.get("/users/me", isauthenticated, getMyProfile);
router.get("/getdetail",isauthenticated,getuserdetails)
// router.put("/userid/:id", updateuser)  // put se update hoga
// router.delete("/userid/:id",deleteuser)
 // jaise ki ye uper is teeno ki routing same hai ,to hme ise direct likh skte h
//  router.route("/userid/:id").get(getuserdetails).put(updateuser).delete(deleteuser)



// dynamic route hmesha last me rkhte

