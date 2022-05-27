let data = [
  // { id: 0, name: "Axel", isVictim: false, isShown: true },
  // { id: 1, name: "Denis", isVictim: false, isShown: true },
  // { id: 2, name: "Anastasiia", isVictim: false, isShown: true },
  // { id: 3, name: "Elena", isVictim: false, isShown: true },
  // { id: 4, name: "Dustin", isVictim: false, isShown: true },
  // { id: 5, name: "Fritz", isVictim: false, isShown: true },
  // { id: 6, name: "Irina", isVictim: false, isShown: true },
  // { id: 7, name: "Jerome", isVictim: false, isShown: true },
  // { id: 8, name: "Lena", isVictim: false, isShown: true },
  // { id: 9, name: "Olga", isVictim: false, isShown: true },
  // { id: 10, name: "Ronny", isVictim: false, isShown: true },
  // { id: 11, name: "Sergei", isVictim: false, isShown: true },
  // { id: 12, name: "Valeria", isVictim: false, isShown: true },
  // { id: 13, name: "Viktoriia", isVictim: false, isShown: true },
];

let counter = 0;
let previousVictimId = -1;
let useEnter = false;
let sameNameNumber = 1;

const ENTER_ON = 'Enter (on)';
const ENTER_OFF = 'Enter (off)';
const HINT = `
${"The list is empty."}<br>
${"Please add items using the form below."}<br>
${'The items should be separated by " " (spaсe) and/or ";" (semicolon)'}`;

const addOne = document.getElementById("addMany");
addOne.addEventListener("click", () => {
  addUsers();
});

function addUsers() {
  let input = document.getElementById("addManyInput").innerText.trim();
  addStringToData(input);
  document.getElementById("addManyInput").innerText = "";
  showUsers();
}

function checkIfListIsEmpty() {
  if (!data.length) {
    document.getElementById("hint").innerHTML = HINT;
  } else {
    document.getElementById("hint").innerHTML = "";
  }
}

function addStringToData(input) {
  const array = input.replace(/, /g, "_").replace(/\s/g, ";").split(";");
  array.forEach((element) => {
    if (element.length > 0) {
      const id = data.length;
      let newUserName =
        element.charAt(0).toUpperCase() + element.slice(1).toLowerCase();
        const strArr = newUserName.split("");
        const i = strArr.indexOf('_');
        if (i != -1) {
          strArr[i + 1] = strArr[i + 1].toUpperCase();
        }
        newUserName = strArr.join('');
      data.forEach((el) => {
        el.name == newUserName ? sameNameNumber++ : "";
      });
      if (sameNameNumber > 1) {
        newUserName = newUserName + "_" + sameNameNumber;
      }
      data.push({
        id: id,
        name: newUserName,
        isVictim: false,
        isShown: true,
      });
    }
  });
}

function reassigneIds() {
  for (let i = 0; i < data.length; i++) {
    const user = data[i];
    user.id = i;
  }
}

function markAsNoVictimsAndShown() {
  for (let i = 0; i < data.length; i++) {
    const user = data[i];
    user.isVictim = false;
    user.isShown = true;
  }
}

function useEnterToggle() {
  useEnter = !useEnter;
  const useEnterToggleBtn = document.getElementById("useEnterToggle");
  const input = document.getElementById("addManyInput");
  enterOnOffTextToggle(useEnterToggleBtn);
  useEnterToggleBtn.addEventListener("click", () => {
    useEnter = !useEnter;
    if (useEnter) {
      input.addEventListener("keyup", addEventListenerToInput);
      useEnterToggleBtn.innerText = ENTER_ON;
      console.log('use enter = true');
    } else {
      input.removeEventListener("keyup", addEventListenerToInput);
      useEnterToggleBtn.innerText = ENTER_OFF;
      console.log('use enter = false');
    }
  });
}

function addEventListenerToInput(event) {
  if (event.key == "Enter") {
    addUsers();
  }
}

function enterOnOffTextToggle(useEnterToggleBtn) {
  console.log('here')
  useEnterToggleBtn.innerText = useEnter === true ?  ENTER_ON : ENTER_OFF;
}

function chooseVictim() {
  if (counter === data.length - 1) {
    document.getElementById("button").innerHTML = "Refresh";
  }
  if (counter === data.length) {
    counter = 0;
    previousVictimId = -1;
    const div = document.getElementById("victimsList");
    const btn = document.getElementById("button");
    markAsNoVictimsAndShown();
    div.innerHTML = "";
    btn.innerHTML = "Press to choose a victim!";
    showUsers();
    return;
  }
  const user = findRandomUser();
  if (user.isVictim && counter < data.length) {
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
  // showDate();
  checkIfListIsEmpty();
  // useEnterToggle();

  const div = document.getElementById("victimsList");
  div.innerHTML = "";
  const ul = document.createElement("ul");
  for (const id in data) {
    if (id) {
      const user = findUserInListById(id);
      if (user) {
        const li = document.createElement("li");
        li.addEventListener("click", () => {
          deleteUser(user);
        });
        li.innerHTML = user.name;
        li.setAttribute("id", id);
        // li.innerHTML = "<button class='deleteBtn'>X</button> &nbsp;" + user.name;
        li.innerHTML = user.name;
        ul.append(li);
      }
    }
  }
  div.append(ul);
}

// function showDate() {
//   const today = new Date();
//   const d = `${today.getFullYear()} / ${
//     today.getMonth() + 1
//   } / ${today.getDate()}`;
//   document.getElementById("date").innerHTML = d;
// }

function showCounter() {
  const ourCounter = document.getElementById("counter");
  const dataLength = data.length;
  let result = `${counter}/${dataLength}`;
  ourCounter.innerHTML = result;
}

function deleteUser(user) {
  data = data.filter((u) => u.id != user.id);
  counter = 0;
  previousVictimId = -1;
  markAsNoVictimsAndShown();
  reassigneIds();
  showUsers();
}

showUsers();
