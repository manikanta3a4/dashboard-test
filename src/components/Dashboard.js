import { useState, useEffect, useRef, useContext } from 'react';
import "./dashboard.css";

const Dashboard = () => {

  const [states, setStates] = useState({});
  const search = useRef('');
  const [searched, setSearched] = useState([]);
  const [view, setView] = useState({});


  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('data'));
    setStates(data);
  }, []);

  const makeTable = () => {
    function makeData() {
      let table = Object.values(states).map((value, index) => {
        if(value.show === true){
          if(searched.length !== 0 && searched.includes(value.id)) {
             return listTable(value, index); 
          } 
          if(searched.length === 0){
             return listTable(value, index);
          }            
        } 
      });

      return table; 
    };

    return (<table>
              <tbody>
                <tr>
                 <th>Id</th>
                 <th className = "sort">State <button onClick = {() => handleSort(1)}>Sort</button></th>
                 <th>Capital</th>
                 <th className = "sort">Formed on <button onClick = {() => handleSort(2)}>Sort</button></th> 
                 <th>Operations</th> 
                </tr>
               {makeData()}
              </tbody>
            </table>
           );
  }

  const handleSort = (value) => {
    if(value === 1) {
       let objects = Object.values(states).sort(sortName);
       function sortName(a, b) { 
           const nameA = a.name.toUpperCase();
           const nameB = b.name.toUpperCase();
           let comparison = 0;
           if (nameA > nameB) {
              comparison = 1;
           } 
           else if (nameA < nameB) {
             comparison = -1;
           }
           return comparison;            
       };
       let data = Object.assign({}, objects);
       setStates(data);
    }
    if(value === 2) {
      let objects = Object.values(states).sort(function(a,b) { return a.formedon - b.formedon });
      setStates(Object.assign({}, objects)); 
    }
  }
  
  const listTable = (value, index) => {
    return (
          <tr key = {value.id}>
            <td>{value.id}</td>
            <td>{value.name}</td>
            <td>{value.capital}</td>
            <td>{value.formedon}</td>
            <td className = "operations">
              <button onClick = {() => setView(value)}>View</button>
              <button onClick = {() => handleDelete(value, index)}>Delete</button>
            </td>
          </tr>
         );
  }

  const handleDelete = (value, index) => {
    let data = JSON.parse(localStorage.getItem('data')); 
    data[index].show = false;
    localStorage.setItem('data', JSON.stringify(data));
    setStates(prevState => ({ ...prevState, [index]:{ ...prevState[index], 'show':false}}));
    if(view.id === value.id) {
       setView({});
    }    
  }

  const handleSearch = () => {
    let searchTerm = search.current.value;
    let searchArray = [];
    Object.values(states).map(value => {
      if(value.name.toLowerCase().search(searchTerm.toLowerCase()) !== -1) {
         searchArray.push(value.id);
      }
    }); 
    setSearched(searchArray);
  };


  const viewData = () => {
    let length = (Object.keys(view).length === 0) ? true : false;
    if(length === false) {
      return (
        <table>
          <tbody>
            <tr><td>Id</td><td>{view.id}</td></tr>
            <tr><td>State name</td><td>{view.name}</td></tr>
            <tr><td>Capital city</td><td>{view.capital}</td></tr>
            <tr><td>Formed year</td><td>{view.formedon}</td></tr>  
          </tbody>
        </table> 
      ); 
    } 
  };

  const logout = () => {
    localStorage.setItem('isAuthenticated', false);
    window.open("/", "_self");
  }

  const finalRender = () => {
    return (
      <div className = "dashboard">
        <div className = "search">
          <input type = "text" placeholder = "Search by state name" ref = {search}/>
          <button onClick = {handleSearch}>Search</button>
        </div>
        <div className = "all-data">
          {makeTable()}
        </div>  
        <div className = "view-data">
          <h1>View data:</h1>
          {viewData()}
        </div>
        <button className = "logout" onClick = {() => logout()}>Log out</button>
      </div>
    ); 
  };

  return <div>{finalRender()}</div>
};

export default Dashboard;
