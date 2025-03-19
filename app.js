let friends = [];
let sorteados = [];
let currentIndex = 0;

function adicionarAmigo() {
  let input = document.getElementById("amigo").value;
  if (input === "" || input.length < 3) {
    alert("Por favor, insira um nome válido de 3 caracteres");
    clearInput();
    return;
  }

  friends.push(input);
  atualizarLista();
  clearInput();
}

function atualizarLista() {
  let displayList = document.getElementById("listaAmigos");
  displayList.innerHTML = "";

  for (let i = 0; i < friends.length; i++) {
    let text = document.createElement("li");
    text.textContent = friends[i];
    text.setAttribute("data-index", i);

    text.onclick = function () {
      removerAmigo(i);
    };

    displayList.appendChild(text);
  }
}

function removerAmigo(index) {
  friends.splice(index, 1);
  atualizarLista();
}

function sortearAmigo() {
  if (friends.length < 2) {
    alert("É necessário pelo menos dois participantes para o sorteio.");
    return;
  }

  let friendEmbaralhar = embaralharArray(friends); // Embaralha a lista para evitar padrões

  if (currentIndex < friends.length) {
    let sorteador = friends[currentIndex];
    let sorteado = friendEmbaralhar[currentIndex];

    showDraw(sorteador, sorteado);
    currentIndex++;

    if (currentIndex === friends.length) {
      setTimeout(enableResetButton, 3000); // Habilita o botão de reset após o sorteio
    }
  }
}

// Embaralha o array usando algoritmo de Fisher-Yates
function embaralharArray(array) {
  let copyFriends = [...array];
  let lenghtCopyFriends = copyFriends.length;

  for (let i = lenghtCopyFriends - 1; i > 0; i--) {
    //(i+1) é para ele percorrer do 0 ao utimo item do arry
    const j = Math.floor(Math.random() * i);
    [copyFriends[i], copyFriends[j]] = [copyFriends[j], copyFriends[i]];
  }

  console.log(copyFriends);

  return copyFriends;
}

function showDraw(sorteador, sorteado) {
  let drawn = document.getElementById("resultado");
  drawn.innerHTML = `🎉 ${sorteador} sorteou ${sorteado}! 🎉`;
  launchConfetti();
}

function launchConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { x: 0.5, y: 0.5 },
  });
}

function clearInput() {
  let inputField = document.getElementById("amigo");
  inputField.value = "";
}

function resetDraw() {
  friends = [];
  sorteados = [];
  currentIndex = 0;
  atualizarLista();
  document.getElementById("resultado").innerHTML = ""; // Limpa o resultado
  disableResetButton(); // Desabilita o botão de reset após o reset
}

function disableResetButton() {
  document.getElementById("resetButton").disabled = true;
}

function enableResetButton() {
  document.getElementById("resetButton").disabled = false;
}
