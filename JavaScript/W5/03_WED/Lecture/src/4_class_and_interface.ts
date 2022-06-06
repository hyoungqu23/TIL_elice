/**
 * class & interface
 */
class Animal {
  id: number;
  name: string;
  private secret: string;   // 클래스 내부에서만 활용하게끔 외부 접근 배제

  constructor(name: string) {
    this.id = Date.now();
    this.name = name;
    this.secret = "this is secret";
  }

  public getName() {      // public은 생략 가능
    this.logSecret();
    return this.name;
  }

  private logSecret() {
    console.log(`${this.secret}`);
  }
}

interface Machine {
  type: string;
  name: string;
  run: () => void;
  getType: () => string;
}