export default [
  {
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    name: "Settings",
    path: "/settings",
    children: [
      {
        name: "Profile",
        path: "/settings/profile",
      },
      {
        name: "Account",
        path: "/settings/account",
        children: [
          {
            name: "Privacy",
            path: "/settings/account/privacy",
          },
        ],
      },
    ],
  },
]