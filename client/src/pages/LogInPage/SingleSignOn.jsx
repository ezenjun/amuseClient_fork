import React, { useState, useEffect } from "react";
// import styled from 'styled-components';
// import axios from "axios";
// import SignUpAmuse from "../SignUpPage/SignUpAmuse";

const SingleSignOn = async () => {
    var IMP = window.IMP;
    IMP.init("imp38885874");
    console.log('성공ㅇ이ㅏ이ㅏ어ㅣ라ㅓㅣㅏ');

    return new Promise((resolve, reject) => {
        IMP.certification({
            pg: 'inicis_unified.{CPID}',
            merchant_uid: "ORD20180131-0000011",
            m_redirect_url: "http://localhost:3000/SignUpAmuse",
        }, function (rsp) {
            console.log(rsp)
            if (rsp.success) {
                console.log('본인인증성공///');
                console.log(rsp.imp_uid);
                resolve(rsp.imp_uid);
            } else {
                alert("인증에 실패하였습니다. 에러 내용: " + rsp.error_msg);
            }
        });
    });


}
export default SingleSignOn

