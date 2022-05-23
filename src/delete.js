import handler from "./util/handler";
import dynamodb from "./util/dynamodb";

export const main = handler(async (event) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    // 'key' defines the partition key and sort key of the item to be removed
    Key: {
      userId: "123", // the id of the author (hardcoded for now)
      noteId: event.pathParameters.id, // the id of the note from the path
    },
  };

  await dynamodb.delete(params);

  return { status: true };
});
