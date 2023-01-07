export const generateRandomString = (myLength: number): string => {
  const chars = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
  const randomArray: Array<string> = Array.from(
    { length: myLength },
    () => chars[Math.floor(Math.random() * chars.length)]
  );

  const randomString: string = randomArray.join("");
  return randomString;
};
