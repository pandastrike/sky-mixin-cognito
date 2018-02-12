# Panda Sky Mixin: Cognito Lambda permission policy
# This mixin grants the API Lambdas access to User Pools, allowing the developer to conduct user login/out.
# That IAM Role permission is rolled into your CloudFormation stack after being generated here.

import {collect, project} from "fairmont"
import {namePool} from "./utils"

Policy = (config, global) ->
  # Grant total access to the user pools listed in this mixin.
  # TODO: Consider limiting the actions on those pools and/or how to specify limitations within the mixin configuration.

  {region} = global.aws
  names = collect project "name", config.pools
  resources = []
  for n in names
    resources.push JSON.stringify "Fn::GetAtt": [namePool(n), "Arn"]

  [
    Effect: "Allow"
    Action: [ "cognito-idp:*" ]
    Resource: resources
  ]

export default Policy
