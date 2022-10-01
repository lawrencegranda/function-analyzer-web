import express from "express";
import { resolve } from "path";

// const express = require('express') ;
// const { resolve } = require('path') ;

const app = express() ;

//app.use("/static", express.static(path.resolve(__dirname, "frontend", "static"))) ;

app.get("/*", (req, res) => {
    res.sendFile(resolve(__dirbame, "frontend", "index.html")) ;
}) ;

app.listen(process.env.PORT || 5060, () => console.log("Server running...")) ;