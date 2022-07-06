#  Displayr Survey Widget Frontend

## Build
### 1. Install dependencies
```
$ npm install
```
### 2. Build the package

#### For Deployment
```
$ npm run build
```
#### For Development
```
$ npm run build-dev
```

## Testing

### Full Testing (cross-browser w/ BrowserStack)
#### BROWSWERSTACK_ACCESS_KEY
Environment variable required to run our tests on the Displayr Browserstack account. Can be found at:
https://www.browserstack.com/accounts/settings

#### Run
```
$ npm test
```

#### Local Testing
```
$ npm run test-quick
```
#### Just the Surveying Application
```
$ npm run test-survey
```
#### Just the Survey Admin Page
```
$ npm run test-admin
```

## Linting
```
$ npm run lint
```
