const express = require("express");
const { nextTick } = require("process");
const router = express.Router();
const { getAllUsers, getOneUser , addUser, removeUser, updateUser} = require("../db/queries/users")

router.get("/:id?", async (req, res, next) => {
    try {
        let username = req.params.id;
        if(username){
            let data = await getOneUser(username);
            res.send(data)
        }else{
            let data = await getAllUsers();
            res.send(data)
        }
    } catch (error) {
        next(error)
    }
   
})

router.post("/", async (req, res, next) => {
    try {
        let {body} = req;
        let data = await addUser(body);
        res.send(data);
    } catch (error) {
        next(error)
    }
  
})

router.delete("/:id", async (req, res, next) => {
    try {
        let username = req.params.id;
        let data = await removeUser(username);
        res.send(data);
    } catch (error) {
        next(error)
    }
   
})

router.put("/:id", async (req, res, next) => {
    try {
        let username = req.params.id;
        let {body} = req;
        let data = await updateUser(body, username)
        res.send(data)
        
    } catch (error) {
        next(error)
    }

})


module.exports = router;