var popUp     = document.getElementById('pop-up')
var newTask   = document.getElementById('btn-new-task')
var inpuTask  = document.getElementById('new-task')
var taskCont  = document.getElementById('task-container')
var task      = document.querySelectorAll('.task p')


function init(){
  console.log('initialize');

  // Create event listener on all tasks
  for (var i = 0; i < task.length; i++) {
    task[i].addEventListener('click', activateTask, false)
  }

  // Create New Task
  newTask.onclick = function(){
    createTask()
  }

  // Keyboard shotcut to create new task
  window.onkeydown = function(e){
    if (e.shiftKey  && e.keyCode == '78') {
      createTask()
      e.preventDefault()
    }
  }


  // Sortable Container
  Sortable.create(taskCont, {
    animation: 200
  });

}



function createTask(){

  // SHowing Fields
  toggleFields(1)

  // Clear input field
  inpuTask.value = ''

  // Focus input field
  var f = setTimeout(function(){inpuTask.focus()}, 200)


  // Press Enter and close window
  popUp.onkeydown = function(e){
    if (e.keyCode == '13' && inpuTask.value.length > 0) {
      toggleFields(0)

      var el = document.createElement('div')
      el.className = 'task'
      // el.addEventListener('click', activateTask, false)

      var p = document.createElement('p')
      p.innerHTML = inpuTask.value
      p.addEventListener('click', activateTask, false)

      var elSettings = document.createElement('div')
      elSettings.className = 'task-settings'

      var btnComplete = document.createElement('img')
      btnComplete.className = 'task-complete'
      btnComplete.src = 'img/complete.svg'
      btnComplete.addEventListener('click', completeTask, false)

      var btnRemove = document.createElement('img')
      btnRemove.className = 'task-remove'
      btnRemove.src = 'img/close.svg'
      btnRemove.addEventListener('click', removeTask, false)

      var line = document.createElement('div')
      line.className = 'line-throught'

      elSettings.appendChild(btnComplete)
      elSettings.appendChild(btnRemove)

      el.appendChild(p)
      el.appendChild(elSettings)
      el.appendChild(line)

      taskCont.appendChild(el)


    } else if (e.keyCode == 27){
      toggleFields(0)
    }else {
      console.log(e.keyCode);
    }
  }
}


function activateTask() {

  for (var i = 0; i < taskCont.children.length; i++) {
    taskCont.children[i].className = 'task'

  }
  this.parentElement.className = this.parentElement.className + ' active'

}


function completeTask(){
  var mainParent = this.parentElement.parentElement
  mainParent.className = 'task completed'
  console.log(mainParent);
}

function removeTask(){
  var mainParent = this.parentElement.parentElement
  removeAnimation(mainParent)
}

function toggleFields(val){
  console.log('toggleFields :: ' + val);

  if (val == 1) {
    TweenMax.fromTo(
      popUp,
      .5,
      {
        opacity: 0, display: 'none'
      },
      {
        opacity: 1, display: 'flex'
      }
    )
  } else {
    TweenMax.fromTo(
      popUp,
      .5,
      {
        opacity: 1, display: 'flex'
      },
      {
        opacity: 0, display: 'none'
      }
    )
  }

}

function removeAnimation(item){
  item.style.transition = 'none'
  item.style.margin = '0 auto'


  TweenMax.fromTo(item, .5, {
    width: '100%'
  },
  {
    width: 0, opacity: 0
  })

  var anim2 = TweenMax.to(item, .5, {
    height: 0
  })

  anim2.delay(.5)

  setTimeout(function(){item.remove()}, 1000)
}



window.onload = function(){
  init()
}
