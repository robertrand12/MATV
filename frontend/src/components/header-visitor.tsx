/* eslint-disable @next/next/no-img-element */
import ModalAuthentication from "./modal-authentication";
import useScroll from "@/hooks/useScroll";
import useScreenSize from "@/hooks/useScreenSize";

export default function HeaderVisitor({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: any;
}) {
  const scrollY = useScroll();
  const screenSize = useScreenSize();

  if (screenSize.width > 1025) {
    return (
      <header
        className={`flex justify-between p-4 z-40 w-full fixed top-0 ${
          scrollY > 90
            ? "bg-shore shadow-sm transition duration-300 ease-in-out"
            : "transition duration-300 ease-in-out"
        } top-0`}
      >
        <div className="flex justify-center items-center gap-2">
          <img
            src={"/img/logo_MATV.png"}
            alt="Logo MATV"
            className="w-40"
          />
        </div>
        <ModalAuthentication isOpen={isOpen} setIsOpen={setIsOpen} />
      </header>
    );
  } else {
    return (
      <header
        className={`flex justify-between p-4 fixed w-full z-40 ${
          scrollY > 90
            ? "bg-shore shadow-sm transition duration-150 ease-in-out"
            : "transition duration-150 ease-in-out"
        } top-0`}
      >
        <div className="flex justify-center items-center gap-2">
          <img src="../../img/greenfoot-logo.png" alt="" className="w-14" />

          <h1 className="text-reef text-xl md:text-3xl font-bold drop-shadow-lg">
            Musique à tout va
          </h1>
        </div>
        <ModalAuthentication isOpen={isOpen} setIsOpen={setIsOpen} />
      </header>
    );
  }
}
