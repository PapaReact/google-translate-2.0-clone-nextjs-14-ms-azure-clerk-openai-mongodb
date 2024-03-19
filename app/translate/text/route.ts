import axios from "axios";
import { v4 } from "uuid";

let key = process.env.AZURE_TEXT_TRANSLATION_KEY;
let endpoint = process.env.AZURE_TEXT_TRANSLATION;
let location = process.env.AZURE_TEXT_LOCATION;

export async function POST() {
  console.log(key, endpoint, location);

  await axios({
    baseURL: endpoint,
    url: "translate",
    method: "POST",
    headers: {
      "Ocp-Apim-Subscription-Key": key!,
      "Ocp-Apim-Subscription-Region": location!,
      "Content-type": "application/json",
      "X-ClientTraceId": v4().toString(),
    },
    params: {
      "api-version": "3.0",
      // from: "en", // auto-detection if this isnt selected
      to: "es",
    },
    data: [
      {
        text: "I would really like to drive your car around the block a few times!",
      },
    ],
    responseType: "json",
  })
    .then(function (response) {
      console.log(JSON.stringify(response.data, null, 4));
    })
    .catch((err) => {
      console.log(err);
    });

  return Response.json({ data: "Hello World" });
}
