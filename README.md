# 칭찬 릴레이사이트 입니다

## Structure 예시 ##
```
 structure = {
  post : [{
                id : 1,
                userName : "",
                desc : "",
                comment : [
                  {
                    commentId : 1,
                    userName : "",
                    content : "",
                  },
                  {
                    commentId : 2,
                    userName : "",
                    content : "",
                  },
                ]
              }]
  }
```
---
```
structure == {
  post : [{
    id = 1,
    user = "
  }],
  comment : [{
    postId = 1,
    commentId= 1,
    comment
  }]
}
```
---

## Reducers ##


**CREATE**
addSmile -- 스테이트 구조에 때문에 위의 형식처럼 객체를 추가 시키면 될것 같습니다.
addComment -- 눌린 포스트의 ID 값을 찾아서 그 안에 해당하는 comment의 배열에 추가

**READ**
useSelector로 잘받아서 보여주세용

**UPDATE**
차차생각


**DELETE**

Delete - ID찾아서 그 필터 쓰기
deletecomment -- "배열에 있는거 제거"

### 폴더 구조 ###

Components
- Comment.js
- ComplimentCard.js
- ComplimentList.js
- Footer.js
- Header.js
- InputCompliment.js
- Layout.js
- Modal.js

Route
 - router.js

Pages
- Intropage.js
- Mainpage.js
- Modalpage.js

Redux
  - Config
    - configStore.js
  - Modules
    - compliments.js


### Intalled Package ###

- `yarn create creat-app --template redux` -- 리덕스 툴킷도 자동생성됨.
- `yarn add styled-components`
- `yarn add react-router-dom`



          


