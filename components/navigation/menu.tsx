import { Icons } from "@/components/icons/icons";

export const SideBarLinks = [
  {
    label: "Home",
    href: "/",
    icon: (
      <Icons.Home className="text-neutral-700 dark:text-neutral-200  flex-shrink-0" />
    ),
  },
  {
    label: "Pricing",
    href: "/pricing",
    icon: (
      <Icons.billing className="text-neutral-700 dark:text-neutral-200 flex-shrink-0" />
    ),
  },
];
