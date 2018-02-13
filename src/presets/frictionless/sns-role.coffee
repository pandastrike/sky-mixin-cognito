import {formatCF} from "../../utils"

buildSNSRole = (name) ->
  formattedName = formatCF name

  "MixinPool#{formattedName}SNSRole":
    Type: "AWS::IAM::Role"
    DeletionPolicy: "Retain"
    Properties:
      AssumeRolePolicyDocument:
        Version: "2012-10-17"
        Statement: [{
          Effect: "Allow"
          Principal:
            Service: ["cognito-idp.amazonaws.com"]
          Action: ["sts:AssumeRole"]
        }]
      Policies: [{
        PolicyName: "#{formattedName}SNSAccess"
        PolicyDocument:
          Version: "2012-10-17"
          Statement: [{
            Effect: "Allow"
            Action: ["sns:*"]
            Resource: "*"
          }]
      }]

export default buildSNSRole
