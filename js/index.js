$(document).ready(function () {


  /* 드롭다운메뉴____________________________________ */

  $(".main").hover(function(){
    $(this).find(".sub").stop().slideDown();
  },function(){
    $(this).find(".sub").stop().slideUp();
  });

  /* 메인이미지_________________________________ */

  let $simg=$(".slide ul");
  let $simgli=$(".slide ul li");
  let $snext=$(".slide_side_btn .rbtn");
  let $spre=$(".slide_side_btn .lbtn");
  let simg_w=$simgli.width(); 
  let simg_n=$simgli.length; 
  let soldidx=0; 
  let sindex=0;
  

  //index번째 비주얼이미지 이동하는 함수생성
  function slideImg(sindex){ 
    targetX=-(sindex*simg_w) 
    $simg.stop().animate({left:targetX},600);
  };

  //자동함수 생성
  function slideAuto(){
    sindex++;
    if(sindex == simg_n){ //simg_n은 이미지개수 5, index는 0,1,2,3,4
      sindex=0;
    }
    slideImg(sindex); 
  };

  auto = setInterval(slideAuto,4000);  


  //좌우버튼
  $spre.click(function(){
    clearInterval(auto); 
    sindex--;
    if(sindex<0){ 
      sindex=simg_n-1;
    }
    slideImg(sindex);
    auto = setInterval(slideAuto,4000);
  });

  $snext.click(function(){
    clearInterval(auto);
    sindex++;
    if(sindex == simg_n){ 
      sindex=0;
    }
    slideImg(sindex); 
    auto = setInterval(slideAuto,4000);
  });



  /* 메뉴________________________________________________ */

  $(".tab li").click(function(){

    //선택되지 않은 모든 이미지는 회색 이미지로...
    for(i=0;i<6;i++){
      $(".tab li").eq(i).find("img").attr({"src":"image/tab"+i+".png"});
    }

    $(".i1").removeClass("active"); //css에서 적용된 1번째 현재위치활성화 해지

    let inum =$(this).index();
    $(this).find("img").attr({"src":"image/tabon"+inum+".png"});

  let result = $(this).attr("data-alt");
  $(".tabContents div").removeClass("active");
  $("#" + result).addClass("active");
  });



  /* 베스트 아이템______________________________________________ */

  let imgp_w=$(".slidep ul li").width(); 
  let simgp_n= $(".slidep ul li").length;  
  let sindexp=0;

  let g_pop=$(".slidep ul li").index();
  $(".page span:nth-child(1)").text(g_pop+1); //index는 0부터 시작하므로 페이지를 표시하기 위해 1을 더함

  
  //index번째 비주얼이미지 이동하는 함수생성
  function slidepImg(sindexp){
    targetpX=-(sindexp*imgp_w); 
    $(".slidep ul").stop().animate({left:targetpX},600);
  };


  //이전보기
  $(".sidep_btn .prep").click(function(){
    sindexp--;
    if(sindexp<0){ 
      sindexp=0;
    }
    slidepImg(sindexp);

    if(g_pop>0){
			g_pop--;
			$(".page span:nth-child(1)").text(g_pop+1); //바뀌는 페이지 표시
		};

  });

  //다음보기
  $(".sidep_btn .nexp").click(function(){
    sindexp++;
    if(sindexp>=simgp_n-1){ 
      sindexp=4;
    }
    slidepImg(sindexp);

    if(g_pop<4){
			g_pop++;
			$(".page span:nth-child(1)").text(g_pop+1); //바뀌는 페이지 표시
		};
  });




  /* 이벤트_________________________________ */


  let $img = $(".changeimg ul li");
  let $btn = $(".btn ul li");
  let $lbtn = $(".side_btn .lbtn");
  let $rbtn = $(".side_btn .rbtn");
  let oldidx = 0; //기존이미지
  let idx = 0; //새로 바뀌는 이미지
  let img_n = $img.length; // length메서드 -> 1,2,3...이미지의 개수를 세어서 변수를 저장

  //이미지와 버튼이 바뀌는 함수
  function changeImg(idx){ //매개변수가 있는 함수 ->idx는 선택되는 이미지
    if(oldidx != idx){ //기존의 이미지와 선택된 이미지가 다를때...
      $btn.eq(oldidx).removeClass("active"); //기존 하단버튼 비활성화 ->active 클래스를 삭제
      $btn.eq(idx).addClass("active"); //선택된 하단버튼 활성화- >active 클래스를 추가
      $img.eq(oldidx).stop().fadeOut("300"); //기존 이미지 사라짐
      $img.eq(idx).stop().fadeIn("300"); //새로 바뀌는 이미지 나타남  
    }
    oldidx = idx;  //새로 바뀐 이미지는 이미지는 다시 기존이미지로 저장되어서 Fade Out...
  };

  //자동함수 생성
  function changeAuto(){
    idx++;
    if(idx > img_n-1){ //index는 0부터, length는 1부터 시작하므로 1을 빼주어야 마지막 숫자가 맞음
      idx=0;
    }
    changeImg(idx);
  };

  timer = setInterval(changeAuto,4000); //4초 간격으로 함수를 자동재생

  //하단버튼
  $btn.click(function(){
    clearInterval(timer); //클릭하면 자동화부터 멈추게 함:자동함수 해지->clearInterval(변수)
    idx=$(this).index();
    changeImg(idx);
    timer = setInterval(changeAuto,4000);
  });

  //좌우버튼
  $lbtn.click(function(){
    clearInterval(timer);
    idx--;
    if(idx < 0){ //선택한 이미지가 4,3,2...0 첫번째일때 맨 마지막부터 다시 시작
      idx=img_n-1;
    }
    changeImg(idx);
    timer = setInterval(changeAuto,4000);
  });

  $rbtn.click(function(){
    clearInterval(timer);
    idx++;
    if(idx > img_n-1){ //선택한 이미지가 0,1,2,3...4 마지막번째일때 맨 처음부터 다시 시작
      idx=0;
    }
    changeImg(idx);
    timer = setInterval(changeAuto,4000);
  });


  
});