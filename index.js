const obj = {
    pseudo: "many",
    ville:"kharkov",
    admin: "false",

    // direBonjour(){
    //     console.log("bonjour" + ": " + this.pseudo);
    // }
    
}
// obj.age = 24
obj["admin" ] = true
//delet
delete obj.age
// console.log(obj);
//remplacer un objet
// obj.pseudo = "madjid"

//chercher une propriter si elle  existe
// console.log("pseudo" in obj);

//parcouroir un objet    
                         
for(const key in obj){   
    // console.log(key + " : " + obj[key]);  
}
//----------------------
// console.log(obj.direBonjour());

// pour obtenir les cles

const keys = Object.keys(obj)
// console.log(keys);
//  obtenir les valeur
const obj2 = {
    taille: "1.80",
    poids:"75kg"
}
//Fusioner les objets
const fusion = Object.assign({}, obj, obj2)
// console.log(fusion);

//---------------------------------------
//Factory Function

// function user(pseudo, ville) {
//     return{
//         pseudo
//     }
// }
//--------------Class-------------
class utilisateur {
    constructor(pseudo, ville){
        this.pseudo = pseudo;
        this.ville = ville;
    }
}
const user5 = new utilisateur('many',"kharkov")
console.log(user5);