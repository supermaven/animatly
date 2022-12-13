import defaultTheme from "./default"
import 'typeface-roboto'

import { createMuiTheme } from "@material-ui/core"

const overrides = {
  typography: {
    fontFamily: 'Roboto',
  },}
export default {
  default: createMuiTheme({ ...defaultTheme, ...overrides }),
}
