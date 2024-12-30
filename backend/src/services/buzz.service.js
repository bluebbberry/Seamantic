import * as cron from "node-cron";
import {send} from "./post.util.service.js";

// name: message
let collective = {};

cron.schedule('0 * * * *', () => {
    if (Object.keys(collective).length > 0) {
        const resultCollective = shuffleAndClearCollective();
        sendResultCollective(resultCollective);
    } else {
        console.info("Buzz has nothing to post.");
    }
});

function addToCollective(username, message) {
    if (collective[username]) {
        collective[username].push(message);
    } else {
        collective[username] = [];
    }
}

// from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
    let currentIndex = array.length;
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
}

function shuffleAndClearCollective() {
    const result = {};
    const collectiveCopy = {};
    Object.assign(collectiveCopy, collective);
    // reset old
    collective = {};
    const keys = Object.keys(collective);
    shuffle(keys);
    for (let i = 0; i < Object.keys(collectiveCopy).length; i++) {
        const key = keys[i];
        result[key] = Object.values(collectiveCopy)[i];
    }

    return result;
}

function sendResultCollective(postBatchesDict) {
    for (const userName of Object.keys(postBatchesDict)) {
        for (const postBatch of postBatchesDict[userName]) {
            for (const post of postBatch) {
                send(post);
            }
        }
    }
}

export {
    addToCollective
};
