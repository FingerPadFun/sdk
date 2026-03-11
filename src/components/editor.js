import { encrypt, decrypt, generateKey } from "../crypto/encryption.js"
import { saveNote, loadNote } from "../storage/storage.js"

const textarea = document.getElementById("note")

export function initEditor(){

document.getElementById("encryptBtn")
.addEventListener("click", async ()=>{

const password = prompt("Enter encryption password")

const key = await generateKey(password)

const encrypted = await encrypt(textarea.value,key)

saveNote(encrypted)

alert("Encrypted & Saved")

})

document.getElementById("decryptBtn")
.addEventListener("click", async ()=>{

const password = prompt("Enter password")

const key = await generateKey(password)

const saved = loadNote()

if(!saved){
alert("No saved note")
return
}

try{

const decrypted = await decrypt(saved,key)

textarea.value = decrypted

}catch{

alert("Wrong password")

}

})

}
