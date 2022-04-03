let data = [
  { id: 0, name: "Axel", isVictim: false, isShown: true },
  { id: 1, name: "Denis", isVictim: false, isShown: true },
  { id: 2, name: "Anastasiia", isVictim: false, isShown: true },
  { id: 3, name: "Elena", isVictim: false, isShown: true },
  { id: 4, name: "Dustin", isVictim: false, isShown: true },
  { id: 5, name: "Fritz", isVictim: false, isShown: true },
  { id: 6, name: "Irina", isVictim: false, isShown: true },
  { id: 7, name: "Jerome", isVictim: false, isShown: true },
  { id: 8, name: "Lena", isVictim: false, isShown: true },
  { id: 9, name: "Olga", isVictim: false, isShown: true },
  { id: 10, name: "Ronny", isVictim: false, isShown: true },
  { id: 11, name: "Sergei", isVictim: false, isShown: true },
  { id: 12, name: "Valeria", isVictim: false, isShown: true },
  { id: 13, name: "Viktoriia", isVictim: false, isShown: true },
];

let counter = 0;
let previousVictimId = -1;

function chooseVictim() {
  if (counter === data.length - 1) {
    document.getElementById("button").innerHTML = "Refresh";
  }
  if (counter === data.length) {
    counter = 0;
    location.reload();
    return;
  }
  const user = findRandomUser();
  if ((user.isVictim && counter < data.length) || user.isShown === false) {
    chooseVictim();
    return;
  }
  user.isVictim = true;
  counter++;
  showCounter();

  if (previousVictimId != -1) {
    prevVictimElem = document.getElementById(previousVictimId);
    prevVictimElem.classList.add("victim");
  }

  const victimElem = document.getElementById(user.id);
  victimElem.classList.add("newVictim");
  victimElem.innerHTML = victimElem.innerHTML + " (" + counter + ")";
  previousVictimId = user.id;

  console.log(`Victim's name is ${user.name} (id ${user.id})`);
}

function findRandomUser() {
  const id = getRandom();
  return findUserInListById(id);
}

function getRandom() {
  const max = data.length;
  return Math.floor(Math.random() * max);
}

function findUserInListById(id) {
  return data.find((item) => item.id == id);
}

function showUsers() {
  showCounter();

  if (counter === data.length) {
    location.reload();
    return;
  }
  const div = document.getElementById("victimsList");
  div.innerHTML = "";
  const ul = document.createElement("ul");
  for (const id in data) {
    if (id) {
      const user = findUserInListById(id);
      if (user && user.isShown) {
        const li = document.createElement("li");
        // li.addEventListener("click", () => {
        //   deleteUser(user);
        // });
        li.innerHTML = user.name;
        li.setAttribute("id", id);
        // li.innerHTML = "<button>х</button> &nbsp;" + user.name;
        li.innerHTML = user.name;
        ul.append(li);
      }
    }
  }
  div.append(ul);
}

function showCounter() {
  const ourCounter = document.getElementById("counter");
  const dataLength = data.length;
  let result = `${counter}/${dataLength}`;
  ourCounter.innerHTML = result;
  console.log(counter);
}

function deleteUser(user) {
  user.isShown = false;
  counter++;
  if (counter === data.length) {
    document.getElementById("button").innerHTML = "Refresh";
  }
  showUsers();
}

showUsers();
