import { dest, src, series, parallel } from "gulp"
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
import { pkgPath, componentPath } from "../utils/paths"
import delPath from "../utils/delpath"
import run from "../utils/run"

const sass = gulpSass(dartSass)

const removeDist = () => {
  return delPath(`${pkgPath}/lego`)
}

// 打包样式
const scss = () => {
  return src(`${componentPath}/src/**/style/**.scss`)
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(autoprefixer())
    .pipe(dest(`${pkgPath}/lego/lib/src`))
    .pipe(dest(`${pkgPath}/lego/es/src`))
}

// 打包组件
const component = async () => {
  run('pnpm run build', componentPath)
}

export default series(
  async () => removeDist(),
  parallel(
    async () => scss(),
    async () => component()
  )
)