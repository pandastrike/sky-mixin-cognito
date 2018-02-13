# Panda Sky - Cognito Presets
# The configuration within Cognito resources is complex.  To guide developers toward their use-case goals and simplify the mixin interface, this mixin provides "presets."  The following code expands these named presets into a opinionated Cognito congfiguration that meet their needs.

import {empty} from "fairmont"
import frictionless from "./frictionless"

Expand = (pool, tags, deployment) ->
  {name, type} = pool
  switch type
    when "frictionless"
      frictionless name, tags, deployment
    else
      throw new Error "Unknown type preset #{type}. Unable to continue."


export default Expand
