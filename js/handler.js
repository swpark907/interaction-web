(() => {
  let yOffset = 0; // window.pageYOffset 대신 쓸 변수
  let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset) 보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
  let currentScene = 0; // 현재 활성화된(눈 앞에 보고있는) 씬(scroll-section)

  const sceneInfo = [
    {
      // 0
      type: "sticky",
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-0"),
        messageA: document.querySelector("#scroll-section-0 .main-message.a"),
        messageB: document.querySelector("#scroll-section-0 .main-message.b"),
        messageC: document.querySelector("#scroll-section-0 .main-message.c"),
        messageD: document.querySelector("#scroll-section-0 .main-message.d"),
      },
      values: {
        messageA_opacity: [0, 1],
        messageA_translateY: [],
      },
    },
    {
      // 1
      type: "normal",
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-1"),
      },
    },
    {
      // 2
      type: "sticky",
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-2"),
      },
    },
    {
      // 3
      type: "sticky",
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-3"),
      },
    },
  ];

  function setLayout() {
    // 각 스크롤 섹션의 높이 세팅
    for (let i = 0; i < sceneInfo.length; i++) {
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      sceneInfo[
        i
      ].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }

    // 초기 화면의 스크롤 위치 파악해서 id 부여
    let totalScrollHeight = 0;
    for (let i = 0; sceneInfo.length; i++) {
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if (totalScrollHeight > pageYOffset) {
        currentScene = i;
        break;
      }
    }
    document.body.setAttribute("id", `show-scene-${currentScene}`);
  }

  function calcValues(values){
    
  }

  function playAnimation() {
    switch (currentScene) {
      case 0:
        console.log("play 0");
        break;
      case 1:
        console.log("play 1");
        break;
      case 2:
        console.log("play 2");
        break;
      case 3:
        console.log("play 3");
        break;
      default:
        return;
    }
  }

  function scrollLoop() {
    prevScrollHeight = 0;
    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }
    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      currentScene++;
    }
    if (yOffset < prevScrollHeight) {
      if (currentScene === 0) return; // 모바일 바운스 시 마이너스 되는 것 방지
      currentScene--;
    }

    document.body.setAttribute("id", `show-scene-${currentScene}`);
    playAnimation();
  }

  window.addEventListener("resize", setLayout);
  window.addEventListener("load", setLayout);
  window.addEventListener("scroll", () => {
    yOffset = window.pageYOffset;
    scrollLoop();
  });
})();
