import express from "express";
import {newtask,getmytask,deletetask,updatetask} from "../controllers/task.js"
import {isauthenticated} from "../middlewares/auth.js";


const router=express.Router();
router.post("/tasks/new",isauthenticated,newtask);

router.get("/tasks/my",isauthenticated,getmytask);
router.route("/tasks/:id").put(isauthenticated,updatetask).delete(isauthenticated,deletetask); // /:id isliye h kyuki yaha hum specific id denge
// usko ye update ya delete krega
export default router;
