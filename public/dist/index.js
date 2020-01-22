"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_api_1 = require("@slack/events-api");
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const slackEvents = events_api_1.createEventAdapter(slackSigningSecret);
// Read the port from the environment variables, fallback to 3000 default.
slackEvents.on('message', (event) => {
    console.log(`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);
});
(async () => {
    const server = await slackEvents.createServer();
    server.listen(3000);
})();
// import { createServer } from 'http'
// import { NowRequest, NowResponse } from '@now/node'
// import algoilasearch from 'algoliasearch';
// import { createEventAdapter } from '@slack/events-api'
// const slackEvents = createEventAdapter(process.env.SLACK_SIGNING_SECRET!)
// const port = process.env.PORT || 3000
// slackEvents.on('message', (event) => {
//   console.log(`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);
// })
// slackEvents.on('error', console.error)
// export default async (request: NowRequest, response: NowResponse) => {
//   const web = new WebClient(process.env.SLACK_TOKEN)
//   const client = algoilasearch(process.env.ALGOLIA_SPACE!, process.env.ALGOLIA_TOKEN!)
//   const index = client.initIndex('documents');
//   const results = await index.search({ query: 'holiday' })
//   console.dir(results, { depth: Infinity })
//   response.status(200).send(`${results.hits.length} Results`)
// }
