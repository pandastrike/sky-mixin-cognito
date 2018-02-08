# Panda Sky Mixin: Cognito
# This mixin allocates the requested Cognito authorizers and user pools into your CloudFormation stack. User pools are retained after stack deletion, so here we scan for them in Cognito before adding them to a new CFo template.

import Sundog from "sundog"
import {yaml} from "panda-serialize"
import {cat, isObject, plainText, camelCase, capitalize, empty} from "fairmont"

import warningMsg from "./warning-messages"
import prerender from "./converter"

process = (_AWS_, config) ->
  []


export default process
