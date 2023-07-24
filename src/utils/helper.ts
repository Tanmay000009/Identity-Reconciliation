export const testEmail = (email: string) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

export const removeDuplicates = (arr: string[]) => {
  return [...new Set(arr)];
};
