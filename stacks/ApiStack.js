import * as sst from "@serverless-stack/resources";

export default class ApiStack extends sst.Stack {
  // public reference to API
  api;

  constructor(scope, id, props) {
    super(scope, id, props);

    const { table } = props;
  }
}
