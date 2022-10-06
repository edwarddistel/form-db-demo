# Form/database demo project

This is a form/database project created just as a demo.

# Architectural overview

![](/img/form-db-arch.png)

`docker compose` creates 3 docker containers:

1. a NodeJS alpine instance
1. a Postgres database
1. a Pgadmin instance to visually manage postgres

The details of the Node app construction are contained in the [Dockerfile](/Dockerfile).

Docker version `20.10.8`, build `3967b7d` was used to create this.

NextJS is used take front-end React components and output them into static HTML/CSS/JS files.

Those files make asynchronous API calls to the Express server that performs all CRUD operations against the Postgres database, which is seeded by dummy data in [database-seed.sql](/database-seed.sql)

For the purposes of this example, these static HTML files are also hosted on the Express server.

# Prerequisites

- Docker `v20.10.8` (or compatible)
- Node `v16.17.1` (LTS as of Oct 2022)
  - `nvm` (Node Version Manager to switch to `v16.17.1`)
- Git

You must be logged into Docker to download the Docker images from the Docker Hub.

# Running locally

1. `nvm use` - switch to version specified in [.nvmrc](/,nvmrc/)
1. `docker compose up` - create and run Docker containers
1. `npm run build` - build static HTML files out of React components via NextJS into `/out`
1. Open browser and navigate to [http://localhost:8080](http://localhost:8080)

That's it! You should see all four tabs:

![](/img/customer-add.png)

## Mobile

The form uses a responsive CSS design from the `Tailwind` framework.

# Development tools

In the [package.json](/package.json) there are several `npm run` commands:

- `dev` - runs nodemon, which restarts the app upon changes to files
- `build` - rebuilds and exports the static HTML files via NextJS
- `format` - plugin Prettier tells you about style issues
- `format:fix` - plugin Prettier automatically fixes style issues
- `start` - start the NextJS app
- `lint` - NextJS will lint the app via ESLint

A typical dev setup would be:

1. In a terminal, run `docker compose up` to start the 3 containers
1. In a separate terminal, run `npm run build` to expost the files
1. Check [http://localhost:8080](http://localhost:8080) in your browser

## Express server routes

- [http://localhost:8080](http://localhost:8080) - form homepage (once built)
- [http://localhost:8080/status](http://localhost:8080/status) - Express status endpoint
- [http://localhost:8080/customers](http://localhost:8080/customers) - Return JSON of customers
- [http://localhost:8080/customers-add](http://localhost:8080/customers) - Add a customer to DB
- [http://localhost:8080/customers-update](http://localhost:8080/customers) - Update existing customer
- [http://localhost:8080/customers-delete](http://localhost:8080/customers) - Delete existing customer

## Linting

Linting happens automatically as part of the NextJS build process.

## Prettify

`npm run format:fix` is also useful but the purposes of this demo not automatically included as part of a commit hook.

# Why these frameworks were chosen

- `React` both for it's reusable components and its dominance in the front-end space
- `NextJS` to compile the React components into static HTML files. More performant and generally more stable
- `Redux` was **not** used to avoid complexities associated with state management, as form data should, by definition, be ephemeral
- `Formik` is a standard, open-source React-based form component that avoids Redux and state
  - Creating a basic HTML form isn't hard but it's helpful to have the validation tools baked into an established component
- `Tailwind CSS` is a CSS framework designed for React. It inverts a lot of the historical CSS principles in favor of a modular approach that makes it easier to manage large, complex apps
- `docker` to containerize the app and make the builds as idempotent and reproducible as possible
- `git` to version control the code
- `nodemon, prettier, eslint` as development tools to make coding faster, prettier, more standardized
- `dotenv` to store the database credentials, even though this is just a demo app
- `axios` to make API calls to the Express server from the HTML files; it's cleaner and easier than the native NodeJS method

# Improvements

Many things before this could go to production:

- Automated `mocha`, `chai` and `jest` tests of server and React elements
- `Terraform` scripts provisioning resources (probably in a different repo), possibly any relevant `Helm` charts for `Postgres` or `Node`
  - Lower environments (server, DB, static files)
- Database replica set
- Logging via Splunk
- Telemetry - New Relic, Datadog, AWS teletmetry or even basic pings of the health check endpoint, Slack alerts
- Database credentials pulled from a secrets manager
- Load balancer (typically an ALB from AWS) and use `blue/green` deployments for zero downtime
- A CDN like `Fastly`, `Cloudfront`, `Cloudflare` or `Akamai`
- A WAF to improve security, limit DDOS attempts
- More sophisticated validation than the basic client-side and server-side checks currently in place
- TypeScript for better type checking of variables passed through the app
- In the DB operations, make deletes a soft delete that marks them as `inactive` rather than a hard delete that physically removes a row
- Code cleanup - e.g. the `customer.js` model isn't reliably used everywhere, some places the values are hardcoded
- `404` page
- `rate limiting` to the server to limit DDOS attempts
- TLS, aka HTTPS both to the server and database
- Update the form after submissions
- Static assets hosted off the server and somewhere like `S3` instead
- Accessibility review, especially for form elements

# Theoretical deployment in AWS

![](/img/classic-aws-arch.png)
