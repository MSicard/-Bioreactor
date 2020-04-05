$(document).ready(function () {
    data = [
        [
            1233213,
            "China",
            'Mayo 2020'
        ],
        [
            234343,
            "Mariscos",
            'Abril 2020'
        ]
    ]
    $('#restaurant_table').DataTable({
        data: data,
        language: {
            search: "Buscar: "
        },
        dom: 'rtip',
        columnDefs: [
            { type: 'RFID', targets: 0},
            {type: 'Name', targets:0 }
        ],
        ordering: true
    });
});