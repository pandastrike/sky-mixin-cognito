import {capitalize, camelCase, plainText} from "fairmont"

# Sky accepts tags as an array, but Cognito's CloudFormation template wants them as dictionary.
extractTags = (tags=[]) ->
  out = {}
  out[tag.Key] = tag.Value for tag in tags
  out["DeployTool"] = "Panda Sky"
  out

formatCF = (name) -> capitalize camelCase plainText name
namePool = (name) -> "MixinUserPool#{formatCF name}"

export {
  extractTags
  formatCF
  namePool
}
