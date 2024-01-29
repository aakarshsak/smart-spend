import { addAccountsToDB, getAllAccountsFromDB } from "../services/account";

export const getAccounts = async () => await getAllAccountsFromDB();

export const addAccounts = async (accountsList: string[]) =>
  await addAccountsToDB(accountsList);
