# Modernizr - Browser Feature Detection

Modernizr is a package is a customisable set of tests to check if the browser running the survey app has the required features. 

## Usage:
1) Add/Remove required features from `modernizr-config.json`. There is a list of features modernizr is able to detect available at: https://github.com/Modernizr/Modernizr/blob/master/lib/config-all.json
2) From the modernizr directory run 
```modernizr -c modernizr-config.json```
This will generate `modernizr.js`, minified js that has the browser feature tests.
3) `modernizr.js` is included in `src/Components/App.tsx` where the tests are run. The survey app is not loaded if any fail.