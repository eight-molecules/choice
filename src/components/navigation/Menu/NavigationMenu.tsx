
import { Fragment } from "react";
import { NavigateFunction, NavLink, useNavigate } from "react-router-dom";

export interface NavigationItem {
  name: string;
  path: string;
  children?: NavigationItem[];
}

export interface NavigationMenuProps {
  items: NavigationItem[];
  level?: number; // Keep track of current nesting level
}

const NavigationMenuItem = ({ item }) => {
  return (
    <div>
      <NavLink
        to={item.path}
        end
        className={({ isActive }) =>
          `mb-1 px-3 py-2 rounded-lg transition-colors block ${isActive
            ? 'bg-gray-300 dark:bg-gray-700'
            : 'hover:bg-gray-300'
          }`
        }
      >
        {item.name}
      </NavLink>

      {item.children && (
        <div className="pl-4">
          {item.children.map((item) => (
            <NavigationMenuItem key={item.path} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};


export default function NavigationMenu({ items, level = 0 }: NavigationMenuProps) {
  return (
    <div className="w-64 h-screen bg-gray-100 dark:bg-gray-900 shadow-inner">
      <nav className="flex flex-col p-4">
        {items.map((item) => (
          <NavigationMenuItem key={item.path} item={item} />
        ))}
      </nav>
    </div>
  )
}