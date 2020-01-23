import { NowRequest, NowResponse } from '@now/node'
import algoilasearch from 'algoliasearch';
import { isFromSlack } from '../lib/verify'

export default async (request: NowRequest, response: NowResponse) => {
  if(isFromSlack(request, response)){
    try {
    const client = algoilasearch(process.env.ALGOLIA_SPACE!, process.env.ALGOLIA_TOKEN!)
    const index = client.initIndex('documents');

    const results = await index.search({ 
      query: request.body.text ,
      highlightPostTag: '*',
      highlightPreTag: '*',
      hitsPerPage: 5
    })

    const blocks = [{
      type: "section",
      text: {
        type: "mrkdwn",
        text: `There are *${results.nbHits} Results* for *"${request.body.text}"*`
      }},{
        type: "divider"
      }
    ]

    results.hits.forEach(h => {
      const content = h._snippetResult.content.value.replace(/\r?\n|\r/g, " ");
      blocks.push(
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*<https://wiki.underbelly.is/${h.url}|${h.title}>*\n>${content}`
          }
      })
      blocks.push({
        type: "divider"
      })
    })

    blocks.push({
      type: "context",
      // @ts-ignore
      elements: [
        {
          "type": "mrkdwn",
          "text": `Search Time: ${results.processingTimeMS}ms`
        }
      ]
    })

    response.status(200).json({ blocks })
    }catch(error){
      console.error(error)
      response.status(400).send(`Bad Request`)
    }
  }else{
    response.status(406).send("Invalid")
  }
}

