const Contenedor = require('./contenedor')

//este index llama a la clase y crea los productos y demas

const container = new Contenedor('file.json')

container.save({
    author:'German mendez',
    name:'Harry potter',
    price:120
})



console.log('Usar getbyid')
console.log(container.getByID(3))


console.log('delete by id')
console.log(container.deleteAll())








