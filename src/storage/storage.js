export function saveNote(note){

localStorage.setItem(
"fingerpad_note",
JSON.stringify(note)
)

}

export function loadNote(){

const data = localStorage.getItem("fingerpad_note")

if(!data) return null

return JSON.parse(data)

}
