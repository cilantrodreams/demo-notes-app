import * as uuid from "uuid";
import AWS from "aws-sdk";

const dynamoDB = new AWS.DynamoDB.DocumentClient();

export async function main(event) {
  // request body is passed in as a JSON encoded string in 'event.body'
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

  try {
    await dynamoDB.put(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message }),
    };
  }
}
