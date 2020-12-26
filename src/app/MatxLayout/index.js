import {MatxLoadable} from "../../components/matx/index";

const Layout1 = MatxLoadable({
  loader: () => import("./Layout1/Layout1")
});

export const MatxLayouts = {
  layout1: Layout1
}