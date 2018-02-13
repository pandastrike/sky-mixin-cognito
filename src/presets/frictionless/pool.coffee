import {formatCF, namePool, extractTags} from "../../utils"

buildPool = (name, tags) ->
  formattedName = formatCF name

  "#{namePool name}":
    Type: "AWS::Cognito::UserPool"
    DependsOn: ["MixinPool#{formattedName}SNSRole"]
    DeletionPolicy: "Retain"
    Properties:
      UserPoolName: name
      AdminCreateUserConfig:
        AllowAdminCreateUserOnly: true
      AutoVerifiedAttributes: ["email", "phone_number"]
      DeviceConfiguration:
        ChallengeRequiredOnNewDevice: true
        DeviceOnlyRememberedOnUserPrompt: false
      MfaConfiguration: "ON"
      Schema: [{
        Name: "email"
        AttributeDataType: "String"
        DeveloperOnlyAttribute: false
        Mutable: true
        Required: true
        },{
        Name: "phone_number"
        AttributeDataType: "String"
        DeveloperOnlyAttribute: false
        Mutable: true
        Required: true
      }]
      SmsConfiguration:
        ExternalId: "#{formattedName}-external-id"
        SnsCallerArn:
          "Fn::GetAtt": ["MixinPool#{formattedName}SNSRole", "Arn"]
      UserPoolTags: extractTags tags

export default buildPool
