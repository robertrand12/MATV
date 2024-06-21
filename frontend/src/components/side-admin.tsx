import React from "react";
import SideAdminItem from "./side-admin-item";
import { useLogoutMutation } from "@/graphql/generated/schema";
import { useRouter } from "next/router";

export default function SideAdmin({ isOpen }: { isOpen: any }) {
  const router = useRouter();
  const [logout] = useLogoutMutation();
  return (
    <aside
      id="default-sidebar"
      className={` md:translate-x-0 ${
        isOpen === false
          ? "-translate-x-full left-0 z-40 w-64 transition-transform"
          : "translate-x-0 z-40 left-0 absolute sm:relative w-full sm:w-1/2 md:w-64 transition-transform"
      }`}
    >
      <div className=" px-3 py-4 bg-anchor flex flex-col justify-between h-full">
        <ul className="flex flex-col gap-4">
          <SideAdminItem href="/admin" name="Tableau de bord" />
          <SideAdminItem href="/admin/musicians" name="Les musiciens" />
          <SideAdminItem href="#" name="Les évènements" />
          <SideAdminItem href="#" name="Les groupes" />
          <SideAdminItem href="#" name="Les partitions" />
          <button
            className="btn btn-reef hover:bg-white hover:text-black transition ease-in-out"
            onClick={async () => {
              await logout();
              router.push("/");
            }}
          >
            Déconnexion
          </button>{" "}
        </ul>
      </div>
    </aside>
  );
}
