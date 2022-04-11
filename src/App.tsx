import { message, Spin } from 'antd';
import React, { FC, useRef, useState} from 'react';
import './App.css'
import queryQq from './services/queryQq';

interface QQInfo{
  code:	string;	//返回的状态码
  name: string;
  qq:	string;	//返回查询的QQ
  qlogo:	string;	//返回QQ头像地址
  lvzuan:	any;	//返回绿钻相关信息
  msg:	string
}

const App: FC = (): JSX.Element => {
  const timeRef=useRef<any>()
  const [loading, setLoading]=useState<boolean>(false)
  const [info, setInfo]=useState<QQInfo|null>()

  /**
   * 设置防抖，文字输入停止0.5秒后，才发送查询请求
   * @param e 
   */
  const onChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
    e.persist()
    clearTimeout(timeRef.current)
    timeRef.current=setTimeout(() => {
      //如检索字符串为空，则不在发送请求
      if (e.target.value||e.target.value!=="") {
        fetchQQInfo(e.target.value)
      }
    }, 500);
  }

  const fetchQQInfo=async(value: string)=>{
    try {
      setLoading(true)
      let res=await queryQq({
        qq: value
      })
      setLoading(false)
      if (res&&res.code===1) {
        setInfo({...res})
      }else{
        message.error("抱歉，没有查到该QQ号对应的信息")
        setInfo(null)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return <div className='contianer'>
    {
      loading?
      <div className="loading">
        <Spin size={"large"}/>  
      </div>:null
    }
    
    <div className='qq-wrapper'>
      <h1>QQ号查询</h1>
      <div className="input-wrapper">
        <span>QQ</span>
        <input onChange={onChange} data-testid="input" />
      </div>
      {
        info?
        <div className="result-wrapper" data-testid="result">
          <img src={info.qlogo} alt="头像" />
          <p>
            <span>{info.name}</span>
            <span>{info.qq}</span>
          </p>
        </div>:null
      }
    </div>
  </div>
}

export default App;

