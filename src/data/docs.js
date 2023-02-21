export const data = [
    {
        id: '2',
        name: 'Cerere de Concediu',
        inputs: [
            { name: 'name', placeholder: 'Nume/Prenume', type: 'text' },
            { name: 'company', placeholder: 'Compania', type: 'text' },
            { name: 'function', placeholder: 'Funcția', type: 'text' },
            { name: 'department', placeholder: 'Departamentul', type: 'text' },
            { name: 'data', placeholder: 'Începutul Concediului', type: 'date', isSingle: true },
            { name: 'period', placeholder: 'Durata Concediului(Zile)', type: 'number' },
            { name: 'month', placeholder: 'Luna', type: 'text' },
        ],
        slug: 'concediu',
    },
    {
        id: '3',
        name: 'Cerere de Angajare',
        inputs: [
            { name: 'name', placeholder: 'Nume/Prenume', type: 'text' },
            { name: 'city', placeholder: 'Domiciliu', type: 'text' },
            { name: 'street', placeholder: 'Strada', type: 'text' },
            { name: 'apartment', placeholder: 'Nr Apartament', type: 'number' },
            { name: 'phone', placeholder: 'Număr Telefon', type: 'tel' },
            { name: 'function', placeholder: 'Funcția', type: 'text' },
            { name: 'section', placeholder: 'Secția', type: 'text' },
            { name: 'data', placeholder: 'Data Cererii / Data Angajării', type: 'date' },
        ],
        slug: 'angajare',
    },
    {
        id: '4',
        name: 'Cerere de Demisie',
        inputs: [
            { name: 'name', placeholder: 'Nume/Prenume', type: 'text' },
            { name: 'company', placeholder: 'Denumirea companiei', type: 'text' },
            { name: 'position', placeholder: 'Funcția', type: 'text' },
            {
                name: 'date',
                placeholder: 'Data Cererii / Data Demisiei',
                type: 'date',
                isSingle: false,
            },
            { name: 'gap', placeholder: 'Zilele până la demisie', type: 'number' },
        ],
        slug: 'demisie',
    },
];
