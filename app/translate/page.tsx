import TranslationForm from "@/components/TranslationForm";
import TranslationHistory from "@/components/TranslationHistory";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";

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

  const { userId } = auth();
  if (!userId) throw new Error("User not logged in");

  const response = await fetch(
    "https://api.cognitive.microsofttranslator.com/languages?api-version=3.0",
    {
      next: {
        revalidate: 60 * 60 * 24,
      },
    }
  );

  const languages = (await response.json()) as TranslationLanguages;

  return (
    <div className="px-10 xl:px-0 mb-20">
      <TranslationForm languages={languages} />
      <TranslationHistory />
    </div>
  );
}

export default TranslatePage;
