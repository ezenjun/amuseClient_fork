import React, { useEffect, useState } from 'react';
import './ProductIntro.scss';
import axios from 'axios';

type ProductIntroProps = {
  itemId: number | null;
};

function ProductIntro({ itemId }: ProductIntroProps) {
  /**
   * ProductIntro Data
   */
  interface ProductIntroData {
    content: string;
  }

  const [productIntroData, setProductIntroData] = useState<ProductIntroData>();

  /**
   * ProductIntro API
   */
  useEffect(() => {
    axios
      .get(`https://ammuse.store/detail/${itemId}/product-intro`)
      .then((response) => {
        setProductIntroData(response.data.data)

        //console.log("product", response.data.data)
      })
      .catch(error => {
        console.log("연결 실패");
      });
  }, [itemId]);

  return (
    <div className="product-introduction">
      <div dangerouslySetInnerHTML={{ __html: productIntroData?.content ?? '' }}></div>
    </div>
  );
}

export default ProductIntro;
