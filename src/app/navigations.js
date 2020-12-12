export const navigations = [
  {
    name: "Dashboard",
    path: "/dashboard/analytics",
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
    path: "/others/drag-and-drop"
  },
  {
    name: "Comments",
    icon: "question_answer",
    path: "/others/drag-and-drop"
  },
  {
    name: "Admin Users",
    icon: "supervisor_account",
    path: "/others/drag-and-drop"
  },
  {
    name: "Role",
    icon: "verified_user",
    path: "/others/drag-and-drop"
  },
  {
    name: "Subscriber",
    icon: "subscriptions",
    path: "/others/drag-and-drop"
  },
  {
    name: "Master",
    icon: "trending_up",
    children: [
      {
        name: "Country",
        path: "/charts/victory-charts",
        iconText: "1"
      },
      {
        name: "State",
        path: "/charts/react-vis",
        iconText: "2"
      },
      {
        name: "City",
        path: "/charts/recharts",
        iconText: "3"
      },
      {
        name: "NEWS Type",
        path: "/charts/echarts",
        iconText: "4"
      },
      {
        name: "Category",
        path: "/charts/echarts",
        iconText: "4"
      },
      {
        name: "SubCategory",
        path: "/charts/echarts",
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
        path: "/utilities/color",
        iconText: "S"
      },
      {
        name: "About US",
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
        path: "/utilities/display",
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
