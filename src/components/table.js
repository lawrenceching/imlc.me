import React from "react"
import { Table } from 'antd';

const AntdTable = (props) => {

  const th = props.children[0] // thead
      .props.children[0] // tr
      .props.children; // th

  const headers = th.map(th => th.props.children[0]);

  const columns = [];
  for (let i = 0; i < headers.length;  i++) {
    columns.push({
      title: headers[i],
      dataIndex: headers[i],
      key: headers[i],
    })
  }

  const trs = props.children[1] // tbody
      .props.children  // tr;

  const tds = trs.map(tr => tr.props.children.map(td => td.props.children[0]));

  const dataSource = [];
  for (let i = 0; i < tds.length; i++) {
    const data = tds[i];
    const obj = {};
    for (let j = 0; j < data.length; j++) {
      obj[headers[j]] = data[j];
    }
    dataSource.push(obj)
  }

  return <Table style={{marginTop: '10px', marginBottom: '10px'}} size="small" dataSource={dataSource} columns={columns} pagination={false} />;
}

export default AntdTable;
