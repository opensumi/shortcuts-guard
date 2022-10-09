import * as core from '@actions/core';
import { argv as _argv } from 'yargs';
import { readFileSync } from 'fs-extra';

const argv = _argv as {
  [x: string]: unknown;
  _: (string | number)[];
  $0: string;
};

// yarn run check-version -- -v=0.0.3
const version = argv.v as string;

const packageJson = 'package.json';
const manifestJson = 'src/manifest.json';

core.info(`Parsing ${packageJson}`);

const packageFileData = readFileSync(packageJson, 'utf8');
const packageVersion = JSON.parse(packageFileData).version;

core.info(`Version in ${packageJson}: ${packageVersion}`);
if (version !== packageVersion) {
  core.setFailed(`You should update the version in ${packageJson}`);
} else {
  core.info(`Pass`);
}

core.info(`Parsing ${manifestJson}`);

const manifestFileData = readFileSync(manifestJson, 'utf8');
const manifestVersion = JSON.parse(manifestFileData).version;

core.info(`Version in ${manifestJson}: ${manifestVersion}`);
if (version !== manifestVersion) {
  core.setFailed(`You should update the version in ${manifestJson}`);
} else {
  core.info(`Pass`);
}
