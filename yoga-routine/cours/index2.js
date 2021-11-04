const main = document.querySelector('main')
const btn = document.querySelector('.btn-container')
const basicArray = [
  {pic:0, min: 1},
  {pic:1, min: 1},
  {pic:2, min: 1},
  {pic:3, min: 1},
  {pic:4, min: 1},
  {pic:5, min: 1},
  {pic:6, min: 1},
  {pic:7, min: 1},
  {pic:8, min: 1},
  {pic:9, min: 1},
]

let exerciceArray = [
  {pic:0, min: 1},
  {pic:1, min: 1},
  {pic:2, min: 1},
  {pic:3, min: 1},
  {pic:4, min: 1},
  {pic:5, min: 1},
  {pic:6, min: 1},
  {pic:7, min: 1},
  {pic:8, min: 1},
  {pic:9, min: 1},
]
//------------
function exert() {
  if (localStorage.exercices) {
    exerciceArray = JSON.parse(localStorage.exercices);

  } else {
    exerciceArray = basicArray;
  }
}

class Exercice {
  constructor() {
    this.index = 0
    this.minutes = exerciceArray[this.index].min
    this.second = 0
   
    }
    updateCountdown() {
     this.second = this.second < 10 ? "0" + this.second : this.second
     setTimeout(() => {
       if(this.minutes === 0 && this.second === "00"){
         this.index++
         this.ring()
         if(this.index < exerciceArray.length){
           this.minutes = exerciceArray[this.index].min
           this.second = 0
           this.updateCountdown()
         }else{
         return page.finish()  
         }
         
       }else if (this.second === "00") {
            this.minutes--
            this.second = 59
            this.updateCountdown()
       }else{
         this.second--
         this.updateCountdown()
       }
     }, 1000);

     return (main.innerHTML = `
      <div class="exercice-container">
      <p>${this.minutes}:${this.second}</p>
      <img src="./img/${exerciceArray[this.index].pic}.png" />
      <div>${this.index + 1}/${exerciceArray.length}</div>
      </div>
      
      
      `)
  }
 ring(){
   const audio = new Audio()
   audio.src = "ring.mp3"
   audio.play()
 }
}
const utils = {
pageContent: function(title, content, btn){
  document.querySelector('h1').innerHTML = title,
  main.innerHTML = content,
  document.querySelector('.btn-container').innerHTML = btn
  

},
 handleEventMinutes: function() {
  document.querySelectorAll('input[type="number"]').forEach((input) => {
    input.addEventListener("input", (e) => {
      exerciceArray.map((exe) => {
        if(exe.pic == e.target.id){
          exe.min = parseInt(e.target.value)
          console.log(exerciceArray);
          this.Storage()
        }
      })

    })
   })
 },
 handleEventArrow: function() {
   document.querySelectorAll('.arrow').forEach((arrow) => {
     arrow.addEventListener("click", (e) => {
       let position = 0
     exerciceArray.map((exe) => {
       if(exe.pic == e.target.dataset.pic && position !== 0){
       [exerciceArray[position], exerciceArray[position -1]] = [exerciceArray[position -1], exerciceArray[position]],
       page.lobby()
       this.Storage()
       }else{
         position++
         
       }
     })
       
     })
   })
 },
 deleteItiem: function() {
   document.querySelectorAll(".deleteBtn").forEach((deleteBtn) => {
     deleteBtn.addEventListener("click", (e) => {
       let newArr = []
       exerciceArray.map((exe) => {
         if(exe.pic != e.target.dataset.pic){
           newArr.push(exe)
           
          
         }
       })
       exerciceArray = newArr
       page.lobby()
       this.Storage()

     })
   })
 },
 
  reboot: function() {
     exerciceArray = basicArray
     page.lobby()
     this.Storage()
  },  
  Storage: function() {
    localStorage.exercices = JSON.stringify(exerciceArray)
  },
 
}
const page = {
 lobby: function () {
   let mapArray = exerciceArray.map((exe) => 
     `
     <li>
     <div class="card-header">
     <input type="number" id=${exe.pic} min="1" max="10" value=${exe.min}>
      <span>min</span>
      </div>
      <img src="./img/${exe.pic}.png">
      <i class="fas fa-arrow-alt-circle-left arrow" data-pic=${exe.pic}></i>
      <i class="fas fa-times-circle deleteBtn" data-pic=${exe.pic}></i>
      </li> 
     `
     
    )
   .join("")
   utils.pageContent(
    "Paramétrage <i id='reboot' class='fas fa-undo'></i>",
    `<ul>${mapArray}</ul>`,
    "<button  id='start'> Commencer<i class='fas fa-play-circle'></i></button>"
    
    )
    utils.handleEventMinutes();
    utils.handleEventArrow();
    utils.deleteItiem()
    reboot.addEventListener("click", () => utils.reboot())
    start.addEventListener("click", () => this.routine())
    
 },
 routine: function() {
   const exercice = new Exercice()
   utils.pageContent(
     "Routine", exercice.updateCountdown(), null

   )
 },
 finish: function(){
   utils.pageContent(
     "C'est terminé, tes le/la meilleur(e) bravoo!! ",
    "<button id='start'>Recomencer  </button> ",
    "<button id='reboot' class='btn-reboot'>Rréinitialiser <i class='fas fa-times-circle'></i></button>"

   )
   start.addEventListener("click", () => this.routine())
   reboot.addEventListener("click", () => {
     utils.reboot()
     
   })
   
 },
 
  }

page.lobby() 

