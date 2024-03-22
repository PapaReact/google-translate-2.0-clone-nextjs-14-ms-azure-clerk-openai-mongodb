import TranslationForm from "@/components/TranslationForm";
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
    <div className="px-10 xl:px-0">
      <div className="flex items-center border rounded-md w-fit px-3 py-2 bg-[#E7F0FE]">
        <Image
          src="https://links.papareact.com/r9c"
          alt="logo"
          width={30}
          height={30}
        />

        {/* style like a blue google button */}
        <p className="text-sm font-medium text-blue-500 cursor-pointer hover:underline ml-2 mt-1">
          Text
        </p>
      </div>

      <TranslationForm languages={languages} />
    </div>
  );
}

export default TranslatePage;
