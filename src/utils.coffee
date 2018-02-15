import {capitalize, camelCase, plainText, memoize} from "fairmont"
import Sundog from "sundog"

import warningMsg from "./warning-messages"

# Sky accepts tags as an array, but Cognito's CloudFormation template wants them as dictionary.
extractTags = (tags=[]) ->
  out = {}
  out[tag.Key] = tag.Value for tag in tags
  out

formatCF = (name) -> capitalize camelCase plainText name
namePool = (name) -> "MixinUserPool#{formatCF name}"
nameClient = (name) -> "MixinPool#{formatCF name}Client"

# The user pool ARN is not part of the pool data structure.  Add if possible.
_addPoolARN = ({whoAmI}, region) ->
  {Account} = await whoAmI()
  (pool) ->
    if pool
      pool.ARN = "arn:aws:cognito-idp:#{region}:#{Account}:userpool/#{pool.Id}"
      pool
    else
      false

_addClientID = ({clientGetHead}) ->
  (pool) ->
    if pool
      Object.defineProperties pool,
        clientID:
          enumerable: true
          get: -> (await clientGetHead pool.Id, pool.Name).ClientId
    else
      false

# Does the user pool exist?  Return it with its ARN if it does or return false.
_exists = memoize (SDK) ->
  {AWS:{Cognito, STS}} = await Sundog SDK
  addPoolARN = await _addPoolARN STS, SDK.config.region
  addClientID = _addClientID Cognito
  {poolGetHead} = Cognito
  memoize (name) ->
    try
      await addClientID addPoolARN await poolGetHead name
    catch e
      warningMsg e
      throw e


export {
  _exists
  extractTags
  formatCF
  namePool
  nameClient
}
