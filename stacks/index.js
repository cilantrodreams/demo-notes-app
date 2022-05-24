import { StorageStack } from "./StorageStack";
import { ApiStack } from "./ApiStack";

export default function main(app) {
  // Set default runtime for all functions
  app.setDefaultFunctionProps({
    runtime: "nodejs14.x",
    bundle: {
      format: "esm",
    },
  });

  app.stack(StorageStack).stack(ApiStack);
}
