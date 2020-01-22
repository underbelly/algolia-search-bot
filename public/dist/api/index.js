"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const algoliasearch_1 = __importDefault(require("algoliasearch"));
const verify_1 = require("../lib/verify");
exports.default = async (request, response) => {
    if (verify_1.isFromSlack(request, response)) {
        const client = algoliasearch_1.default(process.env.ALGOLIA_SPACE, process.env.ALGOLIA_TOKEN);
        const index = client.initIndex('documents');
        const results = await index.search({
            query: request.body.text,
            highlightPostTag: '*',
            highlightPreTag: '*',
            hitsPerPage: 5
        });
        const blocks = [{
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: `There are *${results.nbHits} Results* for *"${request.body.text}"*`
                }
            }, {
                type: "divider"
            }
        ];
        results.hits.forEach(h => {
            const content = h._snippetResult.content.value.replace(/\r?\n|\r/g, " ");
            blocks.push({
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: `*<https://wiki.underbelly.is/${h.url}|${h.title}>*\n>${content}`
                }
            });
            blocks.push({
                type: "divider"
            });
        });
        blocks.push({
            type: "context",
            // @ts-ignore
            elements: [
                {
                    "type": "mrkdwn",
                    "text": `Search Time: ${results.processingTimeMS}ms`
                }
            ]
        });
        response.status(200).json({ blocks });
    }
    else {
        response.status(400).send(`Bad Request`);
    }
};
