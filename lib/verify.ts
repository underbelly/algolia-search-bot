import { NowRequest, NowResponse } from '@now/node'
import * as crypto from 'crypto'
import qs from 'qs'

const slackSigningSecret = process.env.SLACK_SIGNING_SECRET!;

export const isFromSlack = (req: NowRequest, res: NowResponse): Boolean => {
  const slackSignature = String(req.headers['x-slack-signature']);
  const requestBody = qs.stringify(req.body, {format : 'RFC1738'});
  const timestamp = Number(req.headers['x-slack-request-timestamp']);
  const time = Math.floor(new Date().getTime()/1000);
  if (!timestamp || Math.abs(time - timestamp) > 300) {
    return false
  }
  if (!slackSigningSecret || !slackSignature) {
    return false
  }
  let sigBasestring = 'v0:' + timestamp + ':' + requestBody;
  let mySignature = 'v0=' + 
    crypto.createHmac('sha256', slackSigningSecret)
    .update(sigBasestring, 'utf8')
    .digest('hex');

  if (crypto.timingSafeEqual(
    Buffer.from(mySignature, 'utf8'),
    Buffer.from(slackSignature, 'utf8'))
  ) {
    return true
  } else {
    return false
  }
}


