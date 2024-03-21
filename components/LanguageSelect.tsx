import { TranslationLanguages } from "@/app/translate/page";

async function LanguageSelect({
  name,
  defaultValue,
}: {
  name: string;
  defaultValue: string;
}) {
  const languages = await fetch(
    "https://api.cognitive.microsofttranslator.com/languages?api-version=3.0",
    {
      next: {
        revalidate: 60 * 60 * 24,
      },
    }
  ).then((response) => response.json() as Promise<TranslationLanguages>);

  languages.translation["auto"] = {
    name: "Auto-Detect",
    nativeName: "Auto-Detect",
    dir: "ltr",
  };
  return (
    <select name={name} defaultValue={defaultValue}>
      {Object.entries(languages.translation).map(([key, value]) => (
        <option key={key} value={key}>
          {value.name}
        </option>
      ))}
    </select>
  );
}

export default LanguageSelect;
