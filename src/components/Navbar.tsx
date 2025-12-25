import * as React from "react";
import { NavigationMenu } from "radix-ui";
import { HomeIcon, BarChartIcon, ActivityLogIcon, ReaderIcon, TargetIcon, EyeOpenIcon, PieChartIcon, StarIcon } from "@radix-ui/react-icons";
import { Text, Flex } from "@radix-ui/themes";

const navItems = [
  { title: "Discover", href: "#", icon: HomeIcon },
  { title: "Pulse", href: "#", icon: ActivityLogIcon },
  { title: "Trackers", href: "#", icon: BarChartIcon },
  { title: "Perpetuals", href: "#", icon: TargetIcon },
  { title: "Yield", href: "#", icon: ReaderIcon },
  { title: "Vision", href: "#", icon: EyeOpenIcon },
  { title: "Portfolio", href: "#", icon: PieChartIcon },
  { title: "Rewards", href: "#", icon: StarIcon },
];

const Navbar = () => {
  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:flex fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <NavigationMenu.Root className="relative flex justify-center">
          <NavigationMenu.List className="center m-0 flex list-none rounded-full bg-black/50 backdrop-blur-xl border border-white/10 px-6 py-3 shadow-2xl gap-2">
            {navItems.map((item) => (
              <NavigationMenu.Item key={item.title}>
                <NavigationMenu.Link
                  className="block select-none rounded-full px-4 py-2 text-[14px] font-medium leading-none text-gray-300 no-underline outline-none transition-colors hover:bg-white/10 hover:text-white focus:shadow-[0_0_0_2px] focus:shadow-violet7"
                  href={item.href}
                >
                  {item.title}
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            ))}
          </NavigationMenu.List>
        </NavigationMenu.Root>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/80 border-t border-white/10">
        <Flex
          className="w-full overflow-x-auto no-scrollbar py-2 px-4"
          gap="6"
          align="center"
        >
          {navItems.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="flex flex-col items-center gap-1 min-w-[60px] opacity-70 active:opacity-100 flex-shrink-0"
            >
              {item.icon && <item.icon width="20" height="20" />}
              <Text size="1" weight="medium">{item.title}</Text>
            </a>
          ))}
        </Flex>
      </div>
    </>
  );
};

export default Navbar;
