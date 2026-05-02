import { Fragment } from "react";
import { Menu, MenuButton, MenuItems, Transition } from "@headlessui/react";
import { HeaderDropdownProps } from "@/types/ui";
import { cn } from "@/lib/utils";

export function HeaderDropdown({
  buttonClassName,
  buttonContent,
  children,
  panelClassName,
}: Omit<HeaderDropdownProps, "containerRef" | "isOpen" | "onToggle">) {
  return (
    <Menu as="div" className="relative">
      <MenuButton className={buttonClassName}>
        {buttonContent}
      </MenuButton>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems
          className={cn(
            "absolute top-full right-0 z-20 mt-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-200/50 focus:outline-none",
            panelClassName
          )}
        >
          {children}
        </MenuItems>
      </Transition>
    </Menu>
  );
}
