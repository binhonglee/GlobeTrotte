module.exports = {
  resolveSnapshotPath: (testPath, snapshotExtension) =>
    testPath
      .replace(/.spec.ts/, '.spec' + snapshotExtension)
      .replace(/cockpit\/tests/, 'cockpit/tests/__snapshots__'),

  resolveTestPath: (snapshotFilePath, snapshotExtension) =>
    snapshotFilePath
      .replace(snapshotExtension, '.ts')
      .replace('/__snapshots__', ''),

  testPathForConsistencyCheck: 'src/cockpit/tests/components/some.spec.ts',
}
