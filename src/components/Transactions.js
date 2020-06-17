import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';

export default function Transactions() {
  const [state, setState] = useState({
    columns: [
      { title: 'user', field: 'user' },
      { title: 'book', field: 'book' },
      { title: 'timeStart', field: 'timeStart' },
      { title: 'timeEnd', field: 'timeEnd' },

    ],
    data: [],
  });
  useEffect(() => {
    axios.get('https://27--rest-api.glitch.me/api/transaction/all')
      .then((res) => {
        const data = res.data;
        setState((prevState) => { return { ...prevState, data } })
      })

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
          data.push(newData);
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
      title="Editable Example"
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
