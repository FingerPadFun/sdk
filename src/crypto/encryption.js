export async function generateKey(password) {

const enc = new TextEncoder()
const keyMaterial = await crypto.subtle.importKey(
"raw",
enc.encode(password),
{ name: "PBKDF2" },
false,
["deriveKey"]
)

return crypto.subtle.deriveKey(
{
name: "PBKDF2",
salt: enc.encode("fingerpad"),
iterations: 100000,
hash: "SHA-256"
},
keyMaterial,
{ name: "AES-GCM", length: 256 },
false,
["encrypt", "decrypt"]
)
}

export async function encrypt(text, key){

const enc = new TextEncoder()
const iv = crypto.getRandomValues(new Uint8Array(12))

const encrypted = await crypto.subtle.encrypt(
{ name:"AES-GCM", iv },
key,
enc.encode(text)
)

return {
iv: Array.from(iv),
data: Array.from(new Uint8Array(encrypted))
}

}

export async function decrypt(encrypted, key){

const iv = new Uint8Array(encrypted.iv)
const data = new Uint8Array(encrypted.data)

const decrypted = await crypto.subtle.decrypt(
{ name:"AES-GCM", iv },
key,
data
)

return new TextDecoder().decode(decrypted)

}
