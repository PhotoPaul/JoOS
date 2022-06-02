// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
    production: false,
    version: 'dev', // %1.%2.%3 - %1: App Version, %2: New Feature Version, %3: Bug Fix Version
    appURI: 'http://localhost:4200/',
    apiURI: 'http://localhost:4201/joos-api/'
};
