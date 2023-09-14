import dotenv from "dotenv"
console.log("hello world")
dotenv.config()

import axios from 'axios';

const GITHUB_TOKEN = 'process.env.KEY_GITHUB';

const GITHUB_API_URL = 'https://api.github.com/graphql';
const REPO_OWNER = 'governifyauditor';
const REPO_NAME = 'Bluejay-2023-showcase';

// Nombre de la nueva rama que deseas crear
const NEW_BRANCH_NAME = 'generated';

// Consulta GraphQL para crear una rama
const createBranchQuery = `
  mutation {
    createRef(input: {
      repositoryId: "ID_DEL_REPOSITORIO",
      name: "${NEW_BRANCH_NAME}",
      clientMutationId: "1"
    }) {
      ref {
        name
      }
    }
  }
`;

// Configuración de la solicitud GraphQL
const config = {
  headers: {
    'Authorization': `Bearer ${GITHUB_TOKEN}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

// Realiza la solicitud GraphQL para crear la rama
axios.post(GITHUB_API_URL, { query: createBranchQuery }, config)
  .then(response => {
    const createdBranchName = response.data.data.createRef.ref.name;
    console.log(`created branch: "${createdBranchName}"`);
  })
  .catch(error => {
    console.error('Error:', error);
  });
