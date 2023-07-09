import express from "express";

import {getAllUser, getUserDetail, login, registerUser } from "../controllers/users.js";


const router = express.Router();


router.post("/new",registerUser);


router.get("/all",getAllUser);

router.post("/login",login);


router.route("/name/:id").get(getUserDetail);



export default router ;