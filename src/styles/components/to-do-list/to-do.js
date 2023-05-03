// class ToDo {
//     constructor() {
//
//     }
// }
window.addEventListener('click', (e) => {
  console.log(e.target)

})
// document.querySelector('.todo').addEventListener('click',()=>{
//   if(document.querySelector('.todo').classList.contains('popup')) {
//     document.querySelector('.todo').classList.remove('popup')
//     document.querySelector('.todo').classList.remove('open')
//   }
// })


document.querySelector('.popup').addEventListener('click', ()=>{
  document.querySelector('.popup').classList.toggle('open')
  document.querySelector('.todo').classList.toggle('open')
  // document.querySelector('.settings__icon').classList.toggle('hide')
})
document.querySelector('.todo-icon').addEventListener('click', ()=> {
  console.log('+')
  // document.querySelector('.todo').style.opacity = '1'
  // document.querySelector('.todo').style.zIndex = '1'
  document.querySelector('.todo').classList.toggle('open')
  document.querySelector('.popup').classList.toggle('open')
  // document.querySelector('.settings__icon').classList.toggle('hide')
})

