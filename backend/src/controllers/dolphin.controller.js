import express from "express";
import { knowledgeBase } from "../services/dolphin.service.js";

const router = express.Router();

router.get("/", async (request, response) => {
    response.status(200).json({ requestBody: {
        "knowledgeBase": knowledgeBase,
    }});
});

export default router;
