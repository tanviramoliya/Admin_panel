import  {MatxLoadable}  from "../../../components/matx/index";

const BasicForm = MatxLoadable({
  loader: () => import("./BasicForm")
});

const EditorForm = MatxLoadable({
  loader: () => import("./EditorForm")
});

const SimpleForm = MatxLoadable({
  loader : () => import("./SimpleFrom")
})

const formsRoutes = [
  {
    path: "/forms/basic",
    component: BasicForm
  },
  {
    path: "/forms/editor",
    component: EditorForm
  },
  {
    path : "/forms/simple",
    component : SimpleForm

  }
];

export default formsRoutes;
