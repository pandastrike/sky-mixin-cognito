import {capitalize, camelCase, plainText} from "faimront"

Utils = ->
  formatCF = (name) -> capitalize camelCase plainText name
  namePool = (name) -> "MixinUserPool#{formatCF name}"

export default Utils
export {
  formatCF
  namePool
}
