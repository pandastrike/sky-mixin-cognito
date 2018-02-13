# Panda Sky Mixin: Cognito Lambda permission policy
# This mixin grants the API Lambdas access to User Pools, allowing the developer to conduct user login/out.
# That IAM Role permission is rolled into your CloudFormation stack after being generated here.

import {collect, project} from "fairmont"
import Sundog from "sundog"

import {namePool, _exists} from "./utils"

Policy = (config, global, SDK) ->
  # Grant total access to the user pools listed in this mixin.  If we are adding the pool to the template we have to reference it.  If it already exists, we have to lookup its ARN ourselves.


  # TODO: Consider limiting the actions on those pools and/or how to specify limitations within the mixin configuration.
  exists = await _exists SDK

  names = collect project "name", config.pools
  resources = []
  for n in names
    if pool = await exists n
      resources.push pool.ARN
    else
      resources.push JSON.stringify "Fn::GetAtt": [namePool(n), "Arn"]

  [
    Effect: "Allow"
    Action: [ "cognito-idp:*" ]
    Resource: resources
  ]

export default Policy
