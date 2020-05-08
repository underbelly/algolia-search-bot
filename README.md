Algolia Search Bot
====

Enables you to create a Slack `/slash` command that can search and returns
results from an Algolia space.

[![Deploy to Vercel](/button)](/import/project?template=https://github.com/underbelly/algolia-search-bot)

1. Make sure to add the following ENV secrets to the Vercel dashboard.

| Secret                 | Type   | Description                                                                                                                              |
| ------                 | ----   | ------                                                                                                                                   |
| `HOST`                 | URL    | If you have a frontend domain with a search page. Link for view more by applying a `?q=?` to the string. Ex `example.com/search?q=hello` |
| `SLACK_SIGNING_SECRET` | String | Verify search requests are coming from slack.                                                                                            |
| `ALGOLIA_TOKEN`        | String | Algolia API Token                                                                                                                        |
| `ALGOLIA_SPACE`        | String | Algolia Search                                                                                                                           |

2. Follow Slack [tutorial](https://api.slack.com/tutorials/your-first-slash-command) for creating a slack command.

If you find ways of making this tool more useful please submit PRs!



