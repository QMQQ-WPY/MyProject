import React from 'react';
import ReactDom from 'react-dom';
import Content from './content.jsx';
import moment from 'moment';
import './index.css';
document.write(moment().locale('zh-cn').format('LLLL'));
ReactDom.render(<Content />,document.getElementById("root"));
