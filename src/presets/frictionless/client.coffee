import {formatCF, namePool} from "../../utils"

buildClient = (name) ->
  formattedName = formatCF name

  "MixinPool#{formattedName}Client":
    Type: "AWS::Cognito::UserPoolClient"
    DeletionPolicy: "Retain"
    Properties:
      ClientName: name
      ExplicitAuthFlows: [ "ADMIN_NO_SRP_AUTH" ]
      GenerateSecret: false
      UserPoolId:
        Ref: "#{namePool name}"

export default buildClient
