'use strict';

const criarButtonCurso = cursos => {

  const button = document.createElement('a')
  button.classList.add('buttonCurso')
  button.id = cursos.sigla
  button.href = './turma.html'
  button.target = '_parent'

  const icone = document.createElement('img')
  icone.src = cursos.icone
  icone.alt = cursos.nome

  const name = document.createElement('span')
  name.classList.add('button_name')
  name.textContent = cursos.sigla

  const title = document.createElement('span')
  title.classList.add('title_curso')
  title.textContent = cursos.nome

  const link = document.createElement('href')
  link.accessKey = ('turma.html')

  button.append(icone, name, link)

  button.addEventListener('click', function () {

    localStorage.setItem('id', button.id)
    localStorage.setItem('title', cursos.nome)

  })

  return button
}

const carregarCursos = async () => {

  const url = `https://segredo.onrender.com/v1/lion-school/cursos`;

  const response = await fetch(url);
  const data = await response.json();
  const cursos = await data.course

  const container = document.getElementById('courses')
  const cardButton = cursos.map(criarButtonCurso)

  container.replaceChildren(...cardButton)

}

carregarCursos();

const title = () => {
  const title_curso = localStorage.getItem('title')

  const teste = title_curso

  const words = teste.slice(6)
  
  const title = document.createElement('h1')
  title.classList.add('title_curso')
  title.textContent = words

  return title
}


const cardAluno = alunos => {

  const card = document.createElement('a')

  if (alunos.status == 'Finalizado') {
    card.classList.add('cardAluno_finalizado')
  } else {
    card.classList.add('cardAluno_cursando')
  }

  card.classList.add('card_aluno')
  card.href = './aluno.html'
  card.target = '_parent'

  const img = document.createElement('img')
  img.src = alunos.photo

  const name = document.createElement('span')
  name.textContent = alunos.name.toUpperCase()

  card.append(img, name)

  card.id = alunos.registration

  card.addEventListener('click', function () {

    localStorage.setItem('registration', card.id)

  })

  return card

}

const carregarCardAluno = async () => {

  const curso = localStorage.getItem('id')
  
  const url = `https://segredo.onrender.com/v1/lion-school/alunos/por/${curso}`

  const response = await fetch(url);
  const data = await response.json();
  const alunos = await data.Student

  const container = document.getElementById('alunos')
  const turma = document.getElementById('turma')

  const card_aluno = alunos.map(cardAluno)

  container.append(...card_aluno)

  turma.replaceChildren(title(),container)

}

carregarCardAluno();

const fetchData = async () => {

  const matricula = localStorage.getItem('registration')

  const url = `https://segredo.onrender.com/v1/lion-school/alunos/${matricula}`
  const response = await fetch(url);
  const data = await response.json();
  const dadosDisciplinas = data.student[0].course[0].disciplinas

  return dadosDisciplinas;

};

const fetchDataAluno = async () => {

  const matricula = localStorage.getItem('registration')

  const url = `https://segredo.onrender.com/v1/lion-school/alunos/${matricula}`
  const response = await fetch(url);
  const data = await response.json();
  const dadosALuno = data.student[0]

  return dadosALuno;
};

const ctx = document.getElementById('myChart');

const updateChart = async () => {


  const data = await fetchData()

  const disciplineName = data.map((index) => {
    const nome = index.nome

    const words = nome.slice(0, 3)
    return words
  })

  const disciplineAverage = data.map((index) => {
    return index.media
  })

  let arrayColors = [];

  disciplineAverage.forEach((mediaMateria) => {
    if (mediaMateria >= 0 && mediaMateria < 50) {
      arrayColors.push("rgba(193,16,16,1)");
    } else if (mediaMateria >= 50 && mediaMateria < 80) {
      arrayColors.push("rgba(229,182,87,1)");
    } else if (mediaMateria >= 80 && mediaMateria < 100) {
      arrayColors.push("rgba(51,71,176,1)");
    }
  });

  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: disciplineName,
      datasets: [{
        label: 'Media de Notas',
        data: disciplineAverage,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: arrayColors,
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

}

const infoAluno = async () => {

  const data = await fetchDataAluno()

  const container = document.getElementById('boletim_aluno')

  const alunoProfile = document.getElementById('aluno_profile')
  alunoProfile.classList.add("aluno_profile")

  const alunoFoto = document.createElement('img')
  alunoFoto.src = data.photo

  const alunoName = document.createElement('span')
  alunoName.textContent = data.nome.toUpperCase()

  alunoProfile.append(alunoFoto, alunoName)
  container.replaceChildren(alunoProfile, ctx)
}

infoAluno();
updateChart();


// getBoletim(matricula);




