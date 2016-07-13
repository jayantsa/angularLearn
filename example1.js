

var columnDefs = [
    {
        headerName: "Athlete Details",
        children: [
            {headerName: "Athlete", field: "athlete", width: 150, filter: 'text'},
            {headerName: "Age", field: "age", width: 90, filter: 'number'},
            {headerName: "Country", field: "country", width: 120}
        ]
    },
    {
        headerName: "Sports Results",
        children: [
            {headerName: "Sport", field: "sport", width: 110},
            {headerName: "Total", columnGroupShow: 'closed', field: "total", width: 100, filter: 'number'},
            {headerName: "Gold", columnGroupShow: 'open', field: "gold", width: 100, filter: 'number'},
            {headerName: "Silver", columnGroupShow: 'open', field: "silver", width: 100, filter: 'number'},
            {headerName: "Bronze", columnGroupShow: 'open', field: "bronze", width: 100, filter: 'number'}
        ]
    }
];
var rowData = [
        {athlete:"jfkfj",age:5,country:"india",sport: "Toyota", total: "Celica", gold: 35000,silver: 5622,bronze:445656},
        {athlete:"jfkfj",age:5,country:"uk",sport: "Toyota", total: "Celica", gold: 35000,silver: 5622,bronze:445656},
        {athlete:"jfkfj",age:5,country:"usa",sport: "Toyota", total: "Celica", gold: 35000,silver: 5622,bronze:445656}
    ];

/*var columnDefs = [
        {headerName: "Make", field: "make"},
        {headerName: "Model", field: "model"},
        {headerName: "Price", field: "price"}
    ];

    var rowData = [
        {make: "Toyota", model: "Celica", price: 35000},
        {make: "Ford", model: "Mondeo", price: 32000},
        {make: "Porsche", model: "Boxter", price: 72000}
    ];
*/
    


gridOptions = {
    columnDefs: columnDefs,
    rowData: rowData,
    enableFilter: true,
    enableSorting: true,
    showToolPanel: true,
    rowSelection: 'multiple',
    onSelectionChanged: onSelectionChanged,
    enableFilter:true
};
function onSelectionChanged() {
    var selectedRows = gridOptions.api.getSelectedRows();
    console.log(selectedRows);
    var selectedRowsString = '';
    selectedRows.forEach( function(selectedRow, index) {
        if (index!=0) {
            selectedRowsString += ', ';

        }
        selectedRowsString += selectedRow.athlete;
    });
    
}
document.addEventListener('DOMContentLoaded', function() {
    var gridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(gridDiv, gridOptions);});

function getBooleanValue(cssSelector) {
    return document.querySelector(cssSelector).checked === true;
}

function onFilterChanged(value) {
    gridOptions.api.setQuickFilter(value);
}
onBtExport=function() {
    console.log("hello");
    var params = {
        skipHeader: getBooleanValue('#skipHeader'),
        skipFooters: getBooleanValue('#skipFooters'),
        skipGroups: getBooleanValue('#skipGroups'),
        allColumns: getBooleanValue('#allColumns'),
        onlySelected: 1,
        fileName: document.querySelector('#fileName').value,
        columnSeparator: document.querySelector('#columnSeparator').value
    };

    if (getBooleanValue('#useCellCallback')) {
        params.processCellCallback = function(params) {
            if (params.value && params.value.toUpperCase) {
                return params.value.toUpperCase();
            } else {
                return params.value;
            }
        };
    }

    if (getBooleanValue('#customHeader')) {
        params.customHeader = '[[[ This ia s sample custom header - so meta data maybe?? ]]]\n';
    }
    if (getBooleanValue('#customFooter')) {
        params.customFooter = '[[[ This ia s sample custom footer - maybe a summary line here?? ]]]\n';
    }

    gridOptions.api.exportDataAsCsv(params);
}


// setup the grid after the page has finished loading


    // do http request to get our sample data - not using any framework to keep the example self contained.
    // you will probably use a framework like JQuery, Angular or something else to do your HTTP calls.
   /* var httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', 'http://ag-grid.com/olympicWinners.json');
    httpRequest.send();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            var httpResult = JSON.parse(httpRequest.responseText);
            gridOptions.api.setRowData(httpResult);
        }
    };*/
    /*$http({
        method : "GET",
        url : 'https://ag-grid.com/olympicWinners.json'
    }).then(function mySucces(response) {
        $scope.myWelcome = response.data;
        gridOptions.api.setRowData(response.data);

    }, function myError(response) {
        $scope.myWelcome = response.statusText;
    });*/
