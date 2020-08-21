import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import {serverAPI} from './Const'

export default function Computers() {
  const [state, setState] = useState({
    columns: [
      { title: 'Computer Name', field: 'ComName' },
      { title: 'MAC', field: 'Mac' },
      { title: 'IP', field: 'IP' },
      { title: 'Serial Disk', field: 'SerialDisk', type: 'string' },
      { title: 'OS', field: 'OS'},
      { title: 'Version', field: 'Version'},
      { title: 'lastSeen', field: 'lastSeen' },
    ],
    data: [],
  });
  useEffect(() => {
   
    axios.get(serverAPI+'/computers')
      .then((res) => {
        const data = res.data;
        setState((prevState) => { return { ...prevState, data } })
        console.log(data)
      })

  }, [])
  let deleteUser = (oldData) => {
    return axios.delete(`https://27--rest-api.glitch.me/api/user/${oldData._id}`)
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
    return axios.put(`https://27--rest-api.glitch.me/api/user/${oldData._id}`,newData)
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
    return axios.post(`https://27--rest-api.glitch.me/api/register`,newData)
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
      title="Users"
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
