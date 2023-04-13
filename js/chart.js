'use strict'

const matricula = localStorage.getItem('id') 

console.log(matricula)

const getBoletim = (matricula) => {

  const fetchData = async () => {
  
    const url = `https://segredo.onrender.com/v1/lion-school/alunos/${matricula}`
    const response = await fetch(url);
    const data = await response.json();
    const dadosDisciplinas = data.student[0].course[0].disciplinas
  
    return dadosDisciplinas;
  };

  const fetchDataAluno = async () => {
  
    const url = `https://segredo.onrender.com/v1/lion-school/alunos/${matricula}`
    const response = await fetch(url);
    const data = await response.json();
    const dadosALuno = data.student[0]
  
    return dadosALuno;
  };
  
  fetchDataAluno()
  const ctx = document.getElementById('myChart');
  
  const updateChart = async () => {
  
  
    const data = await fetchData()
  
    const disciplineName = data.map((index) => {
        const nome = index.nome

        const words = nome.slice(0,3)
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
                borderRadius: 10,
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
    alunoName.textContent = data.nome
  
    alunoProfile.append(alunoFoto,alunoName)
    container.replaceChildren(alunoProfile , ctx)
  }
  
  infoAluno();
  updateChart();
}

getBoletim(matricula);