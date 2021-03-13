# Note: Not maintained...

## Citatify

Community for sharing and reading quotes with user management.<br/>
**Keywords:** React, Context, Firestore / Firebase, Google OAuth, ES6+, Async / Await, CSS, MD Bootstrap, Spring Animation.

---

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

#### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run build && firebase deploy`

Builds the app and deploys it to Firebase with hosting features. In order to do this you have to initialize a Firebase project that can be used for the Firebase hosting features. Step by step guide:

1. `npm install` to install all dependencies and packages
2. `firebase login` to associate the Firebase CLI with a Firebase account
3. `firebase init` will initialize a Firebase project that can be used for the Firebase hosting features
4. Follow the guide in Firebase CLI to configure
5. `firebase deploy` to deploy the application

After the initial initialization you can run `npm run build && firebase deploy` to build and deploy to Firebase.
