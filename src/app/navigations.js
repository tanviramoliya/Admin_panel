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
        path: "/forms/basic",
        icon: "assignment"
      },
      {
        name: "Video",
        path: "/forms/editor",
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
    path: "/others/drag-and-drop"
  },
  {
    name: "Subscriber",
    icon: "subscriptions",
    path: "/subscriber"
  },
  {
    name: "Master",
    icon: "trending_up",
    children: [
      {
        name: "Country",
        path: "/master/country",
        iconText: "1"
      },
      {
        name: "State",
        path: "/master/state",
        iconText: "2"
      },
      {
        name: "City",
        path: "/master/city",
        iconText: "3"
      },
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
        name: "Spacing",
        path: "/utilities/spacing",
        iconText: "A"
      },
      {
        name: "Contact US",
        path: "/utilities/typography",
        iconText: "C"
      },
      {
        name: "Terms & Conditions",
        path: "/utilities/display",
        iconText: "T"
      },
      {
        name: "FAQ",
        path: "/forms/simple",
        iconText: "F"
      },
      {
        name: "Support",
        path: "/utilities/display",
        iconText: "S"
      },
      {
        name: "Header",
        path: "/utilities/display",
        iconText: "H"
      },
      {
        name: "Footer",
        path: "/utilities/display",
        iconText: "F"
      }
    ]
  },
 
];
