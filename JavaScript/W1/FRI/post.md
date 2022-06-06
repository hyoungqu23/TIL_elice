# Git
## 00. Git을 사용하는 이유
효율적인 협업을 위해 Git을 사용한다.

여러 개발자가 동시에 작업을 하는 과정에서, 각각 개발자가 업로드한 버전이 다르기 때문에 한 개발자가 변경한 버전이 사라질 수도 있고, 동시에 하나의 파일을 수정하는 경우 각 개발자가 수정한 파일을 하나로 병합할 필요성이 있다.

쉬운 버전 관리를 위해 Git을 사용한다.

Git은 각 파일을 snapshot으로 저장하기 때문에 버전 관리에 용이하므로, 백업 파일을 지속적으로 만드는 것보다 쉽고 효율적으로 버전 관리를 할 수 있고, 데이터의 안정성이 보장된다.

오픈 소스로 누구나 사용할 수 있다.

## 01. Git의 특징
가지치기와 병합이 자유롭다.
때로는 여러 작업이 동시에 할 수 있는데, 혼합되면 안되는 상황이 존재한다. 이때 Git이 메인 코드(master branch)에서 독립성을 유지한 채 다른 개발 작업을 진행할 수 있게 해주고, 이를 병합하여 메인 코드로 반영한 후 배포할 수 있다.
즉, 각각의 작업이 독립성이 유지되어 협업에 유리하다.

가볍고 빠르다.
서버가 아닌 로컬에서 진행되기 때문에 가볍고 빠르게 진행된다. 다른 사람과 코드를 공유하는 시점에만 중앙 서비스에 접속하면 되기 때문에 네트워크 속도에 관계 없이 빠르게 진행할 수 있다.

분산 작업에 효율적이다.
각 개발자는 복사된 프로젝트에서 동시에 작업을 진행할 수 있고, 전체 프로젝트의 모든 코드를 가지고 있으므로, 서로 단절되더라도 개발에 문제가 없다. 추가로 따로 통합 관리자를 두어 병합의 역할에 집중할 수 있다.

파일의 차이점을 기록하는 서버형 버전 관리 시스템인 SVN과 달리 Git은 각 개발자가 중앙 집중된 서버 저장소와 독립된 상태로 작업할 수 있고, 네트워크 사용이 적다.(각자 온전한 프로젝트 파일을 가지고 있고, 스냅샷 형태로 관리하며 각 작업자들의 버전 히스토리를 가질 수 있다.)

프로젝트의 무결성을 보장할 수 있다.
Commit ID가 동일하면, 파일과 구성이 완벽히 동일한 것이다. 따라서 누가 어떤 파일을 작업했는지 확실히 알 수 있고, 데이터가 보장된다.

준비 영역을 통해 검토에 유리하다.
>Working Directory -> Staging Area -> Repository

staging area에 `git add`하고, 검토한 후에 `git commit` 명령어를 통해 레포지토리에 업로드할 수 있다.

오픈소스이다.
공개된 오픈소스로, 누구나 기여할 수 있다.

## 02. Git 설치 및 초기 설정
[여기](https://git-scm.com/downloads)서 본인의 컴퓨터에 맞는 설치 파일을 다운로드하고, 이를 실행하면 된다.
이후 Git Bash(윈도우 기준)을 실행하고, 버전을 확인하면 된다.
```
git version
```

잘 설치가 된 것을 확인하면, 사용자 정보를 설정해야 한다. 저장소에 코드를 반영할 때 등록될 사용자 정보를 설정해야 한다.
```
git config --global user.name "이름"
git config --global user.email 이메일
```
사용자 정보를 설정했다면, 다음 명령어를 통해 설정한 내용을 확인할 수 있다.
```
git config --list
```

### 📝 실습 01 | Git 버전 확인
```
git version
```

### 📝 실습 02 | Git 유저 설정
```
git config --global user.name "elice"
git config --global user.email "rabbit@elice.io"
git config --list
```

## 03. Git 저장소 생성
다음 명령어를 통해 기존 디렉토리를 git 레포지토리로 설정할 수 있다.
```
cd 기존 디렉토리 경로
git init
```
혹은 다음 명령어를 통해 이동하지 않고 생성할 수 있다.
```
git init 기존 디렉토리 경로
```

해당 디렉토리로 이동 후 다음 명령어로 전체 파일을 살펴보면 `.git` 디렉토리가 생성되며 레포지토리가 생성되었음을 확인할 수 있다.
```
ls -al
```
### 📝 실습 03 | Git 저장소 생성
```
git init
git init ./temporary/elice
```
```
ls -al
```

### 📝 실습 04 | 여러 개의 Git 저장소 생성
`project1` 저장소 생성
```
git init project1
```
`mydir` 디렉토리로 이동한 후 `hello` 저장소 생성
```
cd mydir
git init hello
```
`world` 디렉토리로 이동한 후 Git 저장소 생성
```
cd world
git init
```
혹은
```
git init ./world
```

## 04. Git 파일 생성(`git add`)
우선, 다음 명령어로 새롭게 작업한 파일 `comment.js`를 Staging Area으로 보내야 한다.
```
git add comment.js
```
Staging Area으로 보낼 파일이 많다면, 현재 디렉토리의 모든 대상을 한 번에 보낼 수도 있다.
```
git add .
```
이후, 다음 명령어를 통해 Staging Area의 어떤 파일이 변경되었는지 등의 파일의 상태를 확인할 수 있다.
```
git status
```

## 05. Git 저장소 반영(`git commit`)
다음 명령어를 통해 Staging Area에 올린 파일에 무엇을 수정하고 추가했는지에 대해 메시지를 남겨 저장소에 저장할 수 있다. 다만 이 명령어는 `.git` 저장소 내의 모든 Staging 파일을 저장소로 반영한다.
```
git commit
```
반영한 내용을 추후에 쉽게 알 수 있도록 적절한 커밋 메시지를 작성할 수 있다.
```
git commit -m "commitMessage"
```
메시지 오타, 파일 누락 등 반영 내용을 수정하고 싶을 때는 다음 명령어를 통해 텍스트 편집기를 실행하여 수정한 후 저장하면 그대로 반영된다.
```
git commit --amend -m "수정할 커밋 명"
```
저장소 반영 내역은 다음 명령어를 통해 확인할 수 있다.
```
git log
```

### 📝 실습 05 | Git 저장소 생성 및 커밋
Staging Area에 `main.py` 파일 추가
```
git add main.py
```
Staging Area 확인
```
git status
```
Staging Area의 파일 커밋
```
git commit -m "Initial commit"
```
커밋 기록 확인
```
git log
```
참고
`git commit -m <커밋 메세지>`를 이용하면 에디터 없이 바로 커밋 메세지를 작성할 수 있어요.
만약 `git commit`이라고 적으면 nano에디터가 켜져요.
nano에디터에서는 `Ctrl` + `X` -> `Y` -> `Enter` 순서로 누르면 저장할 수 있어요.

## 06. Git 관리 상태 확인
### `git status`, `git diff`
다음 명령어를 통해 Staging Area에 있는 Staging Files의 상태를 확인할 수 있다.
```
git status
```
커밋된 파일 중 변경된 사항을 비교하려면 다음 명령어를 활용하면 된다.
```
git diff
```

### `git log`
다음 명령어로는 `.git` 저장소에 모든 커밋 반영 내역을 확인할 수 있다.
```
git log
```

#### `-p`, `-patch`
각 커밋의 수정 결과를 보여주는 diff와 동일한 역할을 수행하는 옵션

#### `-n`
상위 n개의 커밋만 출력하게끔 설정하는 옵션

#### `--stat`
어떤 파일이 커밋에서 수정되고 변경되었는지, 파일 내 라인의 추가/삭제를 확인하는 옵션

#### `--pretty=oneline`
각 커밋을 한 줄로 출력하게끔 설정하는 옵션

#### `--graph`
커밋 간의 연결 관계를 아스키 그래프로 출력하는 옵션, Branch에서 유용하게 활용된다.

#### `-S text`
코드에서 추가되거나 제거된 내용 중 특정 텍스트(text)가 포함되어 있는지 검사하는 옵션

### 🚩 퀴즈 02 | Git 파일의 상태
Git 파일의 상태를 확인한 후 staging을 취소하기 위해서는 다음 명령어가 필요하다.
```
git reset HEAD README.txt
```
이후 수정된 파일을 저장소에 커밋하려면 처음부터 시작해야 한다.
```
git add crawling.py
git commit -m "add crawling.py"
```

### 📝 실습 06 | 현재 상황 확인
git 저장소의 현재 상태 확인
```
git status
```

### 📝 실습 07 | 원하는 파일 커밋
원하지 않는 파일이 Staging Area에 있는 경우 제거
```
git reset README.txt
```
이후 원하는 파일만 Staging Area에 추가
```
git add crawling.py rat.py
```

### 🚩 퀴즈 03 | Git 파일의 생명 주기
`git add` 명령을 거친 파일은 Staged 상태가 된다.
Untracked 파일을 Git에 추가하려면 `add`해야 한다.
Unmodified 파일은 항상 Git 저장소에 있는 파일과 내용이 같다.
Modified 파일들의 갱신된 내역을 저장소에 반영하려면 `add`, `commit` 과정을 거쳐야 한다.

## 07. Git 가지치기
### Git Branch
Branch는 독립적으로 어떤 작업을 진행하는 가지를 의미한다. 각각의 Branch는 다른 Branch의 영향을 받지 않는다.
특히, `master` Branch에서 프로젝트의 메인 파일을 가지고 있는데, 개발 목적의 새로운 `develop` Branch를 생성하여 작업한 후 배포를 위해 다시 `master` Branch와 병합하여 배포한다. 또한, 새로운 문제가 발생할 때마다 해당 문제를 가지고 새로운 Branch를 생성해 개발을 진행할 수 있다.

### Git Branch 종류
- 메인 Branch: 배포할 수 있는 수준의 안정적인 Branch
- 토픽 Branch: 기능 추가, 버그 수정 등의 단위 작업을 위한 Branch

### Git Branch 생성
다음 명령어를 통해 Git Branch를 생성할 수 있다.
```
git branch branchName
```
`master` Branch는 Git 저장소를 생성할 때 기본적으로 생성되는 기본 Branch이다.

### Git Branch 전환
현재 존재하는 Branch를 확인하기 위해서는 다음 명령어를 활용해야 한다.
```
git branch
```
이후 다음 명령어로 Branch를 전환할 수 있다.
```
git checkout branchName
```
다만, `checkout` 명령어는 `git log` 명령어로 확인한 스냅샷의 16진수 Hash Number를 활용해 스냅샷을 전환할 때도 활용된다. 이를 통해 과거의 파일 내용을 확인할 수 있다.
```
git checkout snapshotHashCode
```
HEAD 포인터는 현재 위치를 의미한다.

### 🚩 퀴즈 01 | Git Branch
Git Branch란 독립적으로 어떤 작업을 진행하기 위한 개념이다.
각각의 Branch는 다른 Branch의 영향을 받지 않는다.
Branch 생성은 `git branch <branch 명>`으로 가능하다.
Branch 생성 후 전환은 `git checkout <branch 명>`으로 가능하다.

### fast forward
새로운 Branch에서 진행한 작업을 커밋하면, 해당 체크포인트가 생성된다.

### Git merge
새로운 Branch에서 작업을 마친 후에 master Branch로 이동하여 새로운 Branch를 병합해야 한다.
```
git checkout master
git merge newBranch
```
결과적으로 `newBranch`의 작업 내용이 `master` Branch로 병합되고, 새로운 체크포인트(`C3`)가 생성된다. 그러면 사실상 두 Branch가 동일해진다. 이때 `newBranch`의 작업 내용이 `master` Branch의 내용에 단순히 추가되는 업데이트 사항이라면 곧바로 병합되는데, 이를 fast forward라고 한다. 이와 달리, 같은 파일의 내용이 다르게 수정되는 경우(독립적으로 운용되기 때문에 같은 파일의 내용이 수정될 수 있다.)에는 문제가 생길 수 있다.

이때는 우선 갈라지는 Branch를 확인하기 위해 다음 명령어를 활용해야 한다.
```
git log --graph --all
```
이후 `master` Branch로 이동하여 새로운 `newBranch`를 병합하면 새로운 체크포인트(`C5`)가 생성된다. 이때, 유의할 점은 fast-forward와 달리 동시에 각 Branch에서 작업이 진행되므로, 체크포인트가 두 개(`C3`, `C4`)가 생성되고, 이후 병합한 이후에는 `newBranch`는 수정한 체크포인트 `C3`에 머물러있는 반면, 병합한 `master` Branch는 병합된 체크포인트 `C5`에 존재하여 두 내용이 다르게 된다.

병합된 Branch는 다음 명령어로 확인할 수 있다.
```
git branch --merged
```
또한, 일반적으로 사용을 마친 Branch는 다음 명령어를 통해 삭제한다.
```
git branch -d branchName
```

### Git Merge Conflict 해결
병합한 두 Branch에서 같은 파일을 변경할 때 충돌이 발생한다. 이러한 경우 다음 명령어를 통해 충돌이 일어난 파일명을 확인할 수 있다.
```
git status
```
해당 파일의 문제가 되는 부분을 확인하면 `<<<<<<<`,`=======`,`>>>>>>>`등의 기호를 확인할 수 있는데, 내용의 충돌을 수정하고 이 부분을 지워주어야 한다. 이후 다시 `git add`와 `git commit` 과정을 거쳐 새롭게 병합해주어야 한다.

## 08. Git 원격 저장소
### 원격 저장소
인터넷이나 네트워크 상에 있는 저장소

### Git 원격 저장소 받아오기
기존 git 저장소를 복사하는 명령어를 활용해 원격 저장소를 불러올 수 있다. 이때 원격 저장소에서 `clone` 버튼을 통해 `Clone with HTTPS` 옵션으로 주소를 복사해 추가해주어야 한다.
```
git clone 원격 저장소 주소
```
이후 다음 명령어로 연결할 수 있다.
```
git remote add origin 원격 저장소 주소
```
또한, 다음 명령어를 통해 연결된 원격 저장소를 확인할 수 있다.
```
git remote
```
추가적으로 원격 저장소를 어떤 원격 저장소가 있는지 살펴볼 수 있고, 원격 저장소의 이름을 변경할수도 원격 저장소를 삭제할수도 있다.
```
git remote show origin
git remote rename origin newName
git remote rm newName
```
git clone명령어를 실행하면 현재 폴더 내에 새로운 폴더를 하나 더 생성합니다.

예를 들면 현재 위치해 있는 폴더가 myproject라고 한다면 git clone으로 생성된 폴더는 myproject/"위대하고 멋있는 모자팔기 앱의 저장소"로 생성됩니다.
따라서 myproject폴더는 저장소가 아닌 상태이죠.

만약 myproject폴더를 저장소로 쓰고 싶다면 git clone명령의 마지막에 . 을 찍어주면 됩니다.

복사한 주소를 터미널에 붙여넣기 위해서는 Shift + Ctrl + v 단축키를 사용할 수 있습니다.

### Git 원격 저장소 동기화
원격 저장소에서 데이터를 가져와 로컬 데이터와 병합하기 위해 다음 명령어를 활용한다.
```
git pull
```
이와 달리 다음 명령어를 통해 원격 저장소 데이터를 가져오면, 이후에 추가적인 작업이 필요하다.
```
git fetch
git log
git merge origin/master
```
즉, 데이터를 가져오기만 하기 때문에 추가적으로 변경된 파일을 확인한 후 병합해주어야 한다.


pull은 로컬 저장소에 있는 master를 자동으로 원격저장소에 있는 내용과 합쳐주는 역할을 수행합니다.

git pull이 이루어지지 않는 경우는 보통 다른사람이 올린 commit의 내용과 내 컴퓨터에 존재하는 내용이 서로 충돌할 때입니다.

이러한 현상은 하나의 브랜치에서 여러 사람이 동시에 작업하면 발생할 확률이 높아지게 됩니다.

따라서 여러 개의 브랜치를 나누고 각자 브랜치에서 작업한 후에 웹호스팅 서비스에 존재하는 merge request로 하나씩 합쳐가는 방식을 사용하면 충돌이 일어나는 것을 막을 수 있고 매번 새롭게 merge해야하는 수고를 덜 수가 있습니다.

### Git 원격 저장소 발행
로컬 저장소에서 작업한 내용을 원격 저장소에 반영하기 위해서는 다음 명령어를 활용해야 한다. 다만, 다른 사람이 먼저 `push`한 상태에서는 `push`할 수 없기 때문에 다른 개발자가 작업한 것을 병합부터 해야한다.
```
git push origin master
```

### `origin`
```
git remote add origin 원격 저장소 주소
```
위 명령어는 원격 저장소의 단축 이름을 `origin`으로 설정하는 것이다. 다른 이름으로 지정할 수도 있다. 다만, 기본적으로 만들어진 원격 저장소 이름은 `origin`이 기본값이기 때문에 복사한 저장소도 `origin`으로 통일된다. 이때 `-v` 옵션을 통해 지정한 저장소의 이름과 주소를 함께 볼 수 있다.
```
git remote -v
```

### 미션
```
git fetch origin master
git merge origin/master

git pull origin master
```
```
# Git 명령을 채점하기 위한 편집창입니다.
# 문제를 풀기 위해 필요한 명령을 아래에 입력하세요.
# 여러 개의 명령은 한 줄에 하나씩 입력하면 됩니다.

# 아래 공간에 push를 완료하기 위한 명령어를 입력해 주세요. 
git pull origin master

# 아래의 명령어는 app.py의 내용을 적용하기 위한 코드입니다. 수정하지 말아주세요.
\cp -f modified.py app.py
# push를 완료하기 위한 commit 명령어를 아래에 적어주세요 
git add app.py
git commit -m "add app.py"

# merge를 해결할 때 app.py를 고치고 myproject에 commit을 완료한 후 push해 주시면 됩니다.
git push origin master
```