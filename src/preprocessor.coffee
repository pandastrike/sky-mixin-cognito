# Panda Sky Mixin: Cognito
# This mixin allocates the requested Cognito user pools, clients, and authorizers into your CloudFormation stack. User pools and clients are retained after stack deletion, so here we scan for them in Cognito before adding them to a new CFo template.

import Sundog from "sundog"
import {yaml} from "panda-serialize"
import {cat, isObject, plainText, camelCase, capitalize, empty} from "fairmont"

import warningMsg from "./warning-messages"
import expandPresets from "./presets"

process = (_AWS_, config) ->
  {AWS:{Cognito:{poolGet}}} = await Sundog _AWS_

  exists = (name) ->
    try
      await poolGet name
    catch e
      warningMsg e
      throw e

  # Start by extracting out the Cognito Mixin configuration:
  {env, tags=[]} = config
  c = config.aws.environments[env].mixins.cognito
  c = if isObject c then c else {}
  c.tags = cat (c.tags || []), tags

  # Expand the preset name to the full configuraiton template.
  {pools=[], tags} = c
  pools = expandPresets pools, tags

  # Scan for user pools that already exist.
  output = []
  for p in pools
    if await exists p.name
      # Here, we only need the Gateway Authorizer resource.
      output.push p.authorizer
    else
      # Here, we need the whole Cognito resource stack.
      output.push p

  {pools: output}


export default process
