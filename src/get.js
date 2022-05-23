import handler from "./util/handler";
import dynamodb from "./util/dynamodb";

export const main = handler(async (event) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    // 'key' defines the partition key and sort key of the item to be retrieved
    Key: {
      userId: "123", // The id of the author
      noteId: event.pathParameters.id, // The id of the note from the path
    },
  };

  const result = await dynamodb.get(params);
  if (!result.Item) {
    throw new Error("Item not found.");
  }

  // return the retrieved item
  return result.Item;
});
