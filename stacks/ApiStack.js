import { Api, use } from "@serverless-stack/resources";
import { StorageStack } from "./StorageStack";

export function ApiStack({ stack, app }) {
  const { table } = use(StorageStack);

  // create the API
  const api = new Api(stack, "Api", {
    defaults: {
      function: {
        permissions: [table],
        environment: {
          TABLE_NAME: table.tableName,
        },
      },
    },
    routes: {
      "POST /notes": "src/create.main",
      "GET /notes/{id}": "src/get.main",
      "GET /notes": "src/list.main",
      "PUT /notes/{id}": "src/update.main",
      "DELETE /notes/{id}": "src/delete.main",
    },
  });

  // Show the API endpoint in the output
  stack.addOutputs({
    ApiEndPoint: this.api.url,
  });

  // return the api resource
  return {
    api,
  };
}
