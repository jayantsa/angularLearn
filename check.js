agGrid.initialiseAgGridWithAngular1(angular);

var module = angular.module("example", ["agGrid"]);

module.controller("exampleCtrl", function($scope,$http) {

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
        {athlete:"jfkfj",age:5,country:"india",sport: "Toyota", total: "Celica", gold: 35000,silver: 5622,bronze:445656},
        {athlete:"jfkfj",age:5,country:"india",sport: "Toyota", total: "Celica", gold: 35000,silver: 5622,bronze:445656}
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
    


$scope.gridOptions = {
    columnDefs: columnDefs,
    rowData: rowData,
    enableFilter: true,
    enableSorting: true,
    showToolPanel: true,
    rowSelection: 'single',
    onSelectionChanged: onSelectionChanged,
    enableFilter:true

};



function getBooleanValue(cssSelector) {
    return document.querySelector(cssSelector).checked === true;
}





$scope.onBtExport=function() {
    console.log("hello");
    var params = {
        skipHeader: getBooleanValue('#skipHeader'),
        skipFooters: getBooleanValue('#skipFooters'),
        skipGroups: getBooleanValue('#skipGroups'),
        allColumns: getBooleanValue('#allColumns'),
        onlySelected: getBooleanValue('#onlySelected'),
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

    $scope.gridOptions.api.exportDataAsCsv(params);
}
$scope.exportAgGrid=function(){

  $(function () {
  var $ag=$('[ag-grid="' + "gridOptions" + '"]'), SEP = ',', QUOTE = '"', LINESEP='\n', rows = [];

  rows.push($ag.find('.ag-header-group-cell').map(function(){return QUOTE + $(this).text() + QUOTE + Array($(this).siblings().length).join(SEP);}).get().join(SEP));

  rows.push($ag.find('.ag-header-cell-grouped .ag-header-cell-text').map(function(){return QUOTE + $(this).text() + QUOTE;}).get().join(SEP));
  
  rows = rows.concat($ag.find('.ag-row').map(function(){return $(this).find('.ag-cell').map(function(){return QUOTE + $(this).text() + QUOTE;}).get().join(SEP);}).get());
  
  var a         = document.createElement('a');
  a.href        = 'data:attachment/csv,' + encodeURIComponent(rows.join(LINESEP));
  a.target      = '_blank';
  a.download    = 'data.csv';

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});
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
});