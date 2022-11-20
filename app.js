const menu = document.getElementById("menu-title")
const menuLinks = document.getElementById("menu-links")
const mobileNavbar = document.getElementById("mobile-navbar")
const iconMenu = document.getElementById("icon-menu")
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
$(window).resize(function () {
  if (window.innerWidth <= 575) {
    mobileNavbar.style.display = "none"
    /* Mobilde hesap makinesinin dönmemesi için id'yi kaldırdım (mobilde dönüş güzel olmadığı için kaldırdım) */
    document.querySelector(".calculator").removeAttribute("id")
  } else {
    document.querySelector(".calculator").setAttribute("id", "calculatorid")
  }
})

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
  }, 250)
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
  const clock = document.getElementById("MyClockDisplay")
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
  setTimeout(showTime, 100)
}
showTime()

/* ScrollY animation */
function scrollAnimation() {
  let scrolly = window.scrollY
  document.getElementById("calculatorid").style.transform =
    "rotate(" + scrolly / 1.5 + "deg)"
  setTimeout(scrollAnimation, 10)
}
scrollAnimation()
