import {namePool, formatCF} from "../../utils"

# If the user pool already exists, it's not in our template and must be referenced by its ARN.
buildAuthorizer = (name, poolARN) ->
  dependencies = ["API"]
  if poolARN
    providers = [ poolARN ]
  else
    dependencies.push namePool name
    providers = [ "Fn::GetAtt": [namePool(name), "Arn"] ]

  "MixinPool#{formatCF name}Authorizer":
    Type: "AWS::ApiGateway::Authorizer"
    DependsOn: dependencies
    Properties:
      Type: "COGNITO_USER_POOLS"
      IdentitySource: "method.request.header.Authorization"
      Name: name
      ProviderARNs: providers
      RestApiId: {Ref: "API"}

export default buildAuthorizer
