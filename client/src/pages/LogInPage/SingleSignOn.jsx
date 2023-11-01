import React, { useState, useEffect } from "react";

const SingleSignOn = async () => {
    var IMP = window.IMP;
    IMP.init("imp38885874");

    const redirect_url = process.env.REACT_APP_REDIRECT_URL
    return new Promise((resolve, reject) => {
        IMP.certification({
            pg: 'inicis_unified.{CPID}',
            merchant_uid: "ORD20180131-0000011",
            m_redirect_url: `${redirect_url}SignUpAmuse`,
        }, function (rsp) {
            console.log(rsp)
            if (rsp.success) {
                resolve(rsp.imp_uid);
            } else {
                alert("인증에 실패하였습니다. 에러 내용: " + rsp.error_msg);
            }
        });
    });


}

export default SingleSignOn