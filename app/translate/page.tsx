import TranslationForm from "@/components/TranslationForm";
import { auth } from "@clerk/nextjs/server";

export type TranslationLanguages = {
  translation: {
    [key: string]: {
      name: string;
      nativeName: string;
      dir: "ltr" | "rtl";
    };
  };
};

async function TranslatePage() {
  auth().protect();

  const response = await fetch(
    "https://api.cognitive.microsofttranslator.com/languages?api-version=3.0",
    {
      next: {
        revalidate: 60 * 60 * 24,
      },
    }
  );

  const languages = (await response.json()) as TranslationLanguages;
  languages.translation["auto"] = {
    name: "Auto-Detect",
    nativeName: "Auto-Detect",
    dir: "ltr",
  };

  return (
    <div>
      <h1>Welcome to Translate</h1>

      <TranslationForm languages={languages} />
    </div>
  );
}

export default TranslatePage;
