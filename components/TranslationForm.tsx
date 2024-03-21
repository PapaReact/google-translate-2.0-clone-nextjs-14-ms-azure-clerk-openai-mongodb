"use client";

import translate from "@/actions/translate";
import { TranslationLanguages } from "@/app/translate/page";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import SubmitButton from "./SubmitButton";
import { ITranslation, getTranslations } from "@/mongodb/models/User";
import { useAuth } from "@clerk/nextjs";

const initialState = {
  inputLanguage: "auto",
  input: "",
  outputLanguage: "es",
  output: "",
};

export type State = typeof initialState;

function TranslationForm({ languages }: { languages: TranslationLanguages }) {
  const [state, formAction] = useFormState(translate, initialState);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [translations, setTranslations] = useState<ITranslation[]>([]);
  const { userId } = useAuth();

  // useEffect(() => {
  //   if (!userId) return;
  //   getTranslations(userId).then((translations) =>
  //     setTranslations(translations)
  //   );
  // }, [userId]);

  useEffect(() => {
    if (state.output) {
      setOutput(state.output);
    }
  }, [state]);

  return (
    <>
      <form action={formAction}>
        {/* select field */}
        <select name="inputLanguage" defaultValue="auto">
          {Object.entries(languages.translation).map(([key, value]) => (
            <option key={key} value={key}>
              {value.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="input"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />

        <select name="outputLanguage" defaultValue="es">
          {Object.entries(languages.translation).map(([key, value]) => (
            <option key={key} value={key}>
              {value.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="output"
          value={output}
          onChange={(e) => {
            setOutput(e.target.value);
          }}
        />

        <SubmitButton disabled={!input} />
      </form>

      <ul>
        {translations.map((translation) => (
          <li key={translation._id}>
            <p>
              {translation.fromText} ({translation.from}) - {translation.toText}{" "}
              ({translation.to})
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default TranslationForm;
