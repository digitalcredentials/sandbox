# DCC Sandbox 

The DCC Sandbox project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This is a tool intended for developer experimentation and not for production use.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000/sandbox](http://localhost:3000/sandbox) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

If you would like to test your own deployment of sign-and-verify and OIDC provider, please set the following variables on your machine:
- `OIDC_CONFIG_URL`: OIDC discovery URL
- `SIGN_AND_VERIFY_API_URL`: sign-and-verify API URL
- `PROVE_PRESENTATION_CHALLENGE`: challenge used to sign presentations
- `REQUEST_CREDENTIAL_CHALLENGE`: challenge used to request credentials

One way to do this is to set these values in a `.env` file at the root of this project like this:
```
OIDC_CONFIG_URL=https://oidc-provider.example.com
SIGN_AND_VERIFY_API_URL=https://sign-and-verify.example.com
PROVE_PRESENTATION_CHALLENGE=prove-prez-challenge-123
REQUEST_CREDENTIAL_CHALLENGE=req-cred-challenge-123
```

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


### Deployment

This react project is deployed using [github pages](https://create-react-app.dev/docs/deployment/#github-pages).

The `master` branch contains the code, and `gh-pages` contains the generated (to deploy) artifacts.

```
npm run deploy
```

