export default function SideAdminItem({
  name,
  href,
}: {
  name: string;
  href: string;
}) {
  return (
    <li>
      <a
        href={href}
        className="flex items-center justify-center text-sm p-2 text-white rounded-md  bg-reef hover:bg-white hover:text-black btn transition ease-in-out"
      >
        {name}
      </a>
    </li>
  );
}
