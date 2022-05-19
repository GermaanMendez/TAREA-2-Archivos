const fs = require('fs')

//aca hago la clase donde administramos el archivo y metemos los metodos y demas 
class Contenedor{
    constructor(filename){
        console.log('Init contenedor')
        //atributos propios de la clase
        this.filename = filename
        this.data = []
        try{    //si encuentra el archivo lo lee usando el metodo de la clase
             this.read()
        }catch(e){ //si no lo encuentra lo escribe usando el metodo propio de la clase, pongo json.stringify para que se cree en formato strig json
            console.log('No se encontro el file')
            console.log('Creando uno nuevo..')
            this.write()
        }
    }   

write(){
   //metodo propio de la clase para crear el archivo. pongo json.stringify para que se cree en formato strig json
    fs.writeFileSync(this.filename,JSON.stringify(this.data))
}

read(){
    //metodo que lee el archivo parceandolo a json, pongo this
    this.data = JSON.parse(fs.readFileSync(this.filename))
}

getLastId(){
    //esto lo hago para que no me de error en caso de que el array este vacio
    const l = this.data.length
    if(l<1)return 0
    //esto retorna el id del ultimo objeto que fue agregado al array, sino existe le pongo 1
    return this.data[this.data.length-1].id || 1
}


save(obj){
    //obtengo el ultimo id con el otro metodo
    const id = this.getLastId()
    //lo que hago es un push del objeto agregandole como id la id que obtuve con el otro metodo
    this.data.push({
        //pongo los 3 puntitios para pasarle toda la info del obj y el id
        ...obj,...{id:id+1}
    })
    this.write()
}

//retorna el objeto que tenga el id que le estoy pasando, el metodo FIND me devuelve el objeto entero
getByID(idBuscado){
return this.data.find(p => p.id == idBuscado)
}



getAll(){
    return this.data
}

deleteById(idBuscado){  //el metodo findIdex me devuelve la posicion del objeot en el array con el id que le paso
    const idx = this.data.findIndex(p => p.id == idBuscado)
    //lo que hago con splice es eliminar de la data 1 posicion donde esta el objeto con la id
    this.data.splice(idx,1)
    //una vez que lo elimino de la data tengo que volver a escribir el archivo para que ahora se escriba actualizado es decir sin el archivo que borre
    this.write()
}

deleteAll(){
    this.data=[]
    this.write()
}


}

module.exports=Contenedor