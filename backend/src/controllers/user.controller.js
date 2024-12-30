import express from "express";
import * as Config from "../configs/config.js";
import masto from "../configs/mastodonclient.js";

const router = express.Router();

router.get("/", async (request, response) => {
    const acct = await masto.v1.accounts.lookup({
        acct: Config.ACCOUNT_NAME,
    });
    response.status(200).json({ requestBody: {
        "id": acct.id,
        "url": acct.url,
        "username": acct.username,
        "avatarStatic": acct.avatarStatic,
    }});
});

export default router;
