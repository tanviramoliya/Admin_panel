

export const navigations = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: "dashboard"
  },
  {
    name: "NEWS",
    icon: "description",
    children: [
      {
        name: "Article",
        path: "/news/articleNews",
        icon: "assignment"
      },
      {
        name: "Video",
        path : "/news/videoNews",
        icon: "video_library"
      }
    ]
  },
  {
    name: "NEWS Updates",
    icon: "widgets",
    path: "/newsUpdate"
  },
  {
    name: "Comments",
    icon: "question_answer",
    path: "/others/drag-and-drop"
  },
  {
    name: "Admin Users",
    icon: "supervisor_account",
    path: "/adminUser"
  },
  {
    name: "Role",
    icon: "verified_user",
    path: "/role"
  },
  {
    name: "Subscriber",
    icon: "subscriptions",
    path: "/subscriber"
  },
  {
    name: "Inquiry",
    icon: "live_help",
    path: "/inquiry"
  },
  {
    name: "Master",
    icon: "trending_up",
    children: [
      {
        name: "NEWS Type",
        path: "/master/newsType",
        iconText: "4"
      },
      {
        name: "Category",
        path: "/master/category",
        iconText: "4"
      },
      {
        name: "SubCategory",
        path: "/master/subcategory",
        iconText: "4"
      }
    ]
  },
  {
    name: "Settings",
    icon: "build",
    children: [
      {
        name: "Social Media",
        path: "/setting/socialMedia",
        iconText: "S"
      },
      {
        name: "About US",
        path: "/setting/aboutUs",
        iconText: "A"
      },
      {
        name: "Footer",
        path: "/setting/footer",
        iconText: "F"
      }
    ]
  },
 
];
