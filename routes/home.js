import express from "express";
const router = express.Router();

//default endpoint for our main page
router.get("/", (req, res) => {
	res.send("hello world");
});

export default router;
