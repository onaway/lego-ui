import * as components from "./index"

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    DltButton: typeof components.Button
  }
}
export {}
