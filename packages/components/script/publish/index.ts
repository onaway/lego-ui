import { series } from "gulp"
import { pkgPath } from "../utils/paths"
import run from "../utils/run"

export const publishComponent = async () => {
  run("release-it", `${pkgPath}/lego`)
}

export default series(async () => publishComponent())