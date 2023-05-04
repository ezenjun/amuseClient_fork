import React from 'react'
import { useParams } from 'react-router-dom'
import MyPagelist from './MyPageList';
import Settings from './MyPage/Settings/Settings';
import Likes from './MyPage/Likes';
import Notifications from './MyPage/Notifications';
import Inquiries from './MyPage/Inquiries';
import Orders from './MyPage/Orders';
import Quotes from './MyPage/Quotes';
import Bills from './MyPage/Bills';
import './MyPage.css';
import Header from '../Headers/Header';

export default function MyPage() {
  
    const { category } = useParams();
    console.log(category);

    const handleCategory = (): JSX.Element | undefined => {
        switch(category) {
            case 'Settings':
                return <Settings />;
                break;
            case 'Likes':
                return <Likes />;
                break;
            case 'Notifications':
                return <Notifications />;
                break;
            case 'Inquiries':
                return <Inquiries />;
                break;
            case 'Orders':
                return <Orders />;
                break;
            case 'Quotes':
                return <Quotes />;
                break;
            case 'Bills':
                return <Bills />;
                break;
        }
    }

  return (
    <>
    <div className="App">
        <Header />
    </div>
    <div className='myPage'>
    <MyPagelist />
    <div className='myPage_box'>
        {handleCategory()}
    </div>
    </div>
    </>
  )
}
