import LayoutAdmin from "@/layouts/layout-admin";
import { useState } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <LayoutAdmin>
      <h2>Je suis le dashboard admin</h2>
    </LayoutAdmin>
  );
}
