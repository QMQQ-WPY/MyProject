//function content() {
//    var divElement = document.createElement("div");
//    divElement.innerHtml = "这是一个测试用的demo";
//    return divElement;
//}
//module.exports = content;
//var config = require('./config.json');
//module.exports = function() {
//    var greet = document.createElement('div');
//    //greet.innerText = "Hi there and greetings!";
//    greet.innerText = config.greetText;
//    return greet;
//};
import React from 'react';
import config from './config.json';
import styles from './content.css';

class Content extends React.Component {
    render() {
        return <div  className={styles.root}>
            <p>我是一个新的段落</p>
            {config.greetText}

        </div>
    }
}
export default Content;


