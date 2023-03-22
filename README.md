# zod-issue-repro-parse-removes-prop
Reproduce an issue I'm having with Zod so I can ask about it online

## Reproduction steps
1. Clone this repo: `git clone git@github.com:shawninder/zod-issues-repro-parse-removes-prop.git`
2. Install dependencies: `npm i`
3. Run the code: `node index.js`
4. EXPECT the `options` and `validOptions` to be equivalent (same props, same values)
5. OBSERVE the `validOptions` is missing its `a` prop after `schema.parse`

Seems to me like `validOptions` should be the same as `options` since `options` is a valid instance of the defined schema…
