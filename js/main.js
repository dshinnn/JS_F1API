//  Grab the data from the API
const getErgastAPI = async function (series, season) {
    let response = await fetch(`https://ergast.com/api/f1/${series}/${season}/driverStandings.json`);
    let data = await response.json();
    return await data;
}

function parseConstructor(constructor) {
    let parseString = constructor.charAt(0).toUpperCase() + constructor.slice(1);
    if(parseString.includes('_')) {
        idx = parseString.indexOf('_');
        parseString = parseString.replace('_', ' ');
        parseString = parseString.substring(0, idx) + ' ' +parseString.charAt(idx+1).toUpperCase() + parseString.slice(idx+2);
    } 
    return parseString;
}

function addToTable(tableColumn) {
    let statsTable = document.getElementById('standings');
    new_row = document.createElement('tr'); 
    new_col = document.createElement('td');
    new_col.innerText = tableColumn;
    new_row.append(new_col);
    statsTable.appendChild(new_row);
}

function formatTableInfo(standings) {
    let address = standings.MRData.StandingsTable.StandingsLists[0].DriverStandings
    
    address.forEach(e => {
        addToTable(e.position);
        addToTable(e.Driver.givenName + ' ' + e.Driver.familyName);
        addToTable(parseConstructor(e.Constructors[0].constructorId));
        addToTable(e.points);
        addToTable(e.wins);
    });
        

    // address.forEach(e => console.log(
    //     `Position: ${e.position}, Driver: ${e.Driver.givenName + ' ' + e.Driver.familyName}, Constructor: ${parseConstructor(e.Constructors[0].constructorId)}, Points: ${e.points}, Wins: ${e.wins}`
    // ))
}

// Grab information from the form
const f1Form = document.getElementById('f1Table');
f1Form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let f1Series = e.target.series.value;
    let f1Season = e.target.season.value;
    let standings = await getErgastAPI(f1Series, f1Season);
    formatTableInfo(standings);
    
})
console.log(f1Form);
