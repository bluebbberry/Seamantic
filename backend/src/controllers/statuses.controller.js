import express from "express";
import * as Config from "../configs/config.js";
import masto from "../configs/mastodonclient.js";
import { sendMsgToServerOverSidekick } from "../services/sidekick.service.js";

const router = express.Router();

// post statuses to client
router.post("/", (request, response) => {
    // Send message to mastodon server
    console.log("Received message for " + request.body["sidekick"]);
    sendMsgToServerOverSidekick(request.body["message"], request.body["sidekick"]);
    response.sendStatus(200);
    response.end();
});

// get statuses from client
router.get("/home", async (request, response) => {
    try {
        // Send message to mastodon server
        const posts = await getPosts(Config.ACCOUNT_NAME);
        response.status(200).json({ requestBody: posts });
    } catch (error) {
        console.error("Error fetching posts:", error);
        response.status(500).json({ error: "Failed to fetch posts" });
    }
});

// get statuses from client
router.get("/local", async (request, response) => {
    try {
        // Send message to mastodon server
        const statuses = await masto.v1.timelines.home.list({
            limit: 30,
        });
        response.status(200).json({ requestBody: statuses });
    } catch (error) {
        console.error("Error fetching posts:", error);
        response.status(500).json({ error: "Failed to fetch posts" });
    }
});

// get statuses from client
router.get("/global", async (request, response) => {
    try {
        // Send message to mastodon server
        const statuses = await masto.v1.timelines.public.list({
            limit: 30,
        });
        response.status(200).json({ requestBody: statuses });
    } catch (error) {
        console.error("Error fetching posts:", error);
        response.status(500).json({ error: "Failed to fetch posts" });
    }
});

// get descendants of status
router.get("/:id/children", async (request, response) => {
    try {
        // Send message to mastodon server
        const context = await getParentAndChildren(request.params.id);
        const descendants = context.descendants.map(ancestor => {
            return {
                "id": ancestor.id,
                "createdAt": ancestor.createdAt,
                "content": cropStatusContent(ancestor.content)
            };
        });
        response.status(200).json({ requestBody: descendants });
    } catch (error) {
        console.error("Error fetching posts:", error);
        response.status(500).json({ error: "Failed to fetch posts" });
    }
});

// Function to fetch parent and childs of a post
async function getParentAndChildren(statusId) {
    console.log("StatusId:");
    console.log(statusId);
    let context = await masto.v1.statuses.$select(statusId).context.fetch();
    console.log("Context:");
    console.log(context);
    return context;
}

// Function to fetch posts
async function getPosts(accountName) {
    const acct = await masto.v1.accounts.lookup({
        acct: accountName,
    });
    console.log(`ID: ${acct.id}`);
    const id = acct.id;

    let posts = await masto.v1.accounts.$select(id).statuses.list();
    const firstPost = posts[0];
    console.log(firstPost);
    posts = posts.map((status) => {
        return {
            "content": cropStatusContent(status.content),
            "id": status.id,
            "createdAt": status.createdAt
        };
    });

    return posts;
}

function cropStatusContent(statusContent) {
    return statusContent.substring(3, statusContent.length - 4);
}

export default router;
