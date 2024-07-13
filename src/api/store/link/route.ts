import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { RemoteLink, RemoteQueryFunction } from "@medusajs/modules-sdk";
import {
  ContainerRegistrationKeys,
  Modules,
  remoteQueryObjectFromString,
} from "@medusajs/utils";

import { HELLO_MODULE } from "../../../modules/hello";

export const POST = async (
  req: MedusaRequest,
  res: MedusaResponse,
): Promise<void> => {
  const remoteLink: RemoteLink = req.scope.resolve(
    ContainerRegistrationKeys.REMOTE_LINK,
  );

  // await remoteLink.create({
  //   [HELLO_MODULE]: {
  //     my_custom_id: "01J2JSG3MTRPQ8ACXZPS7EAEYT",
  //   },
  //   [Modules.PRODUCT]: {
  //     product_id: "prod_01J2BXD0ZH1ADJ4YRS11T59N6Y",
  //   },
  // });

  await remoteLink.dismiss({
    [HELLO_MODULE]: {
      my_custom_id: "01J2JSG3MTRPQ8ACXZPS7EAEYT",
    },
    [Modules.PRODUCT]: {
      product_id: "prod_01J2BXD0ZH1ADJ4YRS11T59N6Y",
    },
  });

  res.json({ message: "done" });
};

export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse,
): Promise<void> => {
  const remoteQuery: RemoteQueryFunction = req.scope.resolve(
    ContainerRegistrationKeys.REMOTE_QUERY,
  );

  const myCustomQuery = remoteQueryObjectFromString({
    entryPoint: "my_custom",
    fields: ["id", "name", "product.*"],
    variables: {
      filters: {
        id: ["01J2JSG3MTRPQ8ACXZPS7EAEYT"], // query my_custom where id is 01J2JSG3MTRPQ8ACXZPS7EAEYT
      },
      order: {
        name: "DESC",
      },
      skip: 0,
      take: 10,
    },
  });

  res.json({ myCustom: await remoteQuery(myCustomQuery) });
};
