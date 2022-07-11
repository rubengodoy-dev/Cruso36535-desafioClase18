
db.createCollection("mensajes")
db.mensajes.insert(
[ { author: 'ruben.godoy', date: Date.now(), text: "mensaje 1" },
  { author: 'lionel.messi', date: Date.now(), text: "mensaje 2" },
  { author: 'luis.navas', date: Date.now(), text: "mensaje 3" },
  { author: 'fabian.beltran', date: Date.now(), text: "mensaje 4" },
  { author: 'carlos.perez', date: Date.now(), text: "mensaje 5" },
  { author: 'yohana.bazante', date: Date.now(), text: "mensaje 6" },
  { author: 'luz.vallejos', date: Date.now(), text: "mensaje 7" },
  { author: 'elizabeth.lopez', date: Date.now(), text: "mensaje 8" },
  { author: 'noelia.benitez', date: Date.now(), text: "mensaje 9" },
  { author: 'emiliano.blanco', date: Date.now(), text: "mensaje 10" }]
)


db.createCollection("productos")
db.productos.insert([
 { title: 'producto1', price: 1291, thumbnail: "imagen1.jpg" },
 { title: 'producto2', price: 4990, thumbnail: "imagen2.jpg"  },
  { title: 'producto3', price: 1291, thumbnail: "imagen1.jpg" },
 { title: 'producto4', price: 2470, thumbnail: "imagen2.jpg"  },
  { title: 'producto5', price: 101, thumbnail: "imagen1.jpg" },
 { title: 'producto6', price: 2980, thumbnail: "imagen2.jpg"  },
  { title: 'producto7', price: 4291, thumbnail: "imagen1.jpg" },
 { title: 'producto8', price: 3120, thumbnail: "imagen2.jpg"  },
  { title: 'producto9', price: 3291, thumbnail: "imagen1.jpg" },
 { title: 'producto10', price: 4320, thumbnail: "imagen2.jpg"  },
])

//listar documentos
db.mensajes.find()
db.productos.find()

//mostrar cantidad de documentos almacenados
db.mensajes.count()
db.productos.count()

//agregar un producto
db.productos.insertOne(
 { title: 'producto insertado', price: 2999, thumbnail: "imagen2999.jpg" }
)
//realizar una consulta por nombre de producto especifico
db.productos.find({title:"producto4"})
//productos con precio menor a 1000 
db.productos.find({price:{$lt:1000}})
//productos con precio entre 1000 a 3000  
db.productos.find({
$and:[{price:{$gte:1000}},{price:{$lte:3000}}]
	})
//precios mayor a 3000
db.productos.find({price:{$gt:3000}})
//nombre del tercer producto mas barato
db.productos.find({},{"price":0,"thumbnail":0,"_id":0}).sort({price:-1}).skip(2).limit(1)
//agrega stock a todos los productos
db.productos.update({},{$set:{stock:100}},{multi:true})
//cambiar stock a cero
db.productos.update({price:{$gt:4000}},{$set:{stock:0}},{multi:true})
//borrar productos con precio menor a 1000
db.productos.deleteMany({price:{$lt:1000}})
//crear usuario pepe
db.createUser(
{
user: "pepe",
pwd: "asd456",
roles: [{ role: "read", db: "ecommerce" }]}
)

mongo -u pepe -p asd456 --authenticationDatabase ecommerce
use ecommerce
db.productos.insertOne(
 { title: 'producto insertado con pepe', price: 999, thumbnail: "image_pepe.jpg" }
)



//habilito access control
use admin
db.createUser(
  {
    user: "root",
    pwd: "123456", // or cleartext password
    roles: [
      { role: "userAdminAnyDatabase", db: "admin" },
      { role: "readWriteAnyDatabase", db: "admin" }
    ]
  }
)
db.adminCommand( { shutdown: 1 } )



