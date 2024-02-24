"use client";

import { Button } from "../ui/button";

export default function UpdateButton() {
  return (
    <Button onClick={() => alert("Editando")} variant="link">
      Editar
    </Button>
  );
}
