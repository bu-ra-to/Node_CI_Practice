console.clear();
class Lang {
  english() {
    console.log("I'm Britain");
  }
  german() {
    console.log("I'm German");
  }
}

class moreLang {
  russian() {
    console.log("I'm Russian");
  }
  french() {
    console.log("I'm Canadian");
  }
}
const nativ = new Lang();
nativ.german();

const speak = new moreLang();
const result = new Proxy(speak, {
  get(target, property) {
    return nativ[property] || speak[property];
  }
});

result.english();
result.russian();
