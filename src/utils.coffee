import {capitalize, camelCase, plainText} from "fairmont"

formatCF = (name) -> capitalize camelCase plainText name
namePool = (name) -> "MixinUserPool#{formatCF name}"

export {
  formatCF
  namePool
}
