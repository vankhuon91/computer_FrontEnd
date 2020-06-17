import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';

export default function Transactions() {
  const [state, setState] = useState({});

  async function initState(){
    let listUser={};
    await axios.get('https://27--rest-api.glitch.me/api/user')
    .then((res) => {
      const data = res.data;
      for (let i of data) {
        listUser[i._id]=i.name
      }
    });

    let listBook={};
    await axios.get('https://27--rest-api.glitch.me/api/book/all')
    .then((res) => {
      const data = res.data;
      for (let i of data) {
        listBook[i._id]=i.title
      }
    });


    let data=[];
    await axios.get('https://27--rest-api.glitch.me/api/transaction/all')
    .then((res) => {
      data = res.data;
    });
    let newState={
      columns: [
        { title: 'user', field: 'user',lookup:listUser},
        { title: 'book', field: 'book',lookup:listBook},
        { title: 'timeStart', field: 'timeStart' },
        { title: 'timeEnd', field: 'timeEnd' },
  
      ],
      data:data,
    };

    setState((prevState) => { return newState });
    

  }
  useEffect(() => {
    initState();

  }, [])

  let deleteUser = (oldData) => {
    return axios.delete(`https://27--rest-api.glitch.me/api/transaction/${oldData._id}`)
      .then(res => {
        if (oldData) {
          setState((prevState) => {
            const data = [...prevState.data];
            data.splice(data.indexOf(oldData), 1);
            return { ...prevState, data };
          });
        }
      })
      .catch(error => {
        console.log(error)
      }
      );
  }

  let updateUser = (newData, oldData) => {
    return axios.put(`https://27--rest-api.glitch.me/api/transaction/${oldData._id}`,newData)
      .then(res => {
        if (oldData) {
          setState((prevState) => {
            const data = [...prevState.data];
            data[data.indexOf(oldData)] = newData;
            return { ...prevState, data };
          });
        }
      })
      .catch(error => {
        console.log(error)
      }
      );
  }

  let addUser = (newData) => {
    return axios.post(`https://27--rest-api.glitch.me/api/transaction`,newData)
      .then(res => {
        setState((prevState) => {
          const data = [...prevState.data];
          data.push({...newData,timeStart: new Date().toISOString()});
          return { ...prevState, data };
        });
      })
      .catch(error => {
        console.log(error)
      }
      );
  }
  return (
    <MaterialTable
      title="Transactions"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: addUser,
        onRowUpdate: updateUser,
        onRowDelete: deleteUser,
      }}
    />
  );
}
