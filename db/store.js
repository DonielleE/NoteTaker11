const util = require('util')
const fs = require ('fs')
const uuid = require('uuid')
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
    readNote(){
        return readFileAsync("db/db.json","utf8") 
     }
    write(note) {
     return writeFileAsync("db/db.json", JSON.stringify(note))   
     }
     getNotes(){
         return this.readNote().then((notes)=>{
             let parseNotes
             try {
                 parseNotes = [].concat(JSON.parse(notes))
             } catch (error) {
                parseNotes = [] 
             }
             return parseNotes
         })
     }
     addNote(note){
         const {title,text} = note
         if (!title || !text) {
             throw new Error("Try again")
         }
         const newNote = {title,text,id: uuid}
         return this.getNotes()
         .then((notes)=>[...notes,newNote])
         .then((updatedNotes)=>this.write(updatedNotes))
         .then(()=>newNote)
     }
     
     deletNote(id){
         return this.getNote()
        .then((notes)=> notes.filter((note)=> note.id !== id))
        .then((filteredNotes)=>this.write(filteredNotes))

     }
}
module.exports = new Store()