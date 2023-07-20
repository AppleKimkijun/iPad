import ipads from '../data/ipads.js'
import navigations from '../data/navigations.js'

// 장바구니
const basketStarterEl = document.querySelector("header .basket-starter");
const basketEl = basketStarterEl.querySelector(".basket");


// 장바구니 토글 만들기 + stopPropagation을 사용해서 버블링막기 + 아무곳이나 눌러도 장바구니 창 닫기
basketStarterEl.addEventListener('click', function(event) {
    event.stopPropagation();
    if (basketEl.classList.contains('show')) {
        //hide
        hideBasket();
    }else {
        //show
        showBasket();
    }
});
basketEl.addEventListener('click',function(event) {
    event.stopPropagation();
});

window.addEventListener('click',function () {
    hideBasket();
    // hideSearch();
});

// 장바구니(starter)를 눌렀을때 basket을 보이기 & 숨기기 함수로 만들기
function showBasket() {
    basketEl.classList.add('show')
}
function hideBasket() {
    basketEl.classList.remove('show')
}

// 검색!
const headerEl = document.querySelector('header')
const headerMenuEls = [...headerEl.querySelectorAll('ul.menu li')]
const searchWrapEl = headerEl.querySelector('.search-wrap')
const searchStarterEl = headerEl.querySelector('.search-starter')
const searchCloserEl = headerEl.querySelector('.search-closer')
const searchShadowEl = headerEl.querySelector('.shadow')
const searchInputEl = searchWrapEl.querySelector('input')
const searchDelayEls = [...searchWrapEl.querySelectorAll('li')]

searchStarterEl.addEventListener('click',showSearch);

searchCloserEl.addEventListener('click',function(event) {
    event.stopPropagation()
    hideSearch()
});

searchShadowEl.addEventListener('click',hideSearch);

// 돋보기 버튼을 눌렀을때 함수
// 1. 헤더에 서칭 클래스 추가
// 2. HTML fixed로 스크롤 못내리게
// 3. 각각의 메뉴에 딜레이를 줘서 자연스럽게 사라지고 나타나게
// 4. 서치 안에 있는 내용들도 자연스럽게 사라지고 나타나게 
// 5. setTimeOut으로 서치 화면이 전부 나왔을때 focus 해주기
function showSearch() {
    headerEl.classList.add('searching');
    stopScroll()
    headerMenuEls.reverse().forEach(function (el, index) {
        el.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
    });
    searchDelayEls.forEach(function (el, index) {
        el.style.transitionDelay = index * .4 / searchDelayEls.length + 's'
    });
    setTimeout(function () {searchInputEl.focus()}, 600)
}

function hideSearch() {
    headerEl.classList.remove('searching')
    playScroll()
    headerMenuEls.reverse().forEach(function (el, index) {
        el.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
    });
    searchDelayEls.reverse().forEach(function (el, index) {
        el.style.transitionDelay = index * .4 / searchDelayEls.length + 's'
    });
    searchDelayEls.reverse()
    searchInputEl.value =''
}

function playScroll() {
    document.documentElement.classList.remove("fixed")
}

function stopScroll() {
    document.documentElement.classList.add("fixed");
}

// 헤더 메뉴 토글!
const menuStarterEl = document.querySelector('header .menu-starter')

menuStarterEl.addEventListener('click', function() {
    if (headerEl.classList.contains('menuing')) {
        headerEl.classList.remove('menuing')
        searchInputEl.value =''
        playScroll()
    }else {
        headerEl.classList.add('menuing')
        stopScroll()
    }
})

// 헤더 검색! 
const searchTextFieldEl = document.querySelector('header .textfield')
const searchCancelEl = document.querySelector('header .search-canceler')

searchTextFieldEl.addEventListener('click', function() {
    headerEl.classList.add('searching--mobile')
    searchInputEl.focus()
})
searchCancelEl.addEventListener('click',function() {
    headerEl.classList.remove('searching--mobile')
})


//
window.addEventListener('resize', function() {
    if(window.innerWidth <= 740) {
        headerEl.classList.remove('searching')
    }else {
        headerEl.classList.remove('searching-mobile')
    }
})


const navEl = document.querySelector('nav')
const navMenuToggleEl = navEl.querySelector('.menu-toggler')
const navMenuShadowEl = navEl.querySelector('.shadow')
navMenuToggleEl.addEventListener('click', function() {
    if (navEl.classList.contains('menuing')) {
        hideNaveMenu()
    }else {
        showNavMenu()
    }
})
navEl.addEventListener('click', function(event) {
    event.stopPropagation()
})

navMenuShadowEl.addEventListener('click',hideNaveMenu)
window.addEventListener('click',hideNaveMenu)

function showNavMenu() {
    navEl.classList.add('menuing')
}

function hideNaveMenu() {
    navEl.classList.remove('menuing')
}

// 요소의 가시성 관찰
// .info를 찾아서 info들을 .observe 화면에 보이는지 체크
// 체크를 하면서 entries들은 foreach를 돌면서 entry로 하나씩 보이면 .show라는 클래스를 붙여줘
// 그리고 !Intersectiong 이 펄스면 함수를 빠져나가
const io = new IntersectionObserver(function (entries) {
    entries.forEach(function(entry) {
        if (!entry.isIntersecting) {
            return
        }
        entry.target.classList.add('show')
    })
})

const infoEls = document.querySelectorAll('.info')
infoEls.forEach(function(el) {
    io.observe(el)
})



// 비디오 재생!
const video = document.querySelector('.stage video')
const playBtn = document.querySelector('.stage .controller--play')
const pauseBtn = document.querySelector('.stage .controller--pause')

playBtn.addEventListener('click', function() {
    video.play()
    playBtn.classList.add('hide')
    pauseBtn.classList.remove('hide')
})

pauseBtn.addEventListener('click', function() {
    video.pause()
    playBtn.classList.remove('hide')
    pauseBtn.classList.add('hide')
})

// 당신에게 맞는 ipad는? 렌더링!
const itemsEl = document.querySelector('section.compare .items')
ipads.forEach(function (ipad) {
    const itemEl = document.createElement('div')
    itemEl.classList.add('item')

    let colorList = ''
    ipad.colors.forEach(function(color) {
        colorList += `<li style = background-color:${color};></li>`
    })

    itemEl.innerHTML = /* HTML */ `
        <div class="thumbnail">
            <img src="${ipad.thumbnail}" alt="${ipad.name}" />
        </div>
        <ul class="colors">
            ${colorList}
        </ul>
        <h3 class="name">${ipad.name}</h3>
        <p class="tagline">${ipad.tagline}</p>
        <p class="price">₩${ipad.price.toLocaleString('en-US')}</p>
        <button class="btn">구입하기</button>
        <a href="${ipad.url}" class="link">더 알아보기</a>
    `

    itemsEl.append(itemEl)
})

// 푸터 내비게이션 맵 랜더링!
const navigationsEl = document.querySelector('footer .navigations')
navigations.forEach(nav => {
  const mapEl = document.createElement('div')
  mapEl.classList.add('map')

  let mapList = ''
  nav.maps.forEach(map => {
    mapList += /* html */ `<li>
      <a href="${map.url}">${map.name}</a>
    </li>`
  })

  mapEl.innerHTML = /* html */ `
    <h3>
      <span class="text">${nav.title}</span>
      <span class="icon">+</span>
    </h3>
    <ul>
      ${mapList}
    </ul>
  `

  navigationsEl.append(mapEl)
})

// 올해 연도를 적용!
const thisYearEl = document.querySelector('.this-year')
thisYearEl.textContent = new Date().getFullYear()

// 푸터 내비게이션 맵 아코디언
const mapEls = [...document.querySelectorAll('footer .navigations .map')]
mapEls.forEach(el => {
  const h3El = el.querySelector('h3')
  h3El.addEventListener('click', () => {
    el.classList.toggle('active')
  })
})
