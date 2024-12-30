import masto from "../configs/mastodonclient.js";

async function send(message) {
    const status = await masto.v1.statuses.create({
        status: message,
    });
    console.log(status.url);
}

export { send };
