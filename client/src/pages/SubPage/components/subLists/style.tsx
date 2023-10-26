import styled from "styled-components";

export const SubLists = styled.div`
  @media (max-width: 768px) {
    /* Mobile styles */
    width: 400px;
  }

  @media (min-width: 769px) and (max-width: 1023px) {
    /* Tablet styles */
    width: 792px;
  }

  @media (min-width: 1024px) {
    /* Desktop styles */
    width: 1060px;
  }
`;

export const Image = styled.img`
  width: 100%;
  object-fit: cover;

  @media (min-width: 1024px) {
    /* Desktop styles */
    height: 330px;
  }
  @media (min-width: 769px) and (max-width: 1023px) {
    /* Tablet styles */
    height: 192.5px;
  }

  @media (max-width: 768px) {
    /* Mobile styles */
    height: 184px;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

export const Title = styled.div`
  color: #e6003d;
  font-family: yg-jalnan;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const Count = styled.div`
  color: #909090;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-left: 8px;
`;
