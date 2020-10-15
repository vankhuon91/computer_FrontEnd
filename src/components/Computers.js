import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import {tableIcons} from './tableicon'
import {serverAPI} from './Const'

export default function Computers() {
  const [state, setState] = useState({
    columns: [
      { title: 'Computer Name', field: 'ComName' },
      { title: 'MAC', field: 'Mac' },
      { title: 'IP', field: 'IP' },
      { title: 'Public IP', field: 'public_IP' },
      { title: 'Serial Disk', field: 'serialDisk', type: 'string' },
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
  let deleteComputer = (oldData) => {
    return axios.delete(serverAPI+`/computers/${oldData._id}`)
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

  

  
  return (
    <MaterialTable
      title="Computers"
      columns={state.columns}
      data={state.data}
      icons={tableIcons}
      editable={{
        onRowDelete: deleteComputer,
      }}
    />
  );
}
