import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  href: string;
  label: string;
}

const navItems: NavItem[] = [
  { href: "/dashboard/admin", label: "Admin Dashboard" },
  { href: "/dashboard/user", label: "User Dashboard" },
  { href: "/dashboard/owner", label: "Owner Dashboard" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full md:w-60 h-full p-4 bg-white dark:bg-neutral-900 shadow-lg">
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-3 py-2 rounded-lg font-medium transition-colors ${
              pathname === item.href
                ? "bg-blue-500 text-white"
                : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-800"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}