const jsonData = () => {
    let data = {
       0: {
               'id': 0,
               'name': 'Andhra pradesh',
               'capital': 'Amaravati',
               'formedon': 2012,
               'show': true
             },
       1: {
               'id': 1,
               'name': 'Tamilnadu',
               'capital': 'Chennai',
               'formedon': 1880,
               'show': true
             },
       2: {
               'id': 2,
               'name': 'Karnataka',
               'capital': 'Bangalore',
               'formedon': 1920,
               'show': true
             },
       3: {
               'id': 3,
               'name': 'Delhi',
               'capital': 'Delhi',
               'formedon': 1950,
               'show': true
             },
    };

     return data;
};

export default JSON.stringify(jsonData());
