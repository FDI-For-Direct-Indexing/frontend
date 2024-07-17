## src 폴더 구조

> 용도에 맞게 사용하세요

```
─ src
 ├─ assets 
 ├─ common
 ├─ config
 ├─ constants
 ├─ contexts
 ├─ DOMAIN(각 도메인에 맞게 폴더 생성됨)
 |  ├─ components
 |  ├─ hooks (= hoc)
 |  ├─ styles
 |  ├─ services (= api)
 |  ├─ utils
 |  └─ pages
 ├─ App.js
 └─ index.js
```
***
### 공통 폴더
- assets

이미지 혹은 폰트와 같은 파일들이 저장되는 폴더입니다.   
이미지와 같은 파일들을 public에 직접 넣는 경우도 있는데 둘의 차이는 컴파일시에 필요한지 여부입니다.   
파비콘과 같이 index.html내부에서 직접 사용하여 컴파일 단계에서 필요하지 않은 파일들은 public에   
반면, 컴포넌트 내부에서 사용하는 이미지 파일인 경우 이 assets 폴더에 위치시켜야 합니다.

- common
 
재사용 가능한 컴포넌트들이 위치하는 폴더   
  common/ui는 작은 UI적 요소들이 포함되어있는 폴더
  
- config

config 파일이 많지 않은 경우 보통 최상위에 위치시켜놓지만 여러개의 config 파일이 있을 경우 폴더로 분리하기도 합니다.

- constants
 
공통적으로 사용되는 상수들을 정의한 파일들이 위치하는 폴더입니다.


- contexts

contextAPI를 사용할 때 관련 파일들이 위치하는곳으로 상태관리를 위해 contextAPI 대신 redux를 사용 할 경우 폴더 이름을 store로 사용하기도 합니다.

***
### 도메인 내 폴더

- components

재사용 가능한 컴포넌트들이 위치하는 폴더   
컴포넌트는 많아질 수 있기에 components내부에서 하위폴더로 분류하는 경우가 많음


- hooks (= hoc)

커스텀 훅이 위치하는 폴더입니다.


- styles

css 파일들이 포함되는 폴더입니다.

- services (= api)

보통 api관련 로직의 모듈 파일이 위치하며 auth와 같이 인증과 관련된 파일이 포함되기도 합니다.


- utils

정규표현식 패턴이나 공통함수 등 공통으로 사용하는 유틸 파일들이 위치하는 폴더입니다.

- pages

react router등을 이용하여 라우팅을 적용할 때 페이지 컴포넌트를 이 폴더에 위치시킵니다.
***