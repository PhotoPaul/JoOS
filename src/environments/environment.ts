// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

const isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';

export const environment = {
    production: false,
    version: 'dev', // %1.%2.%3 - %1: App Version, %2: New Feature Version, %3: Bug Fix Version
    appURI: isLocal ? 'http://localhost:4200/' : location.origin + '/joos/',
    apiURI: isLocal ? location.protocol + '//' + location.hostname + ':4201/joos-api/' : location.origin + '/joos-api/'
};
