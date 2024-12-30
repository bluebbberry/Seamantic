import { addToCollective } from "./buzz.service.js";
import { send } from "./post.util.service.js";
import { addToKnowledgeBase } from "./dolphin.service.js";
import * as Config from "../configs/config.js";

export async function sendMsgToServerOverSidekick(message, sidekick) {
    if (sidekick === 'spark') {
        message = message.toUpperCase();
        await send(message);
    } else if (sidekick === 'jea') {
        const msgSplit = splitAfterHash(message);
        if (msgSplit.length > 1 && isNumeric(msgSplit[0].substring(1))) {
            const noOfMinutes = Number(msgSplit[0].substring(1));
            const restOfMessage = msgSplit[1];
            setTimeout(() => send(restOfMessage), 1000 * noOfMinutes * 60);
        } else {
            await send(message);
        }
    } else if (sidekick === 'ennui') {
        const lowEffortMessage = makeLookLowEffort(message);
        await send(lowEffortMessage);
    } else if (sidekick === 'hamlet') {
        const shakespearQuotes = getRandomQuote();
        await send(message + " - " + shakespearQuotes);
    } else if (sidekick === 'legion') {
        const msgSplit = splitAfterHash(message);
        if (msgSplit.length > 1 && isNumeric(msgSplit[0].substring(1))) {
            const noOfRepeats = Number(msgSplit[0].substring(1));
            const restOfMessage = msgSplit[1];
            for (let i = 0; i < noOfRepeats; i++) {
                await send(restOfMessage);
            }
        } else {
            await send(message);
        }
    } else if (sidekick === 'dolphin') {
        await send(message);
        addToKnowledgeBase(Config.ACCOUNT_NAME, message);
    } else if (sidekick === 'buzz') {
        addToCollective(message);
    } else {
        await send(message);
    }
}

// from https://stackoverflow.com/questions/175739/how-can-i-check-if-a-string-is-a-valid-number
function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

function splitAfterHash(str) {
    if (str[0] !== '#') { return [str]; }
    const msgSplit = str.split(" ");
    if (msgSplit.length <= 1) { return [str]; }
    const command = msgSplit[0];
    const restOfTheText = str.substring(command.length + 1);
    return [command, restOfTheText];
}

function getRandomQuote() {
    const shakespearQuotes = [
        "To be, or not to be: that is the question",
        "All the world's a stage, and all the men and women merely players",
        "Romeo, Romeo! Wherefore art thou Romeo?",
        "What's in a name? That which we call a rose by any other name would smell as sweet",
        "To thine own self be true",
        "Neither a borrower nor a lender be",
        "How sharper than a serpent's tooth it is to have a thankless child!",
        "Love is not love which alters when it alteration finds",
        "We know what we are, but know not what we may be",
        "There is nothing either good or bad but thinking makes it so",
        "How poor are they that have not patience! What wound did ever heal but by degrees?",
        "To do a great right do a little wrong",
        "The course of true love never did run smooth",
        "Double, double toil and trouble; Fire burn and cauldron bubble",
        "Friends, Romans, countrymen, lend me your ears",
        "Something is rotten in the state of Denmark",
        "Cowards die many times before their deaths; The valiant never taste of death but once",
        "I am thy father's spirit; doom'd for a certain term to walk the night"
    ];

    const randomIndex = Math.floor(Math.random() * shakespearQuotes.length);
    const randomQuote = shakespearQuotes[randomIndex];

    return `${randomQuote} (William Shakespeare)`;
}

function makeLookLowEffort(text) {
    // Convert to lowercase
    let lowerCaseText = text.toLowerCase();

    // Remove punctuation
    let noPunctuation = lowerCaseText.replace(/[.,!?()-]/g, '');

    // Function to generate a random typo
    function getRandomTypos() {
        const typos = [
            (text, pos) => String.fromCharCode(text.charCodeAt(pos) + 1),
            (text, pos) => String.fromCharCode(text.charCodeAt(pos) - 1),
        ];

        return () => {
            const pos = Math.floor(Math.random() * noPunctuation.length);
            const typoFunc = typos[Math.floor(Math.random() * typos.length)];
            return typoFunc(noPunctuation, pos);
        };
    }

    // Add a random typo
    const typoGenerator = getRandomTypos();
    const typoIndex = Math.floor(Math.random() * noPunctuation.length);
    const typo = typoGenerator();

    // Replace the character at the chosen position with the typo
    return noPunctuation.slice(0, typoIndex) + typo + noPunctuation.slice(typoIndex + 1);
}
