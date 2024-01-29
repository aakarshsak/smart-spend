import { Account } from "../db/account";

export const getAllAccountsFromDB = async () => await Account.find();

export const addAccountsToDB = async (accountList: string[]) => {
  console.log(accountList);
  const savedAccounts = await Promise.all(
    accountList.map(async (a: string) => {
      const acc = new Account({ name: a.toLowerCase() });
      return await acc.save();
    })
  );

  return savedAccounts;
};
