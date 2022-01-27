//  Grab the data from the API
const getErgastAPI = async function (series, season) {
    let response = await fetch(`https://ergast.com/api/f1/${series}/${season}/driverStandings.json`);
    let data = await response.json();
    return await data;
}

//  Parse constructor names with '_' and capitalizes the constructors' names
function parseConstructor(constructor) {
    let parseString = constructor.charAt(0).toUpperCase() + constructor.slice(1);
    if(parseString.includes('_')) {
        idx = parseString.indexOf('_');
        parseString = parseString.replace('_', ' ');
        parseString = parseString.substring(0, idx) + ' ' +parseString.charAt(idx+1).toUpperCase() + parseString.slice(idx+2);
    } 
    return parseString;
}

//  Input: Column value, new table row
//  Description: Creates a new column value with the parameters and inputs into the table
function addToTable(tableColumn, new_row) {
    let statsTable = document.getElementById('standings');
    new_col = document.createElement('td');
    new_col.innerText = tableColumn;
    new_row.append(new_col);
    statsTable.appendChild(new_row);
}

//  Input: JSON Data File from ErgastAPI (F1 API)
//  Description: Grabs column values from the JSON file and passes it to the addToTable function
function formatTable(standings) {
    let address = standings.MRData.StandingsTable.StandingsLists[0].DriverStandings
    
    address.forEach(e => {
        new_row = document.createElement('tr'); 
        addToTable(e.position, new_row);
        addToTable(e.Driver.givenName + ' ' + e.Driver.familyName, new_row);
        addToTable(parseConstructor(e.Constructors[0].constructorId), new_row);
        addToTable(e.points, new_row);
        addToTable(e.wins, new_row);
    });
}

// When the form is submitted, form information is grabbed and used to parse the API link for the JSON data file
const f1Form = document.getElementById('f1Table');
f1Form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let f1Series = e.target.series.value;
    let f1Season = e.target.season.value;
    let standings = await getErgastAPI(f1Series, f1Season);
    formatTable(standings);
});
