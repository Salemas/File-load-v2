const btnLoad = document.getElementById('btn1').addEventListener('click', loadFile);
const btnReset = document.getElementById('btn2').addEventListener('click', tableInit);

const primValues =[
    "Nr",
    "Dok. Data",
    "Kliento užsakymo data",
    " Dok. Nr.",
    "Kliento užsakymo numeris",
    "Eil.",
    "Elg. prekės kodas",
    "Kliento prekės kodas",
    "Gamintojo prekės kodas (MPN)",
    
    "Pristat. Eil.",
    "Užsakytas kiekis",
    "Patvirtintas kiekis",
    "Pristatytas kiekis",
    "Atviras kiekis",
    "Pirstatymo eilutės data "
];
const secValue = [
    "Pristatymo būklė",
    "Prekės aprašymas",
    "Kaina",
    "Valiuta",
    "už",
    "Mato vnt.",
    "Dok. valiuta",
    "Kiekis sandėlyje",
    "LT -Standartinė Pateikimo trukmė -  (kal. dien.)",
    "Kritinės prekės žyma",
    "Min. užsakymo kiekis - MOQ",
    "Min. pristatymo  kiekis - MDQ",
    "Kliento darbuotojas",
    "Elgerta Darbuotojas",
    "Galutinio kliento kodas",
    "Galutinis klientas",
    "Gavėjo kodas",
    "Gavėjo pavadinimas"
]

const table1 = document.getElementById('table1');
fillHead();

function tableInit(){
    table1.innerHTML = "";
    fillHead();
}

function loadFile (){

    const myRequest = new Request("Adax.json")
    
    fetch(myRequest)
        .then(response => response.json())
        .then(data => {
            tableInit();
            fillTable(data);
        })
        .catch((error => {
            console.error('CHACHA:', error);
        }))
}

function fillHead(){
    const tHead = table1.createTHead();
    const tRow = tHead.insertRow();

    for(const element of primValues) {
        const tColumn = document.createElement('th');
        tColumn.innerHTML = element;
        tRow.appendChild(tColumn);        
    }
}

function fillTable(data){

    const tBody = table1.createTBody();
    
    data.forEach(element => {
        
        
            const bRow = tBody.insertRow(); //main table row for primary data
            
            bRow.addEventListener('click', (ev)=>{
                // ev.target.classList.toggle('primData');
                ev.target.parentElement.nextElementSibling.classList.toggle('hideClass');
                ev.target.parentElement.classList.toggle('primData');
            })

            const rowT2 = tBody.insertRow(); //to main table insertin row for nested table
            rowT2.classList.add("hideClass");
            const columnT2 = rowT2.insertCell(); 
            columnT2.colSpan = "16";
            
            const card = buildCards(element);
            
            columnT2.appendChild(card); // into main table row inserting nested table
            columnT2.classList.add("secondData");
            
            
            for(const value of primValues) { 
                const bColumn = bRow.insertCell(); //creating cell for prim data
                
                bColumn.innerHTML = element[value];    //inserting value in cell
            }
         
    });
}

function buildCards(element){
    const container = document.createElement('div');
    container.classList.add("columns");

    container.innerHTML = `
    <div class="column">
        <div class="content">
            <span class="bold is-half">${secValue[1]}:</span>
            <span class="is-half">${element[secValue[1]]}</span>
        </div>
        <div class="content">
            <span class="bold">${secValue[2]}:</span>
            <span>${element[secValue[2]]} ${element[secValue[3]]} / ${element[secValue[4]]} ${element[secValue[5]]}</span>
        </div>  
        <div class="content">
            <span class="bold">${secValue[10]}:</span>
            <span>${element[secValue[10]]}</span>
        </div>  
        <div class="content">
            <span class="bold">${secValue[11]}:</span>
            <span>${element[secValue[11]]}</span>
        </div>  
        <div class="content">
            <span class="bold">${secValue[7]}:</span>
            <span>${element[secValue[7]]}</span>
        </div>  
    </div>
    <div class="column">
        <div class="content">
            <span class="bold">${secValue[17]}:</span>
            <span>${element[secValue[17]]}</span>
        </div>
        <div class="content">
            <span class="bold">${secValue[16]}:</span>
            <span>${element[secValue[16]]}</span>
        </div>  
        <div class="content">
            <span class="bold">${secValue[15]}:</span>
            <span>${element[secValue[15]]}</span>
        </div>  
        <div class="content">
            <span class="bold">${secValue[14]}:</span>
            <span>${element[secValue[14]]}</span>
        </div>  
        <div class="content">
            <span class="bold">${secValue[12]}:</span>
            <span>${element[secValue[12]]}</span>
        </div>  
    </div>
    <div class="column">
        <div class="content">
            <span class="bold">${secValue[8]}:</span>
            <span>${element[secValue[8]]}</span>
        </div>
        <div class="content">
            <span class="bold">${secValue[9]}:</span>
            <span>${element[secValue[9]]}</span>
        </div>
        <div class="content">
            <span class="bold">${secValue[13]}:</span>
            <span>${element[secValue[13]]}</span>
        </div>  
    </div>
    `



    return container;
}