"use client";

import { TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
import deleteTranslation from "@/actions/deleteTranslation";

function DeleteTranslationButton({ id }: { id: string }) {
  const deleteTranslationAction = deleteTranslation.bind(null, id);

  return (
    <form action={deleteTranslationAction}>
      <Button
        type="submit"
        variant="outline"
        size="icon"
        className="border-red-500 text-red-500 hover:bg-red-400 hover:text-white"
      >
        <TrashIcon size={16} />
      </Button>
    </form>
  );
}

export default DeleteTranslationButton;
