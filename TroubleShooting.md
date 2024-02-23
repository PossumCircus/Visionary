2024.02.20
ⓐw:800에서 그리드가 헤더와 네브를 무시하고 위치하는 문제   <<SOLVED>>
!! translate -50, -45로 헤더와 네브의 높이 고려해서 css 설정.
-stacking order는 외관의 순서에 따라 결정됩니다. 규칙에 의하면 마크업에서 나중에 오는 요소는 앞에 오는 요소의 위에 있습니다.
stacking order가 결정되기위한 다른 가이드라인 중 하나는 element에 position이 설정되었는지 아닌지에 의해 결정
=>>element의 위치를 설정하려면 static이 아닌 relative, absolute와같은 값을 CSS의 position 속성을 추가
opacity 또는 transform같은 css 속성들을 설정하면 element가 새로운 stacking context에 배치
.cat-bottom {    
    float: right;
    margin-top: -120px;
    *transform: rotate(180deg);* 이 부분에 의해서 stacking context에 변화가 생기게 됨.
}
https://erwinousy.medium.com/z-index%EA%B0%80-%EB%8F%99%EC%9E%91%ED%95%98%EC%A7%80%EC%95%8A%EB%8A%94-%EC%9D%B4%EC%9C%A0-4%EA%B0%80%EC%A7%80-%EA%B7%B8%EB%A6%AC%EA%B3%A0-%EA%B3%A0%EC%B9%98%EB%8A%94-%EB%B0%A9%EB%B2%95-d5097572b82f

ⓑ레이아웃의 Nav에서 Link를 올바르게 사용했음에도 클릭해도 안 넘어가는 문제 <<SOLVED>>
!! pointer-events: none; 문제였음. 커서 이벤트가 인식이 안 되어서 링크가 가동X


2024.02.21
ⓐ 완료 버튼이 혼자 길어지는 문제 <<SOLVED>>
++문제 원인 : form 태그 안에 button 태그를 함께 써서 생기는 문제. 버튼에 넓이를 주면 form도 그 만큼 늘어나서 발생하는 문제 같음.
-부모 태그를 무시하고 자식 태그에서 큰 넓이를 줘서 발생한 문제?
!! form에 className 부여, form의 width를 12dvw로 설정후 btn을 width : 100%로 할당하여 해결.