const menu = document.getElementById("menu-title")
const menuLinks = document.getElementById("menu-links")
const mobileNavbar = document.getElementById("mobile-navbar")
const iconMenu = document.getElementById("icon-menu")
const calculatorContainer = document.querySelector(".calculator-container")
const calculator = document.querySelector(".calculator")

menu.onclick = () => {
  if (menuLinks.style.display === "none") {
    menuLinks.style.display = "block"
  } else {
    menuLinks.style.display = "none"
  }
}

iconMenu.onclick = () => {
  $("#mobile-navbar").slideToggle()
  /* if (mobileNavbar.style.display === "none") {
    mobileNavbar.style.display = "block"
  } else {
    mobileNavbar.style.display = "none"
  } */
}

/* MOBİLE NAVBAR'I RESPONSİVE YAPMAK İSTİYORSAK BUNU KULLANMALIYIZ */
window.addEventListener("resize",function (event) {
    if (window.innerWidth <= 575) {
      mobileNavbar.style.display = "none"
      /* Mobilde hesap makinesinin dönmemesi için id'yi kaldırdım (mobilde dönüş güzel olmadığı için kaldırdım) */
      document.querySelector(".calculator").removeAttribute("id")
    } else {
      document.querySelector(".calculator").setAttribute("id", "calculatorid")
    }
    if (window.innerWidth <= 992) {
      /* Mobilde to do app'in maxlength'ini kısıtladım 
      (Hard reload veya birkaç refresh atmak gerekiyor yoksa maxLength , mobilden masaüstüne veya masaüstünden bir anda mobile
      geçilince düzgün çalışmıyor) */
      document.querySelector("#to-do-input").setAttribute("maxLength", 24)
    }
  },
  true
)

/* CALCULATOR */
const result = document.getElementById("result")
const buttons = document.getElementById("buttons")
const swipe = document.getElementById("swipe")

//A
function display(val) {
  result.value += val
}

//B
function solve() {
  let y = eval(result.value)
  result.value = y
}

function resetInput() {
  result.value = ""
}

//C
function addSub() {
  if (result.value >= 0) {
    result.value = "-" + result.value
  }
}

function swipeUp() {
  $("#buttons").slideToggle()

  var x = document.getElementById("swipe-completed")
  /* setTimeout olmayınca swipe-completed id'sinin içindekiler aşağıdan yukarıya gelirken altlarındaki öğeleri kaydırıyor */
  setTimeout(() => {
    if (x.style.display === "block") {
      x.style.display = "none"
    } else {
      x.style.display = "block"
    }
  }, 300)
}

/* SWIPE UP REMINDER */
setInterval(() => {
  $("#swipe").addClass("swipe-up")
  /* $("#swipe").slideUp(); */
}, 8000)
setInterval(() => {
  $("#swipe").removeClass("swipe-up")
  /* $("#swipe").slideDown(); */
}, 8100)

setTimeout(() => {
  $("#swipe").slideUp()
}, 3000)

setTimeout(() => {
  $("#swipe").slideDown()
}, 3100)

/* SWIPE CODE TAKEN FROM GIVANSE https://stackoverflow.com/users/7852/givanse */

swipe.addEventListener("touchstart", handleTouchStart, false)
swipe.addEventListener("touchmove", handleTouchMove, false)

var xDown = null
var yDown = null

function getTouches(evt) {
  return (
    evt.touches || // browser API
    evt.originalEvent.touches
  ) // jQuery
}

function handleTouchStart(evt) {
  const firstTouch = getTouches(evt)[0]
  xDown = firstTouch.clientX
  yDown = firstTouch.clientY
}

function handleTouchMove(evt) {
  if (!xDown || !yDown) {
    return
  }

  var xUp = evt.touches[0].clientX
  var yUp = evt.touches[0].clientY

  var xDiff = xDown - xUp
  var yDiff = yDown - yUp

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    /*most significant*/
    if (xDiff > 0) {
      /* right swipe */
    } else {
      /* left swipe */
    }
  } else {
    if (yDiff > 0) {
      /* down swipe */
      $("#buttons").slideToggle()
      var x = document.getElementById("swipe-completed")
      if (x.style.display === "block") {
        x.style.display = "none"
      } else {
        x.style.display = "block"
      }
    } else {
      /* up swipe */
      $("#buttons").slideToggle()
      var x = document.getElementById("swipe-completed")
      if (x.style.display === "block") {
        x.style.display = "none"
      } else {
        x.style.display = "block"
      }
    }
  }
  /* reset values */
  xDown = null
  yDown = null
}
/* END OFF CALCULATOR */

/* CLOCK */
function showTime() {
  const clock = document.getElementById("myClockDisplay")
  const toDoClock = document.getElementById("toDoAppClock")
  let newDate = new Date()
  let hours = newDate.getHours()
  let minutes = newDate.getMinutes()
  let seconds = newDate.getSeconds()

  if (seconds < 9) {
    seconds = "0" + seconds
  } else if (minutes < 9) {
    minutes = "0" + minutes
  }

  clock.innerText = hours + " : " + minutes
  toDoClock.innerText = hours + " : " + minutes
  setTimeout(showTime, 100)
}
showTime()

/* ScrollY animation */
function scrollAnimation() {
  const calculatorPhone = document.getElementById("calculatorid")

  let scrolly = window.scrollY
  
  calculatorPhone.style.transform = "rotate(" + scrolly / 1.5 + "deg)"
  setTimeout(scrollAnimation, 10)
}
scrollAnimation()

/* TO DO APP */
/* VANILLA JAVASCRIPT */
const form = document.querySelector("form")
const input = document.querySelector("#to-do-input")
const sendButton = document.querySelector("#sendButton")
const clearButton = document.querySelector("#clearButton")
const toDoSwipe = document.querySelector("#to-do-swipe")

/* Get from Local Storage */
function getTasks() {
  let tasks
  if (localStorage.getItem("tasks") === null) {
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"))
  }
  tasks.forEach(function (task) {
    /* Create ul */
    const ul = document.createElement("ul")

    /* Create li */
    const li = document.createElement("li")

    /* Create anchor */
    const link = document.createElement("a")

    /* append ul to form */
    form.appendChild(ul)

    /* append li to ul */
    ul.appendChild(li)

    /* add fontawesome to anchor */
    link.innerHTML = '<i class="fa fa-remove delete-symbol"></i>'

    /* li content is equal input value */
    li.appendChild(document.createTextNode(task.toLowerCase()))
    /* add link to li */
    li.appendChild(link)

    /* to do limits */
    if (21 < document.getElementsByTagName("i").length) {
      sendButton.disabled = true
    } else {
      sendButton.disabled = false
    }

    /* Completed to do */
    li.addEventListener("click", () => {
      li.classList.toggle("li-background")
    })

    /* Remove to do */
    link.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete-symbol")) {
        if (confirm("Are you sure ?")) {
          e.target.parentElement.parentElement.remove()
          /* for to do limit */
          sendButton.disabled = false
          /* Clear from local Storage */
          removeFromLocalStorage(e.target.parentElement.parentElement)
        }
      }
    })
  })
}
getTasks()
/* ----------END OF LOCAL STORAGE------------- */

sendButton.addEventListener("click", () => {
  if (input.value === "") {
    alert("Add a to do")
    /* if i don't remove link when input.value is "" , it will add link(x) when input.value is empty "" */
    li.removeChild(link)
  }

  /* Create ul */
  const ul = document.createElement("ul")

  /* Create li */
  const li = document.createElement("li")

  /* Create anchor */
  const link = document.createElement("a")

  /* append ul to form */
  form.appendChild(ul)

  /* append li to ul */
  ul.appendChild(li)

  /* add fontawesome to anchor */
  link.innerHTML = '<i class="fa fa-remove delete-symbol"></i>'

  /* li content is equal input value */
  /* li.textContent = input.value */
  li.appendChild(document.createTextNode(input.value.toLowerCase()))
  /* add link to li */
  li.appendChild(link)

  /* to do limits */
  if (21 < document.getElementsByTagName("i").length) {
    sendButton.disabled = true
    alert("Your to do limit is done")
  } else {
    sendButton.disabled = false
  }

  // Store in Local Storage
  storeTaskInLocalStorage(input.value)

  /* Clear Input */
  input.value = ""

  /* Completed to do */
  li.addEventListener("click", () => {
    li.classList.toggle("li-background")
  })

  /* Remove to do */
  link.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-symbol")) {
      if (confirm("Are you sure ?")) {
        e.target.parentElement.parentElement.remove()
        /* for to do limit */
        sendButton.disabled = false
        /* Clear from local Storage */
        removeFromLocalStorage(e.target.parentElement.parentElement)
      }
    }
  })
})

/* Enter keydown */
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    sendButton.click()
  }
})

/* Remove all to do */
clearButton.addEventListener("click", () => {
  form.innerHTML = ""
  localStorage.clear()
  sendButton.disabled = false
})

/* Remove to do from Local Storage*/
function removeFromLocalStorage(taskItem) {
  let tasks
  if (localStorage.getItem("tasks") === null) {
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"))
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1)
    }
  })
  localStorage.setItem("tasks", JSON.stringify(tasks))
}

/* Save to do in the Local Storage */
function storeTaskInLocalStorage(task) {
  let tasks
  if (localStorage.getItem("tasks") === null) {
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"))
  }
  tasks.push(task)

  /* .setItem'la oluşturduğumuz tasks'ları JSON.stringify'a dönüştürüyoruz*/
  localStorage.setItem("tasks", JSON.stringify(tasks))
}

function toDoSwipeUp() {
  $(".todo").slideToggle()

  var x = document.getElementById("to-do-swipe-completed")
  if (x.style.display === "block") {
    x.style.display = "none"
  } else {
    x.style.display = "block"
  }
}

/* SWIPE UP REMINDER */
setInterval(() => {
  $("#to-do-swipe").addClass("swipe-up")
  /* $("#swipe").slideUp(); */
}, 8000)
setInterval(() => {
  $("#to-do-swipe").removeClass("swipe-up")
  /* $("#swipe").slideDown(); */
}, 8150)

setTimeout(() => {
  $("#to-do-swipe").slideUp()
}, 3000)

setTimeout(() => {
  $("#to-do-swipe").slideDown()
}, 3100)

/* SWIPE CODE TAKEN FROM GIVANSE https://stackoverflow.com/users/7852/givanse */

toDoSwipe.addEventListener("touchstart", handleTouchStart, false)
toDoSwipe.addEventListener("touchmove", handleTouchMove, false)

var xDown = null
var yDown = null

function getTouches(evt) {
  return (
    evt.touches || // browser API
    evt.originalEvent.touches
  ) // jQuery
}

function handleTouchStart(evt) {
  const firstTouch = getTouches(evt)[0]
  xDown = firstTouch.clientX
  yDown = firstTouch.clientY
}

function handleTouchMove(evt) {
  if (!xDown || !yDown) {
    return
  }

  var xUp = evt.touches[0].clientX
  var yUp = evt.touches[0].clientY

  var xDiff = xDown - xUp
  var yDiff = yDown - yUp

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    /*most significant*/
    if (xDiff > 0) {
      /* right swipe */
    } else {
      /* left swipe */
    }
  } else {
    if (yDiff > 0) {
      /* down swipe */
      $(".todo").slideToggle()
      var x = document.getElementById("to-do-swipe-completed")
      if (x.style.display === "block") {
        x.style.display = "none"
      } else {
        x.style.display = "block"
      }
    } else {
      /* up swipe */
      $(".todo").slideToggle()
      var x = document.getElementById("to-do-swipe-completed")
      if (x.style.display === "block") {
        x.style.display = "none"
      } else {
        x.style.display = "block"
      }
    }
  }
  /* reset values */
  xDown = null
  yDown = null
}

/* END OF TO DO APP */

/* Title Animation */

for (let index = 1; index < 14; index++) {
  let word = document.querySelector("#word" + [index])
  setTimeout(() => {
    word.classList.toggle ("calculator-title-animation")
    console.log(index);
  }, index * 120);
}

const titleCalculatorWord = document.querySelector("#calculator-text")
setTimeout(() => {
  titleCalculatorWord.classList.add("calculator-text-animation")
}, 1400);


// loop'u kullanmadan önce title animation'u bununla çalıştırmıştım
/* const firstWord = document.getElementById("firstWord")
const secondWord = document.getElementById("secondWord")
const thirdWord = document.getElementById("thirdWord")
const fourthWord = document.getElementById("fourthWord")
const fifthWord = document.getElementById("fifthWord")
const sixthWord = document.getElementById("sixthWord")
const seventhWord = document.getElementById("seventhWord")
const eigthWord = document.getElementById("eigthWord")
const ninthWord = document.getElementById("ninthWord")
const tenWord = document.getElementById("tenWord")
const elevenWord = document.getElementById("elevenWord")
const twelfWord = document.getElementById("twelfWord")
const thirteenWord = document.getElementById("thirteenWord")

setTimeout(() => {
  firstWord.classList.toggle ("calculator-title-animation")
}, 750);

setTimeout(() => {
  secondWord.classList.toggle ("calculator-title-animation")
}, 800);

setTimeout(() => {
  thirdWord.classList.toggle ("calculator-title-animation")
}, 850);

setTimeout(() => {
  fourthWord.classList.toggle ("calculator-title-animation")
}, 900);

setTimeout(() => {
  fifthWord.classList.toggle ("calculator-title-animation")
}, 950);

setTimeout(() => {
  sixthWord.classList.toggle ("calculator-title-animation")
}, 1000);

setTimeout(() => {
  seventhWord.classList.toggle ("calculator-title-animation")
}, 1050);

setTimeout(() => {
  eigthWord.classList.toggle ("calculator-title-animation")
}, 1100);

setTimeout(() => {
  ninthWord.classList.toggle ("calculator-title-animation")
}, 1150);

setTimeout(() => {
  tenWord.classList.toggle ("calculator-title-animation")
}, 1200);

setTimeout(() => {
  elevenWord.classList.toggle ("calculator-title-animation")
}, 1250);

setTimeout(() => {
  twelfWord.classList.toggle ("calculator-title-animation")
}, 1300);

setTimeout(() => {
  thirteenWord.classList.toggle ("calculator-title-animation")
}, 1350);
 */
