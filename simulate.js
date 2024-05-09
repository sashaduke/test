// simulate-semantic-release.js
const { sync: analyzeCommits } = require('@semantic-release/commit-analyzer');
const { sync: generateNotes } = require('@semantic-release/release-notes-generator');

async function simulateSemanticRelease(commits) {
  const config = {
    repositoryUrl: "https://github.com/sashaduke/test.git",
    branches: ["main"],
    plugins: [
      [
        "@semantic-release/commit-analyzer",
        {
          releaseRules: [
            { type: "feat", release: "minor" },
            { type: "feat!", release: "major" },
            { type: "fix", release: "patch" },
            { type: "fix!", release: "major" },
            { type: "docs", release: "patch" },
            { type: "docs!", release: "major" },
            { type: "style", release: "patch" },
            { type: "style!", release: "major" },
            { type: "refactor", release: "patch" },
            { type: "refactor!", release: "major" },
            { type: "perf", release: "patch" },
            { type: "perf!", release: "major" },
            { type: "test", release: "patch" },
            { type: "test!", release: "major" },
            { type: "build", release: "patch" },
            { type: "build!", release: "major" },
            { type: "ci", release: "patch" },
            { type: "ci!", release: "major" },
            { type: "chore", release: "patch" },
            { type: "chore!", release: "major" }
          ],
          parserOpts: {
            headerPattern: /^(\w+)(\((.*)\))?(!)?:\s*(.*)/,
            breakingHeaderPattern: /^(\w+)!:/
          }
        }
      ],
      "@semantic-release/release-notes-generator",
      "@semantic-release/changelog",
      [
        "@semantic-release/git",
        {
          assets: ["CHANGELOG.md"],
          message: "chore(release): ${nextRelease.gitTag} [skip ci]\n\n${nextRelease.notes}"
        }
      ],
      [
        "@semantic-release/github",
        {
          assets: [
            { "path": "CHANGELOG.md", "label": "CHANGELOG" }
          ],
          successComment: false,
          failComment: false
        }
      ]
    ],
    noCi: true
  };

  // Process each commit to determine the type of release
  for (const commit of commits) {
    const type = analyzeCommits(config.plugins[0][1], { commits: [commit], logger: console });
    const notes = generateNotes(config.plugins[0][1], { commits: [commit], logger: console, options: {} });

    console.log(`Commit: ${commit.message}`);
    console.log(`Release type: ${type}`);
    console.log(`Release notes: ${notes}`);
  }
}

// Example commit messages to test
const exampleCommits = [
  { message: 'feat: add new feature' },
  { message: 'fix!: critical bug fixed' },
  { message: 'refactor!: add README' },
  { message: 'chore: update dependencies' }
];

simulateSemanticRelease(exampleCommits);

