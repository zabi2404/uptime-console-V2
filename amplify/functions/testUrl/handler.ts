
import axios from "axios";


// const client = new DynamoDBClient({
//   region: "us-east-1"
// });
// const db = DynamoDBDocumentClient.from(client);

export const handler = async (event: { url: string }) => {

  const url = event.url;
  
  try {
const response = await axios.get(url);
console.log("reponse from axios",response.data);

if(response.data === "PONG" || response.status === 200) {
  return {
    statusCode: 200,
    message: JSON.stringify({ message: "Server is running!" }),
  };
}

  return response;
 } catch (error) {
  console.log(error);
 }

};