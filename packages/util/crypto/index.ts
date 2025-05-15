import CryptoJS from 'crypto-js'

const key = CryptoJS.enc.Utf8.parse('NITqHCfdxMM6ljFh') // 十六位十六进制数作为**
const iv = CryptoJS.enc.Utf8.parse('zuIQmrzVm3GwQnOL') // 十六位十六进制数作为**偏移量

export default {
  md5: (data: string) => {
    return CryptoJS.MD5(data);
  },
  aesDecrypt: (data: string) => {
    const decrypt = CryptoJS.AES.decrypt(data, key, { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
    const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
    return decryptedStr.toString()
  },
  aesEncrypt: (data: string) => {
    const srcs = CryptoJS.enc.Utf8.parse(data)
    const encrypted = CryptoJS.AES.encrypt(srcs, key, { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
    return CryptoJS.enc.Hex.stringify(encrypted.ciphertext)
  }
}
