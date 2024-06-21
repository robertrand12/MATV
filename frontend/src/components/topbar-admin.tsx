import Icon from "./icon";

export default function TopbarAdmin({
  isOpen,
  setIsOpen,
}: {
  isOpen: any;
  setIsOpen: any;
}) {
  return (
    <nav className="flex flex-row justify-between items-center p-4 bg-anchor opacity-85 w-full">
      <div className="flex justify-center items-center gap-2">
        <h1 className="text-white text-xl md:text-3xl font-bold drop-shadow-lg">
          Musique à tout va <br className="md:hidden" />
        </h1>
      </div>
      {isOpen === false ? (
        <button onClick={() => setIsOpen(true)} className="md:hidden">
          <Icon name="menu" size="4xl" color="white" />
        </button>
      ) : (
        <button onClick={() => setIsOpen(false)} className="md:hidden">
          <Icon name="close" size="4xl" color="white" />
        </button>
      )}
    </nav>
  );
}
