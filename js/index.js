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

  const link = document.createElement('href')
  link.accessKey = ('turma.html')

  button.append(icone,name,link)


  button.addEventListener('click', function(){

   localStorage.setItem('id',button.id)

  })

  return button
}

const carregarCursos = async() => {

  const url = `https://segredo.onrender.com/v1/lion-school/cursos`;

  const response = await fetch(url);
  const data = await response.json();
  const cursos = await data.course

  const container = document.getElementById('courses')
  const cardButton = cursos.map(criarButtonCurso)

  container.replaceChildren(...cardButton)

}

carregarCursos();

const cardAluno = alunos => {

  const card = document.createElement('a')
  card.classList.add('card_aluno')
  card.id= alunos.registration
  card.href = './aluno.html'

  console.log(alunos.registration)

  const img = document.createElement('img')
  img.src = alunos.photo

  const name = document.createElement('span')
  name.textContent = alunos.name

  card.append(img,name)

  card.addEventListener('click', function(){

    localStorage.setItem('id',card.id)
 
   })

  return card

}

  const carregarCardAluno = async() => {

    const curso = localStorage.getItem('id')

    const url = `https://segredo.onrender.com/v1/lion-school/alunos/por/${curso}`

    const response = await fetch(url);
    const data = await response.json();
    const alunos = await data.Student

    const container = document.getElementById('alunos')

    const card_aluno = alunos.map(cardAluno)

    container.replaceChildren(...card_aluno)

  }

carregarCardAluno();






  