import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import {serverAPI} from './Const'
import {tableIcons} from './tableicon'
export default function Commands() {
  const [state, setState] = useState({
    columns: [
      { title: 'Group Name', field: 'groupName' },
      { title: 'Rule Filter', field: 'filter' },
      { title: 'Tag', field: 'groupTag'},

    ],
    data: [],
  });
  useEffect(() => {
    axios.get(serverAPI+'/groupcomputers')
      .then((res) => {
        let data = res.data;
      //  console.log(data)
        setState((prevState) => { return { ...prevState, data } })
        
      })

  }, [])

  let deleteGroup = (oldData) => {
    return axios.delete(serverAPI+`/groupcomputers/${oldData._id}`)
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

  let updateGroup = (newData, oldData) => {
    let sendData={...newData}
   
    return axios.put(serverAPI+`/groupcomputers/${oldData._id}`,sendData)
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

  let addGroup = (newData) => {
    let sendData={...newData}
   
    return axios.post(serverAPI+'/groupcomputers',sendData)
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
      title="Group Computers"
      columns={state.columns}
      data={state.data}
      icons={tableIcons}
      editable={{
        onRowAdd: addGroup,
        onRowUpdate: updateGroup,
        onRowDelete: deleteGroup,
      }}
    />
  );
}
