module.exports = {
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
          headerPattern: "^\\s*(\\w+)(?:\\((.*)\\))?\\s*(!)?\\s*:",
          breakingHeaderPattern: "^\\s*(\\w+)!\\s*:"
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
