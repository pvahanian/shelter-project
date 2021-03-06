# Shelter Project
*This project was bootstrapped with [Create React App].*

This project (currently in the mockup stage), is intended to replace the current resource navigator which 211 provides on their [website](https://www.211info.org/).


## Background

2-1-1 is a reserved telephone number in the US which is intended to make finding social services easier. Depending on your location when you make the call, 2-1-1 will lead to one of approximately 250 different organizations. For Oregon, and Washington counties Cowlitz, Skamania, Clark, and Wahkiakum 2-1-1 leads to [211info](https://www.211info.org/).


## Tech Stack

| Component | Tech    |
|-----------|---------|
| Frontend  | React   |
| Backend   | Node.js |

----------------

## Install & Setup

After installing npm (Node Package Manager) or a virtual environment system like npx, this repo's requirements are downloaded with

### `npm install`

## Set Environment Variables

We currently use two environment variables: `REACT_APP_211_API_KEY`
Set these to the proper value with:

`export REACT_APP_211_API_KEY=J7R0W5XK`
`export REACT_APP_CENSUS_API_KEY=828d15da3d6b751cc242cc822adf5eba189827e5`

Usually it would be **VERY** bad practice to expose the API key in your README, or anywhere else in your code. However the way this API is constructed means that your key is always public. Our project will build using standard secure patterns, but know that this key is not secure.

-----------------

## Available Scripts
In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify


[Create React App]: https://github.com/facebook/create-react-app
