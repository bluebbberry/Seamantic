import 'dotenv/config';

if (!process.env.URL || !process.env.MASTODON_API_TOKEN || !process.env.ACCOUNT_NAME) {
    console.error('Missing program arguments (pass through .env file: URL, MASTODON_API_TOKEN, ACCOUNT_NAME)!');
    process.exit(1);
}

const URL = process.env.URL;
const MASTODON_API_TOKEN = process.env.MASTODON_API_TOKEN;
const ACCOUNT_NAME = process.env.ACCOUNT_NAME;

export {URL, ACCOUNT_NAME, MASTODON_API_TOKEN};
