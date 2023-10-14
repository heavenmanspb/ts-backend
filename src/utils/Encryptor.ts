import zlib from 'zlib'

export interface IEncryptor {
    encrypt(text: string): string
    decrypt(cipher: string): string
}

export class Encryptor implements IEncryptor {
    private readonly key: string
    private readonly ivLength: number

    constructor(key: string, ivLength = 0) {
        this.key = key
        this.ivLength = ivLength
    }

    encrypt(text: string): string {
        const iv = Encryptor.generateRandomIV(this.ivLength)
        const result = text.split('').reduce((acc, char, i) => {
            const charCode = char.charCodeAt(0) ^ this.key.charCodeAt(i % this.key.length) ^ iv.charCodeAt(i % iv.length)
            return acc + String.fromCharCode(charCode)
        }, '')
        const resultWithIV = iv + result
        return Buffer.from(resultWithIV, 'binary').toString('hex')
    }

    decrypt(cipher: string): string {
        const binaryString = Buffer.from(cipher, 'hex').toString('binary')
        const iv = binaryString.substring(0, this.ivLength)
        const cipherWithoutIV = binaryString.substring(this.ivLength)
        return cipherWithoutIV.split('').reduce((acc, char, i) => {
            const charCode = char.charCodeAt(0) ^ this.key.charCodeAt(i % this.key.length) ^ iv.charCodeAt(i % iv.length)
            return acc + String.fromCharCode(charCode)
        }, '')
    }

    private static generateRandomIV(length: number): string {
        const iv = Array.from({ length }, () => Math.floor(Math.random() * 256))
        return String.fromCharCode(...iv)
    }
}

export class EncryptorZlib extends Encryptor {
    constructor(key: string, ivLength = 0) {
        super(key, ivLength)
    }

    encrypt(text: string): string {
        const encryptedText = super.encrypt(text)
        const buffer = Buffer.from(encryptedText, 'binary')
        return zlib.deflateSync(buffer).toString('hex')
    }

    decrypt(cipher: string): string | null {
        try {
            const buffer = Buffer.from(cipher, 'hex')
            return super.decrypt(zlib.inflateSync(buffer).toString('binary'))
        } catch (e) {
            throw new Error('Invalid cipher')
        }
    }
}
