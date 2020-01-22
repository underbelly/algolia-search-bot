"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = __importStar(require("crypto"));
const qs_1 = __importDefault(require("qs"));
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
exports.isFromSlack = (req, res) => {
    const slackSignature = String(req.headers['x-slack-signature']);
    const requestBody = qs_1.default.stringify(req.body, { format: 'RFC1738' });
    const timestamp = Number(req.headers['x-slack-request-timestamp']);
    const time = Math.floor(new Date().getTime() / 1000);
    if (!timestamp || Math.abs(time - timestamp) > 300) {
        return false;
    }
    if (!slackSigningSecret || !slackSignature) {
        return false;
    }
    let sigBasestring = 'v0:' + timestamp + ':' + requestBody;
    let mySignature = 'v0=' +
        crypto.createHmac('sha256', slackSigningSecret)
            .update(sigBasestring, 'utf8')
            .digest('hex');
    if (crypto.timingSafeEqual(Buffer.from(mySignature, 'utf8'), Buffer.from(slackSignature, 'utf8'))) {
        return true;
    }
    else {
        return false;
    }
};
