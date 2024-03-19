"use server";

import { State } from "@/components/TranslationForm";
import axios from "axios";
import { v4 } from "uuid";

const key = process.env.AZURE_TEXT_TRANSLATION_KEY;
const endpoint = process.env.AZURE_TEXT_TRANSLATION;
const location = process.env.AZURE_TEXT_LOCATION;

async function translate(prevState: State, formData: FormData) {
  const rawFormData = {
    input: formData.get("input"),
    inputLanguage: formData.get("inputLanguage"),
    output: formData.get("output"),
    outputLanguage: formData.get("outputLanguage"),
  };

  //   console.log(">>> ", rawFormData);

  const response = await axios({
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
      from:
        rawFormData.inputLanguage === "auto" ? null : rawFormData.inputLanguage,
      to: rawFormData.outputLanguage,
    },
    data: [
      {
        text: rawFormData.input,
      },
    ],
    responseType: "json",
  });

  const data = response.data;

  console.log(JSON.stringify(data, null, 4));

  if (data.error) {
    console.log(`Error ${data.error.code}: ${data.error.message}`);
  }

  return {
    ...prevState,
    output: data[0].translations[0].text,
  };
}

export default translate;
