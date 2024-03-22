"use client";

import translate from "@/actions/translate";
import { TranslationLanguages } from "@/app/translate/page";
import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import SubmitButton from "./SubmitButton";
import { ITranslation } from "@/mongodb/models/User";
import { useAuth } from "@clerk/nextjs";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const submitBtnRef = useRef<HTMLButtonElement>(null);

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

  useEffect(() => {
    if (!input) return;

    const delayDebounceFn = setTimeout(() => {
      console.log(input);
      submitBtnRef.current?.click();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [input]);
  return (
    <form action={formAction}>
      <div className="flex flex-col space-y-2 lg:flex-row lg:space-y-0 lg:space-x-2">
        <div className="flex-1 space-y-2">
          <Select name="inputLanguage" defaultValue="auto">
            <SelectTrigger className="w-[280px] border-none text-blue-500 font-bold">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Want us to figure it out?</SelectLabel>

                <SelectItem key="auto" value="auto">
                  Auto-Detection
                </SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Language</SelectLabel>
                {Object.entries(languages.translation).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Textarea
            placeholder="Type your message here."
            name="input"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
        </div>

        <div className="flex-1 space-y-2">
          <Select name="outputLanguage" defaultValue="es">
            <SelectTrigger className="w-[280px] border-none text-blue-500 font-bold">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Language</SelectLabel>
                {Object.entries(languages.translation).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Textarea
            className="bg-gray-50 border-none"
            placeholder="Translation will appear here..."
            name="output"
            value={output}
            onChange={(e) => {
              setOutput(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="mt-5 flex justify-end">
        <SubmitButton disabled={!input} />
        <button type="submit" hidden ref={submitBtnRef} />
      </div>
    </form>
  );
}

export default TranslationForm;
