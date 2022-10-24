const path = require("path")
const fs = require("fs/promises")
const http = require("http")
const port = 8000;


const app = http.createServer(async(request, response)=>{
    //Obtenemos el método del request:
    const method = request.method;
    
    //Obtenemos y guardamos la ruta de nuestra DB
    const pathDB = path.resolve('DB.json')

    //Obtenemos el DB.json
    let db =  await fs.readFile(pathDB, "utf8")
    const dbArray = JSON.parse(db)
    let body = '';

    let url = ''
  
    //Leer la DB -- Listo
    //Convertirlo a un array con un .parse -- Listo
    //Tomar la data y hacer un push al array que hemos obtenido -- Listo
    //Sobreescribimos nuestro archivo DB con el array que tenemos -- Listo
    switch(method){
        case "POST":
            //Establecemos la respuesta que vamos a mandar
            response.statusCode = 201
            request.on('data', event => {
                body += event.toString();  // convertimos el Buffer a string
                bodyParsed = JSON.parse(body)
                dbArray.push(bodyParsed)
                db = JSON.stringify(dbArray)

                fs.writeFile(pathDB, db, (error) => {
                    error ? console.log("Este es el error", error) : ''
                })
                console.log(dbArray)
            })
            response.end("Usuario agregado correctamente!")
            break;
        case "PUT":
            //Establecemos la respuesta que vamos a mandar
            response.statusCode = 204 //Actualizado correctamente
            //Sacamos y verificamos URL
            url = request.url
            if(url.includes('/update/')){
            console.log("Holaa")
            //Obtenemos ID por la URL
            const ID  = url.charAt(url.length-1)

            const itemToDelete = dbArray[ID] //Buscamos item en nuestra DB

            if (itemToDelete) { //El item con el indice existe 
                console.log("mostrando DB", itemToDelete)
               
                itemToDelete.status = true              
                dbArray[ID] = itemToDelete //Seteamos este elemento en el array

                db = JSON.stringify(dbArray)

                fs.writeFile(pathDB, db, (error) => {
                    error ? console.log("Este es el error", error) : ''
                })
                response.end("El item se actualizó correctamente")
                console.log(dbArray)
            }
        }

        
        break;

        case "DELETE":
            response.statusCode = 200 //Codigo para decir que está todo OK
            //Sacamos y verificamos URL
            url = request.url
            if(url.includes('/delete/')){
            
            //Obtenemos ID por la URL
            const ID  = url.charAt(url.length-1)

            const itemToDelete = dbArray[ID] //Buscamos item en nuestra DB
            if (itemToDelete) { //El item con el indice existe 
                
                //Debemos borrarlo:
                dbArray.splice(ID, 1);

                //Seteamos nuestra DB:
                db = JSON.stringify(dbArray)


                fs.writeFile(pathDB, db, (error) => {
                    error ? console.log("Este es el error", error) : ''
                })
                response.end("El item se borró correctamente")
                console.log(dbArray)

            } //End Item Comprobation
        } //End URL comprobation
        
    } //End Switch
}) //End Server Function

app.listen(port)

/*
//Para usar el .gitignore
//primero tines que inciar un repositorio

// importar las librerias que vamos a usar
// http, path, fs (leyendo archivos)

const http = require("http");
// sirve para crear un servidor
// y usar los metodos pertinentes
const path = require("path");
const fs = require("fs/promises");

//Quiero leer data.json

const PORT = 8000;

const app = http.createServer(async (request, response) => {
  // aqui va el código para el funcionamiento
  // obtener la ruta absoluta de data.json

  // necesito saber que metodo se esta realizando
  const method = request.method;
  const url = request.url;
  // todos los verbos / metodos en peticiones htttp
  // van en mayusculas
  if (url === "/tasks") {
    const jsonPath = path.resolve("./data.json");
    const jsonFile = await fs.readFile(jsonPath, "utf8");
    if (request.method === "GET") {
      response.setHeader("Content-Type", "application/json");
      response.write(jsonFile);
    }

    if (method === "POST") {
      // que necesitamos leer para obtener la infromación
      console.log(request.body);
      // eventEmmiter
      //addEventListener
      request.on("data", (data) => {
        // recibo un json
        // necesito agregar la data a data.json
        // necesito obetener la informacion     *
        // necesito escribir en el archivo
        // primero leer el archivo            *
        // necesito la ruta del archivo     *
        // escribir en el archivo
        const newTask = JSON.parse(data);
        const arr = JSON.parse(jsonFile);
        arr.push(newTask);
        console.log(arr);
      });
    }
  }

  response.end();
});

app.listen(PORT);

console.log("servidor corriendo");
*/