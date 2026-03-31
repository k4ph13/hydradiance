# Hydradiance
Information about the project goes here.

## Setup

Download Node.js v24.14.1 (LTS) from https://nodejs.org/en/download

```bash
# Download and install latest version of nvm from github https://github.com/nvm-sh/nvm or from nodejs.org (if latest version)

# Download and install Node.js:
nvm install 24

# Verify the Node.js version:
node -v # Should print "v24.14.1"

# Verify npm version:
npm -v # Should print "11.11.0"
```

Make sure to install dependencies:

```bash
# npm
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build
```

Locally preview production build:

```bash
# npm
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
