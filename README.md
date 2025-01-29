# League Broadcast React App

This is a React application that integrates with League Broadcast to display custom overlays during champ select and in-game.

## Prerequisites

- Node.js installed (version 16 or higher)
- NPM or Yarn installed
- League Broadcast installed and configured

## How to Run the Project

1. **Open League Broadcast**
   - Make sure League Broadcast is installed and running correctly.

2. **Enable Champ Select and In-Game**
   - In League Broadcast, enable the `Champ Select` and `In-Game` options so the app can capture the necessary data.

3. **Disable Mock for Both Overlays**
   - In League Broadcast, disable the `Mock` option for both overlays (`Champ Select` and `In-Game`) to ensure the app receives real game data.

4. **Start the React App**
   - Navigate to the React project directory in your terminal and run the following command to start the development server:

```bash
npm run dev
```

   - Or, if you're using Yarn:

```bash
yarn dev
```

   - The React app will start and be available at `http://localhost:3000` (or another port if configured).

## Project Structure

- `src/`: Contains the React application source code.
- `public/`: Contains static files like `index.html`.
- `package.json`: Contains project dependencies and scripts.

## Dependencies

Make sure all project dependencies are installed. To install the dependencies, run:

```bash
npm install
```

or

```bash
yarn install
```

## Contributing

If you'd like to contribute to this project, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).