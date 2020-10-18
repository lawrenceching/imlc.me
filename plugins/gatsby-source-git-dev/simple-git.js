const Git = require("simple-git/promise");

(async() => {
  const repo = await Git('/tmp/gitbook');
// const target = await getTargetBranch(repo, branch);
// // Refresh our shallow clone with the latest commit.
// await repo
// .fetch([`--depth`, `1`])
// .then(() => repo.reset([`--hard`, target]));

  // console.log(await repo.listRemote(["--get-url"]));
  const log = await repo.log({
    file: 'use-owasp-zap-to-scan-vulnerabilities.md'
  });
  console.log(JSON.stringify(log, null, 4));
  const latest = log.latest;
  const {date, message, author_name } = latest;
  console.log(date, message, author_name);
})();
