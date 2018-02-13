# Panda Sky Cognito Mixin - Preset "Frictionless"
# This preset is meant to assemble the configuration needed to allow a developer to build authentication / authorization into their API that relies entirely on the secret key stored within the end-user's device.  This facilitates a fast, non-manual login experience, after the device is added during.

import YAML from "js-yaml"

import buildPool from "./pool"
import buildSNSRole from "./sns-role"
import buildAuthorizer from "./authorizer"

FrictionlessConfig = (name, tags, deployment) ->
  output = {name}
  if !deployment
    output.description = YAML.safeDump buildPool name, tags
    output.ancillaryResources = [ YAML.safeDump buildSNSRole name ]
    output.authorizer = YAML.safeDump buildAuthorizer name
  else
    output.authorizer = YAML.safeDump buildAuthorizer name, deployment.ARN
  output

export default FrictionlessConfig
