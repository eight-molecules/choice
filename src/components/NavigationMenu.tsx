
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

export interface NavigationItem {
  name: string;
  path: string;
  children?: NavigationItem[];
}

export interface NavigationMenuProps {
  items: NavigationItem[];
  level?: number; // Keep track of current nesting level
}

export default function NavigationMenu({ items, level = 0 }: NavigationMenuProps) {
  const navigate = useNavigate();

  // Recursive function to handle rendering of nested menus
  const renderNavItems = (items: NavigationItem[], currentLevel: number) => {
    return items.map((item) => (
      <Fragment key={item.path}>
        <li className={`pl-${currentLevel * 4}`}>
          <button
            onClick={() => navigate(item.path)}
            className="text-blue-500 hover:underline"
          >
            {item.name}
          </button>
        </li>

        {/* Recursively render children if they exist */}
        {item.children && (
          <ul className="ml-4">
            {renderNavItems(item.children, currentLevel + 1)}
          </ul>
        )}
      </Fragment>
    ));
  };

  return (
    <ul className="p-6 space-y-2">
      {renderNavItems(items, level)}
    </ul>
  );
}