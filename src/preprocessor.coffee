# Panda Sky Mixin: Cognito
# This mixin allocates the requested Cognito user pools, clients, and authorizers into your CloudFormation stack. User pools and clients are retained after stack deletion, so here we scan for them in Cognito before adding them to a new CFo template.
import {cat, isObject} from "fairmont"

import {_exists} from "./utils"
import expandPreset from "./presets"

process = (SDK, config) ->
  exists = await _exists SDK

  # Start by extracting out the Cognito Mixin configuration:
  {env, tags=[]} = config
  c = config.aws.environments[env].mixins.cognito
  c = if isObject c then c else {}
  c.tags = cat (c.tags || []), tags

  # Expand the preset name to the full configuraiton template.
  {pools=[], tags} = c
  output = []
  for p in pools
    # Don't ask for resources that already exist.
    deployment = await exists p.name
    output.push expandPreset p, tags, deployment

  {pools: output}


export default process
