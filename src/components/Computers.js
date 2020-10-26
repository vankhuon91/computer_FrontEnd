import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
import { tableIcons } from './tableicon'
import { serverAPI } from './Const'
import { VisibilityOffOutlined, VisibilityOutlined } from '@material-ui/icons';

function StatusRemote(props) {
  if (props.isRemote) {
    return (<VisibilityOutlined />)
  }
  else return (<VisibilityOffOutlined />)
}

export default function Computers() {
  function handleStatusRemote(){
    console.log('change status')
  }
  const [state, setState] = useState({
    columns: [
      { title: 'Computer Name', field: 'ComName' },
      { title: 'MAC', field: 'Mac' },
      { title: 'IP', field: 'IP' },
      { title: 'Public IP', field: 'public_IP' },
      { title: 'Serial Disk', field: 'serialDisk', type: 'string' },
      { title: 'OS', field: 'OS' },
      { title: 'Version', field: 'Version' },
      { title: 'lastSeen', field: 'lastSeen' },
      {
        title: 'Remote Request',
        field: 'isRemote',
        type: 'string',
        render: rowdata => {
          return <StatusRemote
            onClick={()=>{
              console.log('click')
            }}
            isRemote={rowdata.isRemote} />
        }
      },
    ],
    data: [],
  });
  useEffect(() => {
    axios.get(serverAPI + '/computers')
      .then((res) => {
        let data = res.data;
        data = data.map((item) => {
          let newitem = { ...item };
          if (!newitem.isRemote) { newitem.isRemote = false }
          return newitem;
        })

        setState((prevState) => { return { ...prevState, data } })
      })

  }, [])
  let deleteComputer = (oldData) => {
    return axios.delete(serverAPI + `/computers/${oldData._id}`)
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
      cellEditable={{
        cellStyle: {},
        onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
          return new Promise((resolve, reject) => {
            console.log('newValue: ' + newValue);
            setTimeout(resolve, 4000);
          });
        }
      }}
    />
  );


}
