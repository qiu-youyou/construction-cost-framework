export const encryption = (content: string, key?: string) => {
  const encryptor = new window.JSEncrypt();
  encryptor.setPublicKey(`-----BEGIN PUBLIC KEY-----
 ${key}
  -----END PUBLIC KEY-----`);
  return encryptor.encryptLong(content); // 对内容进行加密
};
