import {formatCF, namePool, nameClient} from "../../utils"

buildClient = (name) ->
  formattedName = formatCF name

  "#{nameClient name}":
    Type: "AWS::Cognito::UserPoolClient"
    DeletionPolicy: "Retain"
    Properties:
      ClientName: name
      ExplicitAuthFlows: [ "ADMIN_NO_SRP_AUTH", "USER_PASSWORD_AUTH" ]
      GenerateSecret: false
      UserPoolId:
        Ref: "#{namePool name}"

export default buildClient
