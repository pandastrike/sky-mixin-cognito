# Panda Sky Mixin: Cognito Lambda environment variables
# This mixin grants the API Lambdas access to User Pools, allowing the developer to conduct user login/out.  This looks up the User Pool IDs and their Client IDs so that they may be stored within the Lambda's environment variable store.

import YAML from "js-yaml"
import {collect, project, empty} from "fairmont"
import Sundog from "sundog"

import {namePool, nameClient, _exists} from "./utils"


# TODO: For now, this will only store the first pool's User Pool and client IDs. Make this more generalized.
getEnvironmentVariables = (config, global, SDK) ->
  exists = await _exists SDK

  names = collect project "name", config.pools
  if !names || empty names
    return {}
  else
    if {Id, clientID} = await exists names[0]
      mixinCognitoPoolID: Id
      mixinCognitoClientID: await clientID
    else
      mixinCognitoPoolID: JSON.stringify Ref: namePool names[0]
      mixinCognitoClientID: JSON.stringify Ref: nameClient names[0]




export default getEnvironmentVariables
