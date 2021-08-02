(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
        tableau.log("working");

        var cols = [{
            id: "block",
            alias: "Block Location",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "_primary_decsription",
            alias: "Offence",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "location",
            alias: "Location",
            dataType: tableau.dataTypeEnum.float
        // }, {
        //     id: "location",
        //     dataType: tableau.dataTypeEnum.geometry
        }];

        var tableSchema = {
            id: "crimeFeed",
            alias: "crime feed, location and offence",
            columns: cols
        };
    
        schemaCallback([tableSchema]);

    };

    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://data.cityofchicago.org/resource/x2n5-8w5q.json", function(resp) {
            
            var feat = resp,
                tableData = [];
    
            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "block": feat[i].block,
                    "_primary_decsription": feat[i]._primary_decsription,
                    "location": feat[i].location
                    // "location": feat[i].geometry
                });
            }
    
            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);
})();


$(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "Crime Data Feed";
        tableau.submit();
    });
});