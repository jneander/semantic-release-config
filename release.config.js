const releaseNoteTypes = [
  {type: 'feat', section: 'Features'},
  {type: 'feature', section: 'Features'},
  {type: 'fix', scope: 'deps', section: 'Dependency Updates'},
  {type: 'chore', scope: 'deps', section: 'Dependency Updates'},
  {type: 'fix', section: 'Bug Fixes'},
  {type: 'perf', section: 'Performance Improvements'},
  {type: 'revert', section: 'Reverts'},
  {type: 'docs', section: 'Documentation', hidden: true},
  {type: 'style', section: 'Styles', hidden: true},
  {type: 'chore', section: 'Miscellaneous Chores', hidden: true},
  {type: 'refactor', section: 'Code Refactoring', hidden: true},
  {type: 'test', section: 'Tests', hidden: true},
  {type: 'build', section: 'Build System', hidden: true},
  {type: 'ci', section: 'Continuous Integration', hidden: true},
]

module.exports = {
  branches: ['main'],

  plugins: [
    // Determine version level, if any, based on semantic commit messages.
    '@semantic-release/commit-analyzer',

    // Generate notes for the version tag.
    ['@semantic-release/release-notes-generator', {presetConfig: {types: releaseNoteTypes}}],

    // Update the changelog.
    [
      '@semantic-release/changelog',

      {
        changelogTitle:
          // This must have the line breaks included that Prettier will add, else it will duplicate this on every write
          '# Changelog\n\nAll notable changes to this project will be documented in this file.\n\nThe format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project\nadheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).\n\nSee [Conventional Commits](https://conventionalcommits.org) for commit guidelines.',
      },
    ],

    // Format the changelog.
    ['@semantic-release/exec', {prepareCmd: 'npx prettier --write CHANGELOG.md'}],

    // Publish to npm.
    '@semantic-release/npm',

    // Create release on GitHub.
    '@semantic-release/github',

    // Commit version bump and changes to changelog.
    ['@semantic-release/git', {assets: ['CHANGELOG.md', 'package.json', 'package-lock.json']}],
  ],

  preset: 'conventionalcommits',
}
