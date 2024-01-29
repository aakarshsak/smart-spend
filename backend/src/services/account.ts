import { Account } from "../db/account";
import logger from "../utility/logger";

export const getAllAccountsFromDB = async () => await Account.find();

export const addAccountsToDB = async (accountList: string[]) => {
  logger.debug(accountList);
  const savedAccounts = await Promise.all(
    accountList.map(async (a: string) => {
      const acc = new Account({ name: a.toLowerCase() });
      return await acc.save();
    })
  );

  return savedAccounts;
};
