# Compound dashboard

This project is a dashboard displaying information on various chemical compounds.

### Running the dashboard locally

To run the project on your local machine, first ensure that you have Docker installed (see [this link](https://docs.docker.com/get-docker/) for installation steps). Then clone this repository, and from within the root of the repo (i.e. the folder containing this file) run:

```bash
docker-compose up --build
```

Once the docker containers have built successfully, you should see output along the lines of:

```console
frontend_1  | Compiled successfully!
frontend_1  |
frontend_1  | You can now view frontend in the browser.
frontend_1  |
frontend_1  |   Local:            http://localhost:3000
```

Navigate to http://localhost:3000 and you should be able to view the dashboard.

### Technical details

This project uses Python and Django on the backend, connected to a PostgreSQL database, which automatically loads the data into the database when the initial migrations are run. This data is then exposed via a Rest API, which is consumed by a React frontend written in TypeScript. Docker is used to containerize each of the aforementioned components of the dashboard.
