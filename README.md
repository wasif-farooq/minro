# Minro
This package enable a cli command to generate node es6 boilerplate that provide running node application using es6+ syntax. it also include bundling the node application so all you code combined in one file with minification so if you want to develop it you just need node installed and that single file.

### Install
```bash
npm i -g minro
```

### Creating Project using cli
```bash
// goto you directory where you want to creat new project
cd ~

// run this command
minro generate project myapp
``` 

it will generate the application for you.

### Starting / Running the code
```bash
// go inside the directory
cd myapp

// run npm or yarn install
npm install

// or if you using yarn then
yarn install

// to run dev envoirment using npm
npm run start:dev

// to run dev envoirment using yarn
yarn start:dev

```

### Creating the distribution
```bash
// to create distribution using npm
npm run build

// to create distribution using yarn
yarn build
```

### Run the distribution code
```bash
// using npm
npm start

// using yarn
yarn start

```

### Enviorment variables
there is file .env for envoirment variables you have to define variable like this
```.bash
NODE_APP_API_URL=http://localhost:4000
```
using NODE_APP as a prefix then you b able to access then in you application

### Linting
there is default config for lint you can change if you want that also include prettier to auto format you code
```bash
// using npm
npm run lint

using yarn
yarn lint

```

### Testing
we using jest as testing framework that support es6+ syntax to do unit testing.
to run the test
```bash
// using npm
npm test

// using yarn
yarn test
```

### License
MIT