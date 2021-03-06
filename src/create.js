import * as uuid from "uuid";
import handler from "./util/handler";
import dynamoDb from "./util/dynamodb";

export const main = handler(async (event) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      // the attributes of the item to be created
      userId: "123", // the id of the author
      noteId: uuid.v1(), // a unique uuid
      content: data.content, // Parsed from request body
      attachment: data.attachment, // parsed from request body
      createdAt: Date.now(), // current unix timestamp
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});
