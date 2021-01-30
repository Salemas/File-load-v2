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
    "Prekės aprašymas",
    "Gavėjo pavadinimas",
    "LT -Standartinė Pateikimo trukmė -  (kal. dien.)",
    "Pristatymo būklė",
    "Kaina",
    "Valiuta",
    "už",
    "Mato vnt.",
    "Dok. valiuta",
    "Kiekis sandėlyje",
    "Kritinės prekės žyma",
    "Min. užsakymo kiekis - MOQ",
    "Min. pristatymo  kiekis - MDQ",
    "Kliento darbuotojas",
    "Elgerta Darbuotojas",
    "Galutinio kliento kodas",
    "Galutinis klientas",
    "Gavėjo kodas"
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
        tColumn.classList.add("px-4");
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
            columnT2.colSpan = "15";
            
            const card = buildCards();
            const filledCards = fillCards(card,element);
            
            columnT2.appendChild(filledCards); // into main table row inserting nested table
            columnT2.classList.add("secondData");
            
            
            for(const value of primValues) { 
                const bColumn = bRow.insertCell(); //creating cell for prim data
                
                bColumn.innerHTML = element[value];    //inserting value in cell
            }
         
    });
}

function buildCards(){

    const container = document.createElement('table');
    // container.classList.add("columns");

        for (i=0; i<5;i++) {
            const cardRow = container.insertRow();

            for(j=0; j<6; j++) {
                const cardCol = cardRow.insertCell();
                // cardCol.classList.add("mx-auto");
            }
        }
    return container;
}

function fillCards (cards, element){

    cards.rows[0].cells[0].innerHTML = secValue[0];
    cards.rows[0].cells[1].innerHTML = element[secValue[0]];
    cards.rows[0].cells[2].innerHTML = secValue[1];
    cards.rows[0].cells[3].innerHTML = element[secValue[1]];
    cards.rows[0].cells[4].innerHTML = secValue[2];
    cards.rows[0].cells[5].innerHTML = element[secValue[2]];

    cards.rows[1].cells[0].innerHTML = secValue[4];
    cards.rows[1].cells[1].innerHTML = `${element[secValue[4]]} ${element[secValue[5]]} / ${element[secValue[6]]} ${element[secValue[7]]}` ;
    cards.rows[1].cells[2].innerHTML = secValue[17];
    cards.rows[1].cells[3].innerHTML = element[secValue[17]];
    cards.rows[1].cells[4].innerHTML = secValue[10];
    cards.rows[1].cells[5].innerHTML = element[secValue[10]];

    cards.rows[2].cells[0].innerHTML = secValue[11];
    cards.rows[2].cells[1].innerHTML = `${element[secValue[11]]} ${element[secValue[7]]}` ;
    cards.rows[2].cells[2].innerHTML = secValue[16];
    cards.rows[2].cells[3].innerHTML = element[secValue[16]];
    cards.rows[2].cells[4].innerHTML = secValue[14];
    cards.rows[2].cells[5].innerHTML = element[secValue[14]];

    cards.rows[3].cells[0].innerHTML = secValue[12];
    cards.rows[3].cells[1].innerHTML = `${element[secValue[12]]} ${element[secValue[7]]}` ;
    cards.rows[3].cells[2].innerHTML = secValue[15];
    cards.rows[3].cells[3].innerHTML = element[secValue[15]];

    cards.rows[3].cells[0].innerHTML = secValue[9];
    cards.rows[3].cells[1].innerHTML = `${element[secValue[9]]} ${element[secValue[7]]}` ;
    cards.rows[3].cells[2].innerHTML = secValue[13];
    cards.rows[3].cells[3].innerHTML = element[secValue[13]];

    return cards;
}